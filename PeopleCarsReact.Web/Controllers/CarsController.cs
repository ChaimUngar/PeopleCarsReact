using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PeopleCarsReact.Data;

namespace PeopleCarsReact.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly string _connectionString;

        public CarsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("addcar")]
        public void AddCar(Car car)
        {
            var repo = new CarsRepository(_connectionString);
            repo.AddCar(car);

        }

        [HttpGet]
        [Route("getcars")]
        public List<Car> GetCars(int id)
        {
            var repo = new CarsRepository(_connectionString);
            return repo.GetCarsForPerson(id);
        }

        [HttpPost]
        [Route("deletecars")]
        public void DeleteCars(int id)
        {
            var repo = new CarsRepository(_connectionString);
            repo.DeleteCarsForPerson(id);
        }
    }
}
