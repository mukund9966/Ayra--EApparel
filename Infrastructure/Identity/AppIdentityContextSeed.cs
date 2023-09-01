using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    Dispname = "Bob",
                    Email = " bob@test.com",
                    UserName = "bob@test.com",
                    Address = new Address
                    {
                        Fname = "Bob",
                        Lname = "Bobbity",
                        Street = "10 The Street",
                        City = "New York",
                        StateProv = "NY",
                        ZipCode = "90210"
                    }
   
                 };
                 await userManager.CreateAsync(user, "Pa$$w0rd");
                  }
    }
    }
}

