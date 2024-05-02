using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PeopleCarsReact.Data;

namespace PeopleCarsReact.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("GetAll")]
        public List<Person> GetPeopleAndCars()
        {
            var repo = new PeopleRepository(_connectionString);
            return repo.GetPeopleAndCars();
        }

        [HttpPost]
        [Route("addperson")]
        public void AddPerson(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.AddPerson(person);
        }

        [HttpGet]
        [Route("getperson")]
        public Person GetPerson(int id)
        {
            var repo = new PeopleRepository(_connectionString);
            return repo.GetPersonById(id);
        }

       
       

    }
}
