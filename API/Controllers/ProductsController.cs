using API.Controllers.Dto;
using API.Ext;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  
    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> ProductsRepo;
        private readonly IGenericRepository<ProductBrand> ProductBrandRepo;
        private readonly IGenericRepository<ProductType> ProductTypeRepo;
       public ProductsController(IGenericRepository<Product> productsRepo, IGenericRepository<ProductBrand> productBrandRepo, IGenericRepository<ProductType> productTypeRepo)
        {
            this.ProductTypeRepo = productTypeRepo;
            this.ProductBrandRepo = productBrandRepo;
            this.ProductsRepo = productsRepo;

        }

        [HttpGet]



        public async Task<ActionResult<List<Product_To_Return>>> GetProducts(
            [FromQuery]ProductSpecificationParams productParams)
        {
            var spec = new Products_Types_Brands_Speci(productParams);
            var products = await ProductsRepo.ListAsync(spec);

            return products.Select(product => new Product_To_Return{
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                PictureUrl = product.PictureUrl,
                ProductBrand = product.ProductBrand.Name,
                ProductType = product.ProductType.Name
            }).ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product_To_Return>> GetProduct(int id)
        {
            var spec = new Products_Types_Brands_Speci(id);
         var product =     await ProductsRepo.GetEntityWithSpec(spec);
            // return Porductdto
            return new Product_To_Return{
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                PictureUrl = product.PictureUrl,
                ProductBrand = product.ProductBrand.Name,
                ProductType = product.ProductType.Name
            };
     
        }

         [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await ProductBrandRepo.ListAllAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductsTypes()
        {
            return Ok(await ProductTypeRepo.ListAllAsync());         
        }
    }

    internal class ApiResponse
    {
        private int v;

        public ApiResponse(int v)
        {
            this.v = v;
        }
    }
}