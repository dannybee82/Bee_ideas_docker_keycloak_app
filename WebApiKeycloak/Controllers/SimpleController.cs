using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiKeycloak.Models;

namespace WebApiKeycloak.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SimpleController : ControllerBase
    {

        [HttpGet("GetPublicAccessibleMessage")]
        public async Task<IActionResult> GetPublicAccessibleMessage()
        {
            return Ok(new ResponseModel() { Message = "Let's say: Hello!" });
        }

        //Note: [Authorize(Roles = "ADMIN")] -> Multivalued-option needs to be enabled [!], see in Keycloak: Client Scopes -> 'USER_REALM_ROLES' ->
        //Mappers -> 'user-realm-role' -> Multivalued => ON

        [Authorize(Roles = "ADMIN")]
        [HttpGet("GetMessageForAdminsOnly")]
        public async Task<IActionResult> GetMessageForAdminsOnly()
        {
            return Ok(new ResponseModel() { Message = "Message from protected resource for admins." });
        }

        [Authorize(Roles = "USER")]
        [HttpGet("GetMessageForUsersOnly")]
        public async Task<IActionResult> GetMessageForUsersOnly()
        {
            return Ok(new ResponseModel() { Message = "This is only for USERS." });
        }

        [Authorize(Roles = "REGISTERED")]
        [HttpGet("GetMessageForRegisteredOnly")]
        public async Task<IActionResult> GetMessageForRegisteredOnly()
        {
            return Ok(new ResponseModel() { Message = "Your status is: REGISTERED." });
        }
    }
}
