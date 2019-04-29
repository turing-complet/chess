using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private GameRepository _repository;
        
        public GameController(IConfiguration config)
        {
            string conn = Environment.GetEnvironmentVariable("BLOB_CONNECTION");
            _repository = new GameRepository(conn);
        }
        
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return _repository.List();
        }

        [HttpGet("{id}")]
        public Game Get(Guid id)
        {
            return _repository.GetGame(id);
        }

        [HttpPost]
        public Guid Post([FromBody] Game game)
        {
            _repository.Save(game);
            return game.Id;
        }

        [HttpPut("{id}")]
        public void Put(Guid id, [FromBody] Game game)
        {
            if (!id.Equals(game.Id))
            {
                throw new Exception("Ids don't match. What have I done.");
            }
            _repository.Save(game);
        }
    }
}
