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
    public class orderController : ApiController
    {
        private DBcontext db = new DBcontext();

        // GET api/order
        [Authorize]
        public IQueryable<order> Getorders()
        {
            return db.orders;
        }

        // GET api/order/5
        [ResponseType(typeof(order))]
        [Authorize]
        public IHttpActionResult Getorder(int id)
        {
            order order = db.orders.Find(id);
            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        // PUT api/order/5
        [Authorize]
        public IHttpActionResult Putorder(int id, order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != order.orderID)
            {
                return BadRequest();
            }

            db.Entry(order).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!orderExists(id))
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

        // POST api/order
        [ResponseType(typeof(order))]
        [Authorize]
        public IHttpActionResult Postorder(order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.orders.Add(order);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = order.orderID }, order);
        }

        // DELETE api/order/5
        [ResponseType(typeof(order))]
        [Authorize]
        public IHttpActionResult Deleteorder(int id)
        {
            order order = db.orders.Find(id);
            if (order == null)
            {
                return NotFound();
            }

            db.orders.Remove(order);
            db.SaveChanges();

            return Ok(order);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool orderExists(int id)
        {
            return db.orders.Count(e => e.orderID == id) > 0;
        }
    }
}