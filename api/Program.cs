using Microsoft.EntityFrameworkCore;
using rubrixapi.Data;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.AspNetCore.Authentication;
using rubrixapi.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Authentication.OAuth;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Primitives;
using Microsoft.Extensions.Options;


WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers() ;
builder.Services.AddSwaggerGenNewtonsoftSupport();

builder.Services
    .AddMvc()
    // Or .AddControllers(...)
    .AddJsonOptions(opts =>
    {
        //var enumConverter = new JsonStringEnumConverter();
        //opts.JsonSerializerOptions.Converters.Add(enumConverter);
        //opts.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
    });


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(options => options.AddPolicy("CORS_Policy", builder => builder.WithOrigins("*").WithMethods("PUT","GET", "POST", "OPTIONS","DELETE").AllowAnyHeader()));
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<RubrixDBContext>(options => options.UseSqlite(builder.Configuration["WebAPIConnection"]));
builder.Services.AddScoped<IRubrixRepo, RubrixRepo>();
builder.Services
.AddAuthentication()
    .AddScheme<AuthenticationSchemeOptions, UserAuthentication>("Authentication", null);

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("InstructorOnly", policy => policy.RequireClaim("Instructor"));
    options.AddPolicy("MarkerOnly", policy => policy.RequireAssertion(context =>
            context.User.HasClaim(c =>
             c.Type == "Instructor" || c.Type == "Marker")));
    options.AddPolicy("AuthOnly", policy => {
        policy.RequireAssertion(context =>
            context.User.HasClaim(c =>
            (c.Type == "Student" || c.Type == "Instructor" || c.Type == "Marker" || c.Type == "User")));
    });
});

WebApplication app = builder.Build();
app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseSwagger();
app.UseSwaggerUI();


app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();
app.Run();
