using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Autofac;
using Autofac.Builder;
using Autofac.Core;

namespace Duxa.Infrastructure
{

    public enum Lifecycle
    {
        SingleInstance,
        InstancePerCall,
        ContainerControlled
    }

    public class AutofacContainer: IContainer
    {
        private readonly ILifetimeScope _container;
        private bool _disposed;

        public AutofacContainer() : this(null)
        {
        }

        public AutofacContainer(ILifetimeScope container)
        {
            _container = container ?? new ContainerBuilder().Build();
        }

        public ILifetimeScope LifetimeScope
        {
            get { return _container; }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (_disposed)
            {
                return;
            }

            if (disposing)
            {
                LifetimeScope.Dispose();
            }

            _disposed = true;
        }

        ~AutofacContainer()
        {
            Dispose(false);
        }

        public T Resolve<T>()
        {
            return (T)Resolve(typeof(T));
        }

        public object Resolve(Type typeToBuild)
        {
            return LifetimeScope.Resolve(typeToBuild);
        }

        public IEnumerable<object> ResolveAll(Type typeToBuild)
        {
            return LifetimeScope.Resolve(typeof(IEnumerable<>).MakeGenericType(typeToBuild)) as IEnumerable<object>;
        }

        public IEnumerable<T> ResolveAll<T>()
        {
            return LifetimeScope.Resolve(typeof(IEnumerable<>).MakeGenericType(typeof(T))) as IEnumerable<T>;
        }

        public IContainer BuildChildContainer()
        {
            return new AutofacContainer(LifetimeScope.BeginLifetimeScope());
        }

        public void Register(Type component, Lifecycle dependencyLifecycle)
        {
            var registration = this.GetComponentRegistration(component);

            if (registration != null)
                return;

            var builder = new ContainerBuilder();
            var services = GetAllServices(component).ToArray();
            var registrationBuilder = builder.RegisterType(component).As(services);

            SetLifetimeScope(dependencyLifecycle, registrationBuilder);

            builder.Update(LifetimeScope.ComponentRegistry);
        }

        public void Register<T>(Func<T> componentFactory, Lifecycle dependencyLifecycle)
        {
            var builder = new ContainerBuilder();
            var services = GetAllServices(typeof(T)).ToArray();
            var registrationBuilder = builder.Register<T>(c => componentFactory.Invoke()).As(services);

            SetLifetimeScope(dependencyLifecycle, (IRegistrationBuilder<object, IConcreteActivatorData, SingleRegistrationStyle>)registrationBuilder);

            builder.Update(LifetimeScope.ComponentRegistry);
        }

        public void Register<T, TImpl>(Lifecycle dependencyLifecycle)
        {
            var builder = new ContainerBuilder();
            var registrationBuilder = builder.RegisterType(typeof(TImpl)).As(typeof(T));

            SetLifetimeScope(dependencyLifecycle, registrationBuilder);

            builder.Update(LifetimeScope.ComponentRegistry);
        }

        public void ConfigureProperty(Type component, string property, object value)
        {
            var registration = GetComponentRegistration(component);

            if (registration == null)
            {
                throw new InvalidOperationException(
                    "Cannot configure properties for a type that hasn't been configured yet: " + component.FullName);
            }

            registration.Activating += (sender, e) => SetPropertyValue(e.Instance, property, value);
        }

        public void RegisterSingleton(Type lookupType, object instance)
        {
            var builder = new ContainerBuilder();
            builder.RegisterInstance(instance).As(lookupType);
            builder.Update(LifetimeScope.ComponentRegistry);
        }

        public void RegisterSingleton<T>(Func<T> func)
        {
            var builder = new ContainerBuilder();
            builder.Register(c => func()).As<T>().SingleInstance();
            builder.Update(LifetimeScope.ComponentRegistry);
        }

        public bool HasComponent(Type componentType)
        {
            return LifetimeScope.IsRegistered(componentType);
        }

        public void Release(object instance)
        {

        }

        public IList<Type> FindTypes<T>(Func<Type, bool> filter)
        {
            return _container.ComponentRegistry.Registrations
                        .Where(x => x.Services.OfType<IServiceWithType>().All(y => filter(y.ServiceType)))
                        .SelectMany(r => r.Services.OfType<IServiceWithType>(), (r, s) => new { r, s })
                        .Where(rs => rs.s.ServiceType.Implements<T>())
                .Select(rs => rs.s.ServiceType)
                        .ToList();
        }

        public IList<Type> FindTypes(Type type, Func<Type, bool> filter)
        {
            Func<Type, bool> implFunc = type.ContainsGenericParameters
                ? new Func<Type, bool>(s => s.ImplementsGeneric(type))
                : new Func<Type, bool>(s => s.Implements(type));

            return _container.ComponentRegistry.Registrations
                        .Where(x => x.Services.OfType<IServiceWithType>().All(y => filter(y.ServiceType)))
                        .SelectMany(r => r.Services.OfType<IServiceWithType>(), (r, s) => new { r, s })
                        .Where(rs => implFunc(rs.s.ServiceType))
                .Select(rs => rs.s.ServiceType).ToList();
        }

        private static void SetPropertyValue(object instance, string propertyName, object value)
        {
            instance.GetType().GetProperty(propertyName, BindingFlags.Public | BindingFlags.Instance).SetValue(instance, value, null);
        }

        private IComponentRegistration GetComponentRegistration(Type concreteComponent)
        {
            return LifetimeScope.ComponentRegistry.Registrations.FirstOrDefault(x => x.Activator.LimitType == concreteComponent);
        }

        private static void SetLifetimeScope(Lifecycle lifecycle, IRegistrationBuilder<object, IConcreteActivatorData, SingleRegistrationStyle> registrationBuilder)
        {
            switch (lifecycle)
            {
                case Lifecycle.SingleInstance:

                    registrationBuilder.SingleInstance();
                    break;
                case Lifecycle.InstancePerCall:
                    registrationBuilder.InstancePerDependency();
                    break;
                case Lifecycle.ContainerControlled:
                    registrationBuilder.InstancePerLifetimeScope();
                    break;
                default:
                    throw new ArgumentException("Unhandled lifecycle - " + lifecycle);
            }
        }

        static IEnumerable<Type> GetAllServices(Type type)
        {
            if (type == null)
            {
                return new List<Type>();
            }

            var result = new List<Type>(type.GetInterfaces()) {
                type
            };

            foreach (Type interfaceType in type.GetInterfaces())
            {
                result.AddRange(GetAllServices(interfaceType));
            }

            return result.Distinct();
        }

    }
}
