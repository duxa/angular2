using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Duxa.Infrastructure
{
    public interface IDependencyResolver: IDisposable
    {
        T Resolve<T>();
        IEnumerable<T> ResolveAll<T>();
        IDependencyResolver Register<T>(Func<IDependencyResolver, T> func);
        IDependencyResolver RegisterSingleton<T>(Func<IDependencyResolver, T> func);
        Type[] GetRegisteredCommandHandlers();
        Type[] GetRegisteredEventHandlers(bool excludeProjections = true);
        IDependencyResolver CreateChildResolver();
    }
}
