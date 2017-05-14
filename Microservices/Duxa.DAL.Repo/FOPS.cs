using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Duxa.DAL.Repo
{
    //[BsonIgnoreExtraElements]
    public class FOPS
    {
        public ObjectId id { get; set; }
        public string FIO { get; set; }
        public string Address { get; set; }
        public string MainActivity { get; set; }
        public string Status { get; set; }
    }
}