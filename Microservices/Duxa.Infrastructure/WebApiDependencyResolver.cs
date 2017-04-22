using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Autofac;

namespace Duxa.Infrastructure
{
    public class WebApiDependencyResolver : IDependencyResolver
    {
        private readonly IContainer _container;
        private readonly WebApiDependencyScope _rootDependencyScope;
        private bool _disposed;

        public WebApiDependencyResolver(IContainer container)
        {
            _container = container;
            _rootDependencyScope = new WebApiDependencyScope(_container);
        }

        ~WebApiDependencyResolver()
        {
            Dispose(false);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize((object)this);
        }

        public object GetService(Type serviceType)
        {
            return _rootDependencyScope.GetService(serviceType);
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            return _rootDependencyScope.GetServices(serviceType);
        }

        public IDependencyScope BeginScope()
        {
            return new WebApiDependencyScope(_container.BuildChildContainer());
        }

        private void Dispose(bool disposing)
        {
            if (_disposed)
                return;
            //if (disposing && _rootDependencyScope != null)
            //    ((IDisposable)_rootDependencyScope).Dispose();
            _disposed = true;
        }

        public T Resolve<T>()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<T> ResolveAll<T>()
        {
            throw new NotImplementedException();
        }

        public IDependencyResolver Register<T>(Func<IDependencyResolver, T> func)
        {
            throw new NotImplementedException();
        }

        public IDependencyResolver RegisterSingleton<T>(Func<IDependencyResolver, T> func)
        {
            throw new NotImplementedException();
        }

        public Type[] GetRegisteredCommandHandlers()
        {
            throw new NotImplementedException();
        }

        public Type[] GetRegisteredEventHandlers(bool excludeProjections = true)
        {
            throw new NotImplementedException();
        }

        public IDependencyResolver CreateChildResolver()
        {
            throw new NotImplementedException();
        }
    }
}
