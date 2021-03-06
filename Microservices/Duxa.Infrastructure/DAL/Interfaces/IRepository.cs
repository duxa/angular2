﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Duxa.DAL.Interfaces
{
    public interface IRepository<TEntity>
    {
        TEntity Get(Expression<Func<TEntity, bool>> predicate);
        List<TEntity> GetAll();
        void Save(TEntity entity);
        void Save(List<TEntity> entity);
        void DeleteAll(string collectionName);
        long Count();
        List<TEntity> GetPage(int pageNumber, int itemsOnPage);
    }
}
