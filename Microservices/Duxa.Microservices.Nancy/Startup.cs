using Newtonsoft.Json;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace Duxa.Microservices.Nancy
{

    public class BuldHttpConfiguration : HttpConfiguration
    {
        public BuldHttpConfiguration()
        {
            ConfigureRoutes();
        }

        private void ConfigureRoutes()
        {
            Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
        
    }

    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseWebApi(new BuldHttpConfiguration());
        }
    }
}
