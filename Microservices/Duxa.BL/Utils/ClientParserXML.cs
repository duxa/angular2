using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Duxa.DAL.Repo.Dto;

namespace Duxa.BL.Utils
{
    public static class ClientParserXML
    {
        public static IEnumerable<ClientDto> GetClients(XDocument document)
        {
            foreach (var row in document.Elements(XName.Get("ROW")))
            {
                
                yield return new ClientDto
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
