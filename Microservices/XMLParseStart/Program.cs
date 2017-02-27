using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Duxa.BL;
using Duxa.DAL;
using Duxa.DAL.Repo;
using Duxa.Infrastructure;

namespace XMLParseStart
{
    class Program
    {
        static void Main(string[] args)
        {
            var clientService = new ClientService(new ClientRepository(),new SandBox());
            //clientService.GetClients(new Uri("http://old.minjust.gov.ua/downloads/15-UFOP.zip"));
            var listClients = new List<FOPS>()
            {
                new FOPS()
                {
                    Address = "Dievka 22",
                    MainActivity = "Work",
                    Status = "Work",
                    FIO = "Test"
                },
                new FOPS()
                {
                    Address = "Dievka 21",
                    MainActivity = "Work1",
                    Status = "Work2",
                    FIO = "Test1"
                },
            };
            clientService.SaveClients(listClients);
        }
    }
}
