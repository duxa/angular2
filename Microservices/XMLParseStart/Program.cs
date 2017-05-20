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
            // QuartzSheduller sheduller = new QuartzSheduller();
            // sheduller.ExecuteScheduler();
            var clientService = new ClientService(new ClientRepository(), new SandBox());
            Console.WriteLine("Start donwload...");
            var path = clientService.DownloadFile(new Uri("http://old.minjust.gov.ua/downloads/15-UFOP.zip"));
            Console.WriteLine("End donwload, start unzip");
            var listPath = clientService.UnzipFiles(path);
            Console.WriteLine("End unzip, start parse");
            var clients = clientService.ParseClients(listPath.Where(x => x.StartsWith("F")).ToList());
            Console.WriteLine("Save to base");
            clientService.SaveClients(clients);
            Console.WriteLine("End parsing");
            TopshelfHost.Boot<MicroserviceA>(serviceName: "MicroserviceA");
        }
    }
    class MicroserviceA : Microservice
    {
        protected override ISetup Starting() => It.Will().HaveName("A").UseAutofac().UseWebApi().Build();
    }
}
