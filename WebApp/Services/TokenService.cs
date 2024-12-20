﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using WebApp.Entities;
using WebApp.Interfaces;

namespace WebApp.Services
{
    public class TokenService(IConfiguration config) : ITokenService
    {
        public string CreateToken(AppUser user)
        {
            var tokenKey = config["TokenKey"] ?? throw new Exception("cannot access tokenKey from app settings");

            if (tokenKey.Length < 64) throw new Exception("your token needs to be longer");

            var key= new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

            var claims= new List<Claim>
            {
                new(ClaimTypes.NameIdentifier,user.UserName),
            };

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                SigningCredentials = creds,
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7)
            };

            var tokenHandler= new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateJwtSecurityToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
