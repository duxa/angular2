using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Duxa.DAL.Repo;
using System.Configuration;
using MongoDB.Driver;

namespace Duxa.DAL
{
    public class ClientRepository: RepositoryBase<FOPS>, IClientRepository
    {


        public ClientRepository() : 
            base(ConfigurationManager.AppSettings["MongoConnectionString"], "FOPS")
        {
        }

        public void CreateFopsIndexes()
        {
            this._database.GetCollection<FOPS>("FOPS").Indexes.CreateOne(Builders<FOPS>.IndexKeys.Ascending(r => r.FIO), new CreateIndexOptions() { Name = "FIOIndexAsc", Background = true });
            this._database.GetCollection<FOPS>("FOPS").Indexes.CreateOne(Builders<FOPS>.IndexKeys.Ascending(r => r.Address), new CreateIndexOptions() { Name = "AddressIndexAsc", Background = true });
        }

    }
}
