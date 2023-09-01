using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Core.Specification
{
    public class BaseSpecification<T> : ISpecification<T>
    {
        public BaseSpecification()
        {
        }

// criteria is the expression that we want to evaluate, eg: x => x.Id == id
        public BaseSpecification(Expression<Func<T, bool>> criteria)
        {   
            Criteria = criteria; 
        }
        

        public Expression<Func<T, bool>> Criteria {get;}

        public List<Expression<Func<T, object>>> Includes {get;} =  new List<Expression<Func<T, object>>>(); //initialize the list  to empty

        public Expression<Func<T, object>> OrderBy {get; private set;}

        public Expression<Func<T, object>> OrderByDescending {get; private set;}

        // public int Take {get; private set;}

        // public int Skip {get; private set;}

        // public bool IsPagingEnabled {get; private set;}

        // adding a method to add includes to our list
        protected void AddInclude(Expression<Func<T, object>> includeExpression)
        {
            Includes.Add(includeExpression);
        }
        protected void AddOrderBy(Expression<Func<T, object>> orderByExpression)
        {
            OrderBy = orderByExpression;
        }

        protected void AddOrderByDescending(Expression<Func<T, object>> orderByDescExpression)
        {
            OrderByDescending = orderByDescExpression;
        }

        // protected void ApplyPaging(int skip, int take)
        // {
        //     Skip = skip;
        //     Take = take;
        //     IsPagingEnabled = true;

        // }
    }
}