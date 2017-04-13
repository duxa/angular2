using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Autofac;
using Duxa.DAL;
using Duxa.DAL.Repo;
using DUXA.Microservices.Nancy.Controllers;

namespace DUXA.Microservices.Nancy
{
    public class AppModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);
            builder.RegisterType<HelloWordController>();
            builder.RegisterType<ClientRepository>().As<IClientRepository>();
        }
    }
}
