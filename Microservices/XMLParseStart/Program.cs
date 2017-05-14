using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Duxa.BL;
using Duxa.DAL;
using Duxa.DAL.Repo;
using Duxa.Infrastructure;
using Duxa.Microservices;
using Duxa.Microservices.Nancy.Duxa.Microservices;

namespace XMLParseStart
{
    class Program
    {
        static void Main(string[] args)
        {
            QuartzSheduller sheduller = new QuartzSheduller();
            sheduller.ExecuteScheduler();
            TopshelfHost.Boot<MicroserviceA>(serviceName: "MicroserviceA");
        }
    }
    class MicroserviceA : Microservice
    {
        protected override ISetup Starting() => It.Will().HaveName("A").UseAutofac().UseWebApi().Build();
    }
}
