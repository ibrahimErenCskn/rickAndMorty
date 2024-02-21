using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RickAndMortyWebApi.Models;

namespace RickAndMortyWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CharactersMsController : ControllerBase
    {
        private readonly APIDbContext _context;

        public CharactersMsController(APIDbContext context)
        {
            _context = context;
        }

        // GET: api/CharactersMs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CharactersM>>> GetCharactersM()
        {
            return await _context.CharactersM.ToListAsync();
        }

        // GET: api/CharactersMs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CharactersM>> GetCharactersM(int id)
        {
            var charactersM = await _context.CharactersM.FindAsync(id);

            if (charactersM == null)
            {
                return NotFound();
            }

            return charactersM;
        }

        // PUT: api/CharactersMs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCharactersM(int id, CharactersM charactersM)
        {
            if (id != charactersM.Id)
            {
                return BadRequest();
            }

            _context.Entry(charactersM).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CharactersMExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CharactersMs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CharactersM>> PostCharactersM(CharactersM charactersM)
        {
            _context.CharactersM.Add(charactersM);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCharactersM", new { id = charactersM.Id }, charactersM);
        }

        // DELETE: api/CharactersMs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCharactersM(int id)
        {
            var charactersM = await _context.CharactersM.FindAsync(id);
            if (charactersM == null)
            {
                return NotFound();
            }

            _context.CharactersM.Remove(charactersM);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CharactersMExists(int id)
        {
            return _context.CharactersM.Any(e => e.Id == id);
        }
    }
}
