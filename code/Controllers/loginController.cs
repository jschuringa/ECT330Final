using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using code.Models;
using System.Web;

namespace code.Controllers
{
    public class loginController : ApiController
    {
        private DBcontext db = new DBcontext();

        // GET api/login
        public IQueryable<customer> Getcustomers()
        {
            return db.customers;
        }

        // GET api/login/5
        [ResponseType(typeof(customer))]
        public IHttpActionResult Getcustomer(int id)
        {
            customer customer = db.customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        // PUT api/login/5
        public IHttpActionResult Putcustomer(int id, customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customer.customerID)
            {
                return BadRequest();
            }

            db.Entry(customer).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!customerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/login
        [ResponseType(typeof(customer))]
        public IHttpActionResult login(customer customer)
        {
            using (DBcontext context = new DBcontext())
            {
                var user = (from s in context.customers
                            where s.username == customer.username && s.password == customer.password
                            select s).FirstOrDefault();


                if (user != null)
                {
                    HttpContext.Current.Session["LoggedInId"] = customer.customerID.ToString();
                    HttpContext.Current.Session["Username"] = customer.username;
                    return Ok(customer);
                }
                else
                {
                    return NotFound();
                }
            }

        }

        // DELETE api/login/5
        [ResponseType(typeof(customer))]
        public IHttpActionResult Deletecustomer(int id)
        {
            customer customer = db.customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }

            db.customers.Remove(customer);
            db.SaveChanges();

            return Ok(customer);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool customerExists(int id)
        {
            return db.customers.Count(e => e.customerID == id) > 0;
        }
    }
}