using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Autofac;
using Autofac.Core.Lifetime;

namespace Duxa.Infrastructure
{
    public class WebApiDependencyScope : IDependencyScope
    {
        private readonly IContainer _container;
        private bool _disposed;

        public WebApiDependencyScope(IContainer container)
        {
            _container = container;
        }

        ~WebApiDependencyScope()
        {
            Dispose(false);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize((object)this);
        }

        private void Dispose(bool disposing)
        {
            if (_disposed)
                return;
            if (disposing && _container != null)
                _container.Dispose();
            _disposed = true;
        }

        
        public object GetService(Type serviceType)
        {
          //  if (!_container.HasComponent(serviceType))
           //     return null;
            return _container.Resolve(serviceType);
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            //if (!_container.HasComponent(serviceType))
             
               return Enumerable.Empty<object>();
            //return _container.ResolveAll(serviceType);
        }
    }
}
