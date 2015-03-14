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

namespace code.Controllers
{
    public class addressController : ApiController
    {
        private DBcontext db = new DBcontext();

        // GET api/address
        [Authorize]
        public IQueryable<address> Getaddresses()
        {
            return db.addresses;
        }

        // GET api/address/5
        [Authorize]
        [ResponseType(typeof(address))]
        public IHttpActionResult Getaddress(int id)
        {
            address address = db.addresses.Find(id);
            if (address == null)
            {
                return NotFound();
            }

            return Ok(address);
        }

        // PUT api/address/5
        [Authorize]
        public IHttpActionResult Putaddress(int id, address address)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != address.custAddressID)
            {
                return BadRequest();
            }

            db.Entry(address).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!addressExists(id))
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

        // POST api/address
        [ResponseType(typeof(address))]
        [Authorize]
        public IHttpActionResult Postaddress(address address)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.addresses.Add(address);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = address.custAddressID }, address);
        }

        // DELETE api/address/5
        [ResponseType(typeof(address))]
        [Authorize]
        public IHttpActionResult Deleteaddress(int id)
        {
            address address = db.addresses.Find(id);
            if (address == null)
            {
                return NotFound();
            }

            db.addresses.Remove(address);
            db.SaveChanges();

            return Ok(address);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool addressExists(int id)
        {
            return db.addresses.Count(e => e.custAddressID == id) > 0;
        }
    }
}