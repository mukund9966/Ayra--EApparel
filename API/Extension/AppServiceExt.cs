using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Interfaces;
using Infrastructue.Data;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

namespace API.Extension
{
    public static class AppServiceExt
    {
        public static IServiceCollection applicationServices(this IServiceCollection services, IConfiguration config){
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();
services.AddDbContext<StoreContext>(opt => 
{
    opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
});

services.AddSingleton<IConnectionMultiplexer>(c => {
    var configuration = ConfigurationOptions.Parse(config.GetConnectionString("Redis"), true);
    return ConnectionMultiplexer.Connect(configuration);
});

services.AddScoped<IBasketRepo, BasketRepo>();
services.AddScoped<IProductRepository, ProductRepo>();
services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepo<>));

services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200");
    });
});
            return services;
        }
    }
}