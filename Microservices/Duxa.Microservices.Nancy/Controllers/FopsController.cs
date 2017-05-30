using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Duxa.DAL.Repo;
using Nancy.Responses;

namespace Gaev.Microservices.Nancy.Controllers
{
    public class FopsController: ApiController
    {
        private IClientRepository _clientRepository;
        public FopsController(IClientRepository clientRepository)
        {
            _clientRepository = clientRepository;
        }

        
        public IEnumerable<string> Get(int page = 0, int pageSize = 10)
        {
            var all = _clientRepository.GetAll();
            _clientRepository
        }

    }
}
