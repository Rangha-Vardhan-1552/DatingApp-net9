using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.DTO;
using WebApp.Entities;
using WebApp.Interfaces;

namespace WebApp.Controllers
{

    public class AccountController(DataContext _dataContext,ITokenService tokenService) : BaseApiController
    {   
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExist(registerDto.Username))  return BadRequest("user already exist");

           using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                UserName = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            await _dataContext.Users.AddAsync(user);
            await _dataContext.SaveChangesAsync();
            var data = new UserDto
            {
                Username = user.UserName,
                Token = tokenService.CreateToken(user)
            };
            
            return Ok(data);

        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(x=>x.UserName == loginDto.Username.ToLower());
            if (user == null) return BadRequest("Invalid username");

            using var hmac=new HMACSHA512(key:user.PasswordSalt);
            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for (int i = 0; i < computeHash.Length; i++)
            {
                if (computeHash[i] != user.PasswordHash[i])  return Unauthorized("Invalid password");
            }

            var data = new UserDto
            {
                Username = user.UserName,
                Token = tokenService.CreateToken(user)
            };
            return Ok(data);

        }

        private async Task<bool> UserExist(string username)
        {
            return await _dataContext.Users.AnyAsync(x=>x.UserName.ToLower()== username.ToLower());
            
        }
    }
}
