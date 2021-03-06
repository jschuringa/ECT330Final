﻿using System;
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
using code.Filters;
using System.Text;
using System.Security.Cryptography;

namespace code.Controllers
{
    public class customerController : ApiController
    {
        private DBcontext db = new DBcontext();

        // GET api/customer
        [BasicAuthenticationFilter]
        public IHttpActionResult Getcustomers()
        {
            
            try {
                int customerId = (int) Request.Properties["id"];

                customer customer = db.customers.Find(customerId);
                if (customer == null) {
                    return Unauthorized();
                }

                return Ok(customer);
            } catch (KeyNotFoundException e) {
                return Unauthorized();
            }
        }

        // GET api/customer/5
        [ResponseType(typeof(customer))]
        [BasicAuthenticationFilter]
        public IHttpActionResult Getcustomer(int id)
        {
            if (id == (int)Request.Properties["id"]) {
                customer customer = db.customers.Find(id);
                if (customer == null) {
                    return NotFound();
                }

                return Ok(customer);
            } else {
                return Unauthorized();
            }
            
        }

        // PUT api/customer/5
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

        // POST api/customer
        [ResponseType(typeof(customer))]
        public IHttpActionResult Postcustomer(customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            customer c = customer;
            String password = "$$$$$" + customer.password + "$#!%^";
            var pwdBytes = Encoding.UTF8.GetBytes(password);

            SHA256 hashAlg = new SHA256Managed();
            hashAlg.Initialize();
            var hashedBytes = hashAlg.ComputeHash(pwdBytes);
            var hash = Convert.ToBase64String(hashedBytes);

            c.password = hash;

            db.customers.Add(c);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = customer.customerID }, customer);
        }

        // DELETE api/customer/5
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