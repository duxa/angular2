using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Duxa.Infrastructure
{
    public interface IContainer : IDisposable
    {
        T Resolve<T>();
        object Resolve(Type typeToBuild);
        IEnumerable<object> ResolveAll(Type typeToBuild);
        IEnumerable<T> ResolveAll<T>();
        IContainer BuildChildContainer();
        void Register(Type component, Lifecycle dependencyLifecycle);
        void Register<T>(Func<T> component, Lifecycle dependencyLifecycle);
        void Register<T, TImpl>(Lifecycle dependencyLifecycle);
        void ConfigureProperty(Type component, string property, object value);
        void RegisterSingleton(Type lookupType, object instance);
        void RegisterSingleton<T>(Func<T> func);
        bool HasComponent(Type componentType);
        void Release(object instance);
        IList<Type> FindTypes<T>(Func<Type, bool> filter);
        IList<Type> FindTypes(Type type, Func<Type, bool> filter);
    }
}
