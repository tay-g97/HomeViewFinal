using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using HomeView.Models.Account;
using HomeView.Models.Profilephoto;
using HomeView.Repository;
using HomeView.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeView.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfilephotoController : ControllerBase
    {
        private readonly IProfilephotoRepository _profilephotoRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IPhotoService _photoService;

        public ProfilephotoController(
            IProfilephotoRepository profilephotoRepository,
            IAccountRepository accountRepository,
            IPhotoService photoService)
        {
            _profilephotoRepository = profilephotoRepository;
            _accountRepository = accountRepository;
            _photoService = photoService;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Profilephoto>> UploadPhoto(IFormFile file)
        {
            int userId = int.Parse(User.Claims.First(i => i.Type == JwtRegisteredClaimNames.NameId).Value);

            if (file == null)
            {
                return BadRequest("No file uploaded");
            }

            var uploadResult = await _photoService.AddPhotoAsync(file);

            if (uploadResult.Error != null) return BadRequest(uploadResult.Error.Message);

            var profilephotoCreate = new ProfilephotoCreate
            {
                PublicId = uploadResult.PublicId,
                ImageUrl = uploadResult.SecureUrl.AbsoluteUri,
            };

            var profilephoto = await _profilephotoRepository.InsertAsync(profilephotoCreate, userId);

            return Ok(profilephoto);
        }

        [HttpGet("{photoId}")]
        public async Task<ActionResult<Profilephoto>> Get(int photoId)
        {
            var profilephoto = await _profilephotoRepository.GetAsync(photoId);

            if (profilephoto == null)
            {
                return NotFound("Photo does not exist");
            }

            return Ok(profilephoto);
        }

        [Authorize]
        [HttpGet("user")]
        public async Task<ActionResult<List<Profilephoto>>> GetById()
        {
            int currentUserId = int.Parse(User.Claims.First(i => i.Type == JwtRegisteredClaimNames.NameId).Value);
            var username = await _accountRepository.GetUsernameByIdAsync(currentUserId);

            if (username == null)
            {
                return NotFound("User does not exist");
            }

            var profilephotos = await _profilephotoRepository.GetAllByIdAsync((currentUserId));

            if (profilephotos == null)
            {
                return NotFound("User has no photos");
            }

            return Ok(profilephotos);
        }

        [Authorize]
        [HttpDelete("delete/{photoId}")]

        public async Task<ActionResult<int>> Delete(int photoId)
        {
            int userId = int.Parse(User.Claims.First(i => i.Type == JwtRegisteredClaimNames.NameId).Value);

            var foundProfilephoto = await _profilephotoRepository.GetAsync(photoId);
            if (foundProfilephoto == null)
            {
                return BadRequest("Photo does not exist");
            }

            var currentUser = await _accountRepository.GetByIdAsync(userId);
            if (currentUser.ProfilepictureId == photoId)
            {
                return BadRequest("Cannot delete active profile picture");
            }

            if (foundProfilephoto.UserId == userId)
            {
                var deleteResult = await _photoService.DeletePhotoAsync(foundProfilephoto.PublicId);

                if (deleteResult.Error != null) return BadRequest(deleteResult.Error.Message);

                var affectedRows = await _profilephotoRepository.DeleteAsync(foundProfilephoto.PhotoId);

                return Ok("Deleted " + affectedRows + " photos");
            }
            
            return Unauthorized("Photo was not uploaded by the current user.");

        }


    }

}
