using Duxa.Microservices;
using Duxa.Microservices.Nancy.Duxa.Microservices;

class Program
{
    static void Main() => TopshelfHost.Boot<MicroserviceA>(serviceName: "MicroserviceA");
}

class MicroserviceA : Microservice
{
    protected override ISetup Starting() => It.Will().HaveName("A").UseAutofac().UseWebApi().Build();
}