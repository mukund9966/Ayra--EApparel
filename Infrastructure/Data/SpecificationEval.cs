using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Specification;
using Microsoft.EntityFrameworkCore;
// used to evaluate the specification(going to pass in the specification and get back the query)(BaseSpecification)
namespace Infrastructure.Data
{
    public class SpecificationEval<TEntity> where TEntity : BaseEntity
    {
        public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery, ISpecification<TEntity> spec)
        {
            // evaluate the criteria
            var query = inputQuery;
            if(spec.Criteria != null)
            {
                query = query.Where(spec.Criteria);    //x => x.Id == id
            }

            //  evaluate the order by
            if(spec.OrderBy != null)
            {
                query = query.OrderBy(spec.OrderBy);
            }

            //  evaluate the order by descending
            if(spec.OrderByDescending != null)
            {
                query = query.OrderByDescending(spec.OrderByDescending);
            }

            // if(spec.IsPagingEnabled)
            // {
            //     query = query.Skip(spec.Skip).Take(spec.Take);
            // }

            //  evaluate the includes
            query = spec.Includes.Aggregate(query, (current, include) => current.Include(include));

            return query;
        }

        
    }
}