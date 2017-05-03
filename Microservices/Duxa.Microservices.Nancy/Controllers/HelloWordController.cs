using Duxa.DAL.Repo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Duxa.DAL;

namespace Gaev.Microservices.Nancy.Controllers
{
    public class HelloWordController : ApiController
    {
        private readonly IClientRepository _clientRepository;
        public HelloWordController(IClientRepository clientRepository)
        {
            // _clientRepository = new ClientRepository();
            _clientRepository = clientRepository;
        }

        [HttpGet]
        public dynamic Hello()
        {
            var all = _clientRepository.GetAll();
            return new
            {
                Test = all
            };
        }
    }
}
