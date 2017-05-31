using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Duxa.DAL.Repo;
using Nancy.Responses;
using Gaev.Microservices.Nancy.Models;

namespace Gaev.Microservices.Nancy.Controllers
{
    public class FopsController: ApiController
    {
        private IClientRepository _clientRepository;
        public FopsController(IClientRepository clientRepository)
        {
            _clientRepository = clientRepository;
        }

        [HttpGet]
        public dynamic Page(int pageNumber = 1, int pageSize = 20)
        {
            List<FOPS> fopsResult = _clientRepository.GetPage(pageNumber, pageSize);
            FOPPage page = new FOPPage();
            var total = _clientRepository.Count();
            page.PageNumber = pageNumber;
            page.RecordsTotal= _clientRepository.Count();
            page.PageCount = (total / pageSize) + (total % pageSize > 0 ? 1 : 0);
            page.PageOfResults = fopsResult;
            return page;
        }

    }
}
