using System.Linq.Expressions;
using System;
using System.Collections.Generic;

namespace Core.Specification
{
    public interface ISpecification<T>
    {
        // Criteria is the expression that we want to evaluate
        // Func is a delegate that takes an input and returns an output
        // T is the type of the entity that we are going to evaluate
        // We are going to evaluate the entity against the criteria
        // We are going to return a boolean value

        
         Expression<Func<T, bool>> Criteria {get;}
         List<Expression<Func<T, object>>> Includes {get;}  //to include the product type and product brand in product repo

         Expression<Func<T, object>> OrderBy {get;}
            Expression<Func<T, object>> OrderByDescending {get;}


// for pagination
            // int Take {get;}
            // int Skip {get;}
            // bool IsPagingEnabled {get;}
            
        
    }
}