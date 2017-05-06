using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Duxa.BL.Utils;
using Duxa.DAL.Repo;
using Duxa.DAL.Repo.Dto;
using Duxa.Infrastructure;

namespace Duxa.BL
{
    public class ClientService : IClientService
    {
        private readonly IClientRepository _clientRepository;
        private readonly ISandBox _sandBox;
        public ClientService(IClientRepository clientRepository, ISandBox sandBox)
        {
            _clientRepository = clientRepository;
            _sandBox = sandBox;
        }

        public List<FOPS> GetClients(Uri url)
        {
            //var tempFileName = _sandBox.GetNewTempFileName();
            //ClientDataLoader.LoadFromExternalStore(url, tempFileName);

            //var tempFolderName = _sandBox.GetNewTempFolderName();
            //ClientDataLoader.UnzipClientData(tempFileName, tempFolderName);

            var clientsData = Directory.GetFiles(@"D:\FopFiles");

            var clients = new List<FOPS>();
            foreach (var clientData in clientsData)
            {

                var rr = XDocument.Load(clientData);
                var clientsTmp = ClientParserXML.GetClients(rr);
                clients.AddRange(clientsTmp);
            }
          
            return clients;
        }

        public void SaveClients(List<FOPS> clients)
        {
            _clientRepository.Save(clients);
        }

        public FOPS GetFOP(string name)
        {
            return _clientRepository.Get(x => x.FIO.Contains(name));
        }
    }
}
