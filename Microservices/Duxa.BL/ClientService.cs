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

        public List<string> UnzipFiles(string path)
        {
            var tempFolderName = _sandBox.GetNewTempFolderName();
            ClientDataLoader.UnzipClientData(path, tempFolderName);
            return Directory.GetFiles(tempFolderName).ToList();
        }

        public List<FOPS> ParseClients(List<string> pathes)
        {
            var clients = new List<FOPS>();

            foreach (var clientData in pathes)
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
