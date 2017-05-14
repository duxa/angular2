using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Duxa.BL.Utils;
using Duxa.DAL;
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

        public string DownloadFile(Uri url)
        {
            var tempFileName = _sandBox.GetNewTempFileName();
            ClientDataLoader.LoadFromExternalStore(url, tempFileName);
            return tempFileName;
        }

        public List<FOPS> ParseClients(string path)
        {
            var clients = new List<FOPS>();
            var tempFolderName = _sandBox.GetNewTempFolderName();
            ClientDataLoader.UnzipClientData(path, tempFolderName);
            var clientsData = Directory.GetFiles(tempFolderName);
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
