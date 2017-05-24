using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Duxa.DAL.Repo.Dto;
using Duxa.DAL.Repo;

namespace Duxa.BL.Utils
{
    public static class ClientParserXML
    {
        public static IEnumerable<FOPS> GetClients(XDocument document)
        {
            foreach (var row in document.Descendants("ROW"))
            {
                
                yield return new FOPS
                {
                     FIO = row.Element(XName.Get("ПІБ")).Value,
                     Address = row.Element(XName.Get("Місце_проживання")).Value,
                     MainActivity = row.Element(XName.Get("Основний_вид_діяльності")).Value,
                     Status = row.Element(XName.Get("Стан")).Value
                };
            }
        }
    }
}
