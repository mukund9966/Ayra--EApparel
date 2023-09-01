using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extension
{
    public static  class IdentityServiceExt
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config){

            services.AddDbContext<AppIdentityDbContext>(opt => {
                opt.UseSqlite(config.GetConnectionString("IdentityConnection"));
                });


            services.AddIdentityCore<AppUser>(opt=>
            {
                // opt.Password.RequireNonAlphanumeric = false;
            })
            .AddEntityFrameworkStores<AppIdentityDbContext>()
            .AddSignInManager<SignInManager<AppUser>>();

            services.AddAuthentication();
            services.AddAuthorization();
            

            
            
        return services;
        }
    }
}