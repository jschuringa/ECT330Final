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
    public class PaymentOptionController : ApiController
    {
        private DBcontext db = new DBcontext();

        // GET api/PaymentOption
        public IQueryable<paymentOption> GetpaymentOptions()
        {
            return db.paymentOptions;
        }

        // GET api/PaymentOption/5
        [ResponseType(typeof(paymentOption))]
        public IHttpActionResult GetpaymentOption(int id)
        {
            paymentOption paymentoption = db.paymentOptions.Find(id);
            if (paymentoption == null)
            {
                return NotFound();
            }

            return Ok(paymentoption);
        }

        // PUT api/PaymentOption/5
        public IHttpActionResult PutpaymentOption(int id, paymentOption paymentoption)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != paymentoption.custPayOptID)
            {
                return BadRequest();
            }

            db.Entry(paymentoption).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!paymentOptionExists(id))
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

        // POST api/PaymentOption
        [ResponseType(typeof(paymentOption))]
        public IHttpActionResult PostpaymentOption(paymentOption paymentoption)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.paymentOptions.Add(paymentoption);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = paymentoption.custPayOptID }, paymentoption);
        }

        // DELETE api/PaymentOption/5
        [ResponseType(typeof(paymentOption))]
        public IHttpActionResult DeletepaymentOption(int id)
        {
            paymentOption paymentoption = db.paymentOptions.Find(id);
            if (paymentoption == null)
            {
                return NotFound();
            }

            db.paymentOptions.Remove(paymentoption);
            db.SaveChanges();

            return Ok(paymentoption);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool paymentOptionExists(int id)
        {
            return db.paymentOptions.Count(e => e.custPayOptID == id) > 0;
        }
    }
}