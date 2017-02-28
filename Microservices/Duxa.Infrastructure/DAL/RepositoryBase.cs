using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Duxa.DAL.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Duxa.DAL
{
    public abstract class RepositoryBase<TEntity> : IRepository<TEntity>
    {
        private readonly MongoClient _client;
        private readonly IMongoDatabase _database;

        private readonly string _connectionString;

        public IMongoCollection<TEntity> Collection { get; set; }

        public RepositoryBase(string connectionString, string collectionName)
        {
            this._client = new MongoClient(connectionString);
            this._database = this.GetDatabase(collectionName);
            this.Collection = this._database.GetCollection<TEntity>(collectionName);
        }

        private IMongoDatabase GetDatabase(string collectionName)
        {
            return this._client.GetDatabase(new MongoUrl(connectionString).DatabaseName);
        }

        public TEntity Get(Expression<Func<TEntity, bool>> predicate)
        {
            return this.Collection.AsQueryable().First(predicate);
        }

        public void Save(TEntity entity)
        {
            this.Collection.InsertOne(entity);
        }

        public void Save(List<TEntity> entity)
        {
            this.Collection.InsertMany(entity);
        }
    }
}
