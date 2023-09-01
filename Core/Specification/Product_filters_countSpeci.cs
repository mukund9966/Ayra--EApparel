// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using Core.Entities;

// namespace Core.Specification
// {
//     public class Product_filters_countSpeci: BaseSpecification<Product>
//     {
//         public Product_filters_countSpeci(ProductSpecificationParams productParams)
//         :base(x => 
//             (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
//             (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId )
//             )
//         {
            
//         }
//     }
    
// }