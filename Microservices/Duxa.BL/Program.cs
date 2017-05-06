using Duxa.BL.Utils;
using Duxa.DAL;
using Duxa.DAL.Repo.Dto;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;

namespace Duxa.BL
{
    class Program
    {
        static void Main(string[] args)
        {
            var clientsData = System.IO.Directory.GetFiles(@"D:\FopFiles");
            var clients = new List<FOPS>();

            foreach (var clientData in clientsData)
            {
                var rr = XDocument.Load(clientData);
                var clientsTmp = ClientParserXML.GetClients(rr);
                clients.AddRange(clientsTmp);
            }
            new ClientRepository().Save(clients);
        }
    }
}
