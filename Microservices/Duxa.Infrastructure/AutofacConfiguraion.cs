using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Autofac;


namespace Duxa.Infrastructure

{
    public class AutofacConfiguraion : IMainConfiguration
    {
        public static ILifetimeScope LifetimeScope { get; private set; }

        public AutofacConfiguraion SeAutofacConfiguraion(ILifetimeScope scope)
        {
            LifetimeScope = scope;
            return this;
        }

        public static List<Module> Modules { get; set; }

        public AutofacConfiguraion SetDefaults()
        {
            Modules = new List<Module>();
            return this;
        }

        public AutofacConfiguraion RegisterModules(params Module[] modules)
        {
            Modules.AddRange(modules);
            return this;
        }
    }

    public static class AutofacConfiguraionExtensions
    {
        public static AutofacConfiguraion UseAutofac(this IMainConfiguration configuration)
        {
           // MainConfiguration.Inializers.Add(AutofacBootstrap.Init);
            return new AutofacConfiguraion().SetDefaults();
        }
    }
}
