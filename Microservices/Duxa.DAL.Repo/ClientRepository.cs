using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Duxa.DAL.Repo;

namespace Duxa.DAL
{
    public class ClientRepository: RepositoryBase<FOPS>, IClientRepository
    {
        public ClientRepository() : 
            base("mongodb://localhost/Registry", "FOPS")
        {
        }
    }
}
