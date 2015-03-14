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
    public class itemController : ApiController
    {
        private DBcontext db = new DBcontext();

        // GET api/item
        public IQueryable<item> Getitems()
        {
            return db.items;
        }

        // GET api/item/5
        [ResponseType(typeof(item))]
        public IHttpActionResult Getitem(int id)
        {
            item item = db.items.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // PUT api/item/5
        [Authorize]
        public IHttpActionResult Putitem(int id, item item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != item.itemID)
            {
                return BadRequest();
            }

            db.Entry(item).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!itemExists(id))
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

        // POST api/item
        [ResponseType(typeof(item))]
        public IHttpActionResult Postitem(item item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.items.Add(item);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = item.itemID }, item);
        }

        // DELETE api/item/5
        [ResponseType(typeof(item))]
        [Authorize]
        public IHttpActionResult Deleteitem(int id)
        {
            item item = db.items.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            db.items.Remove(item);
            db.SaveChanges();

            return Ok(item);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool itemExists(int id)
        {
            return db.items.Count(e => e.itemID == id) > 0;
        }
    }
}