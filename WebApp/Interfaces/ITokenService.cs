using WebApp.Entities;

namespace WebApp.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
