using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Duxa.Infrastructure
{
    public static class TypeExtensions
    {
        public static bool Implements<T>(this Type objectType)
        {
            Type interfaceType = typeof(T);
            return interfaceType.IsGenericTypeDefinition ? ImplementsGeneric(objectType, interfaceType) : interfaceType.IsAssignableFrom(objectType);
        }

        public static bool Implements(this Type objectType, Type interfaceType)
        {
            return interfaceType.IsGenericTypeDefinition ? ImplementsGeneric(objectType, interfaceType) : interfaceType.IsAssignableFrom(objectType);
        }

        public static bool ImplementsGeneric(this Type objectType, Type interfaceType)
        {
            if (interfaceType.IsInterface && objectType.GetInterfaces()
                    .Any(x => x.IsGenericType && x.GetGenericTypeDefinition() == interfaceType)
                || objectType.IsGenericType && objectType.GetGenericTypeDefinition() == interfaceType)
            {
                return true;
            }
            Type baseType = objectType.BaseType;
            return baseType != null && ImplementsGeneric(baseType, interfaceType);
        }
    }
}
