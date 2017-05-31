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
            ClearCollection("FOPS");
            foreach (var path in pathes)
            {
                 SimpleStreamAxis(path, "ROW");
            }
            return null;
        }

        public void SaveClients(List<FOPS> clients)
        {
            _clientRepository.Save(clients);
        }

        public FOPS GetFOP(string name)
        {
            return _clientRepository.Get(x => x.FIO.Contains(name));
        }

        public void ClearCollection(string collactionName)
        {
            _clientRepository.DeleteAll(collactionName);
        }

        public void SimpleStreamAxis(string inputUrl,string elementName)
        {
            XmlReaderSettings settings = new XmlReaderSettings();
            List<FOPS> fops = new List<FOPS>();
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
                                var fop = new FOPS
                                {
                                    FIO = el.Element(XName.Get("ПІБ")).Value,
                                    Address = el.Element(XName.Get("Місце_проживання")).Value,
                                    MainActivity = el.Element(XName.Get("Основний_вид_діяльності")).Value,
                                    Status = el.Element(XName.Get("Стан")).Value
                                };
                                fops.Add(fop);
                                if (fops.Count()>1000) {
                                    _clientRepository.Save(fops);
                                    fops.Clear();
                                }
                            }
                        }
                    }
                }
                if (fops.Count() >0)
                {
                    _clientRepository.Save(fops);
                    fops.Clear();

                }
                reader.Close();
            }
            _clientRepository.CreateFopsIndexes();
        }
    }
}
