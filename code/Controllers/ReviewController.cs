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
    public class reviewController : ApiController
    {
        private DBcontext db = new DBcontext();

        // GET api/review
        public IQueryable<review> Getreviews()
        {
            return db.reviews;
        }

        // GET api/review/5
        [ResponseType(typeof(review))]
        public IHttpActionResult Getreview(int id)
        {
            review review = db.reviews.Find(id);
            if (review == null)
            {
                return NotFound();
            }

            return Ok(review);
        }

        // PUT api/review/5
        public IHttpActionResult Putreview(int id, review review)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != review.reviewID)
            {
                return BadRequest();
            }

            db.Entry(review).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!reviewExists(id))
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

        // POST api/review
        [ResponseType(typeof(review))]
        public IHttpActionResult Postreview(review review)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.reviews.Add(review);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = review.reviewID }, review);
        }

        // DELETE api/review/5
        [ResponseType(typeof(review))]
        public IHttpActionResult Deletereview(int id)
        {
            review review = db.reviews.Find(id);
            if (review == null)
            {
                return NotFound();
            }

            db.reviews.Remove(review);
            db.SaveChanges();

            return Ok(review);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool reviewExists(int id)
        {
            return db.reviews.Count(e => e.reviewID == id) > 0;
        }
    }
}