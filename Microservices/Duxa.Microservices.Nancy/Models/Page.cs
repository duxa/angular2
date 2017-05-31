using Duxa.DAL.Repo;
using System;
using System.Collections.Generic;


namespace Gaev.Microservices.Nancy.Models
{
    public class FOPPage
    {
        //public Page(int? page, int pageSize = 10)
        //{

        //}

        public List<FOPS> PageOfResults { get;  set; }
        public long RecordsTotal { get;  set; }
        public int PageNumber { get;  set; }
        public long PageCount { get;  set; }
    }
}
