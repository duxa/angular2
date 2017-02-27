using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Autofac;
using Duxa.DAL;
using Duxa.Infrastructure;
using Duxa.DAL.Repo;

namespace Duxa.BL
{
    public class AppModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);

            builder.RegisterType<SandBox>().As<ISandBox>();
            builder.RegisterType<ClientRepository>().As<IClientRepository>();
            builder.RegisterType<ClientService>().As<IClientService>();
        }
    }
}
