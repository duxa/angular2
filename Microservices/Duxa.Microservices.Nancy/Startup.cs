using Newtonsoft.Json;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using Duxa.Infrastructure;
using DUXA.Microservices.Nancy;
using Gaev.Microservices.Nancy;
using System.Web.Http.Dependencies;

namespace Duxa.Microservices.Nancy
{

    public  class BuldHttpConfiguration : HttpConfiguration
    {
       // public static Func<IDependencyResolver> DependencyResolver { get; private set; }
        public  BuldHttpConfiguration()
        {
            ConfigureRoutes();
         
          
        }

        private  void ConfigureRoutes()
        {
            Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            this.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
           
            //HttpConfiguration.DependencyResolver = (IDependencyResolver)new WebApiDependencyResolver(MainConfiguration.Container);
            
            //DependencyResolver.SetResolver(new WebApiDependencyResolver(MainConfiguration.Container));
        }

       
    }

    public   class Startup
    {
      public  void Configuration(IAppBuilder app)
        {
            var config = new BuldHttpConfiguration();
            var builder = new ContainerBuilder();
            AutofacConfiguraion.Modules = new List<Module>();
            AutofacConfiguraion.Modules.Add(new AppModule());
            AutofacConfiguraion.Modules.ForEach(m => builder.RegisterModule(m));
           var container= builder.Build();

            var dependencyResolver = new AutofacWebApiDependencyResolver(container);
            config.DependencyResolver = dependencyResolver;
            app.UseWebApi(config);
        }
    }
}
