using Newtonsoft.Json;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
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
            this.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
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
