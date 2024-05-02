using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeopleCarsReact.Data
{
    public class CarsRepository
    {
        private readonly string _connectionString;
        public CarsRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddCar(Car car)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Cars.Add(car);
            context.SaveChanges();
        }

        public List<Car> GetCarsForPerson(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.Cars.Where(c => c.PersonId == id).ToList();
        }

        public void DeleteCarsForPerson(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            var cars = context.Cars.Where(c => c.PersonId == id).ToList();
            context.Cars.RemoveRange(cars);
            context.SaveChanges();
        }
    }
}
