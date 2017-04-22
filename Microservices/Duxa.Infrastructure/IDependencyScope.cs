using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Duxa.Infrastructure
{
    //
    // Summary:
    //     Представляет интерфейс для диапазона зависимостей.
    public interface IDependencyScope : IDisposable
    {
        //
        // Summary:
        //     Извлекает службу из области.
        //
        // Parameters:
        //   serviceType:
        //     Извлекаемая служба.
        //
        // Returns:
        //     Извлеченная служба.
        object GetService(Type serviceType);
        //
        // Summary:
        //     Извлекает коллекцию служб из области.
        //
        // Parameters:
        //   serviceType:
        //     Коллекция извлекаемых служб.
        //
        // Returns:
        //     Коллекция извлеченных служб.
        IEnumerable<object> GetServices(Type serviceType);
    }
}
