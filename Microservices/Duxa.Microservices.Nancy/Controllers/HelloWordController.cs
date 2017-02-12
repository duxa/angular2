using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace Gaev.Microservices.Nancy.Controllers
{
    public class HelloWordController : ApiController
    {


        public HelloWordController()
        {

        }

        [HttpGet]
        public string Hello()
        {



            return "Hello";
        }



    }
}
