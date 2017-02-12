using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace Duxa.Microservices.EndPoints
{
    public class HelloWordControlle : ApiController
    {
        [HttpGet]
        public string Hello()
        {



            return "Hello";
        }



    }
}
