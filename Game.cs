namespace api
{
    using System;
    using System.Collections.Generic;
    public class Game
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Dictionary<string, string> State { get; set; } // store current state for now, convert to full history at some point
        public bool IsWhiteTurn { get; set; } = true;
        public DateTime LastMoveAt { get; set; } = DateTime.Now;
        public List<string> WhiteLosses { get; set; } = new List<string>();
        public List<string> BlackLosses { get; set; } = new List<string>();
    }

}