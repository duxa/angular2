using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Duxa.DAL.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Duxa.DAL
{
    public abstract class RepositoryBase<TEntity> : IRepository<TEntity>
    {
        private readonly MongoClient _client;
        protected readonly IMongoDatabase _database;

        private readonly string _connectionString;

        public IMongoCollection<TEntity> Collection { get; set; }

        public RepositoryBase(string connectionString, string collectionName)
        {
            this._client = new MongoClient(connectionString);
            this._database = this.GetDatabase(connectionString);
            this.Collection = this._database.GetCollection<TEntity>(collectionName);
        }

        private IMongoDatabase GetDatabase(string connectionString)
        {
            return this._client.GetDatabase(new MongoUrl(connectionString).DatabaseName);
        }

        public TEntity Get(Expression<Func<TEntity, bool>> predicate)
        {
            return this.Collection.AsQueryable().First(predicate);
        }

        public List<TEntity> GetAll()
        {
            return this.Collection.AsQueryable().ToList();
        }

        public void DeleteAll(string collectionName)
        {
            _database.DropCollection(collectionName);
            _database.CreateCollection(collectionName);
        }

        public long Count()
        {
            return this.Collection.Count(Builders<TEntity>.Filter.Empty);
        }
        public List<TEntity> GetPage(int pageNumber, int itemsOnPage)
        {
            return this.Collection.AsQueryable().Skip(itemsOnPage * pageNumber).Take(itemsOnPage).ToList();
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
