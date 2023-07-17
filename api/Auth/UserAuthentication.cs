using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using rubrixapi.Controllers;
using rubrixapi.Data;
using rubrixapi.Models;
using System.Web.Http;
using System.Net;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using System.Web;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using System.Runtime.CompilerServices;

namespace rubrixapi.Auth
{
    public class UserAuthentication : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        private readonly IRubrixRepo _repo;
        private readonly ILogger _logger;
        private IConfiguration configuration;

       
        public UserAuthentication(
            IOptionsMonitor<AuthenticationSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock,
            IConfiguration configuration,
            IRubrixRepo repo,
            ILogger<IRubrixRepo> logge)
            : base(options, logger, encoder, clock)
        {
            this.configuration = configuration;
            _repo = repo;
            _logger = logge;
        }



        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Request.Headers.ContainsKey("Authorization"))
            {
                Response.Headers.Add("WWW-Authenticate", "Basic");
                return AuthenticateResult.Fail("Authorization header not found.");
            }
            else
            {
                var authHeader = AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]);
                var credentialBytes = Convert.FromBase64String(authHeader.Parameter);
                var credentials = Encoding.UTF8.GetString(credentialBytes).Split(":");
                var username = credentials[0];
                var password = credentials[1];
                if (IsValidLogin(username, password))
                {
                    User user = _repo.GetUser(username);
                    if (user != null)
                    {
                        var claims = new[] { new Claim("User", username) };

                        ClaimsIdentity identity = new ClaimsIdentity(claims, "Basic");
                        ClaimsPrincipal principal = new ClaimsPrincipal(identity);

                        AuthenticationTicket ticket = new AuthenticationTicket(principal, Scheme.Name);
                        //AuthenticationTicket ticket = new AuthenticationTicket(null, "");
                        //Console.WriteLine("auth scheme : {0}", Scheme.Name);

                        return AuthenticateResult.Success(ticket);

                    }
                }
                return AuthenticateResult.Fail("Username and Password do not match");
            }
        }

        public static string HashPassword(params string[] input)
        {
            MD5 md5 = MD5.Create();
            StringBuilder stringBuilder = new StringBuilder();
            for (int index = 0; index < input.Length; ++index)
            {
                string str = input[index];
                stringBuilder.AppendFormat(index == input.Length - 1 ? "{0}" : "{0}:", (object)str);
            }
            byte[] bytes = Encoding.UTF8.GetBytes(stringBuilder.ToString());
            byte[] hash = md5.ComputeHash(bytes);
            stringBuilder.Clear();
            for (int index = 0; index < hash.Length; ++index)
                stringBuilder.Append(hash[index].ToString("x2"));
            return stringBuilder.ToString();
        }

        private bool IsValidLogin(string username, string password)
        {
            User u =  _repo.GetUser(username);
            if (u != null)
            {
                string pass = HashPassword(u.Username, u.FirstName, u.LastName, password);
                if (pass == u.Password)
                {
                    return true;
                }
            }
            return false;

        }





    }
}
