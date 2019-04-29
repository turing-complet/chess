namespace api
{
    using System;
    using System.Collections.Generic;
    public class Game
    {
        public Guid Id { get; set; }
        public Dictionary<string, string> State { get; set; } // store current state for now, convert to full history at some point
        public bool IsWhiteTurn { get; set; } = true;
        public DateTime LastMoveAt { get; set; }
    }

}