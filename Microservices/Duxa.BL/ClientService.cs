using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
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
            return Directory.GetFiles(Path.Combine(tempFolderName , "15-UFOP")).ToList();
        }

        public List<FOPS> ParseClients(List<string> pathes)
        {
            var clients = new List<FOPS>();
            

            foreach (var path in pathes)
            {
               var  xElementCollections =  SimpleStreamAxis(path, "ROW").ToList();
                var clientsCollection = xElementCollections.Select(x =>
                {
                    return new FOPS
                    {
                        FIO = x.Element(XName.Get("ПІБ")).Value,
                        Address = x.Element(XName.Get("Місце_проживання")).Value,
                        MainActivity = x.Element(XName.Get("Основний_вид_діяльності")).Value,
                        Status = x.Element(XName.Get("Стан")).Value
                    };
                    
                }).ToList();
                clients.AddRange(clientsCollection);
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

        public IEnumerable<XElement> SimpleStreamAxis(string inputUrl,
                                              string elementName)
        {
            XmlReaderSettings settings = new XmlReaderSettings();


            using (XmlReader reader = XmlReader.Create(inputUrl, settings))
            {
                
                reader.MoveToContent();
                while (reader.Read())
                {
                    if (reader.NodeType == XmlNodeType.Element)
                    {
                        if (reader.Name == elementName)
                        {
                            XElement el = XNode.ReadFrom(reader) as XElement;
                            if (el != null)
                            {
                                yield return el;
                            }
                        }
                    }
                }
                reader.Close();
            }
        }
    }
}
