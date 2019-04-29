namespace api
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.IO;
    using Microsoft.Azure.Storage;
    using Microsoft.Azure.Storage.Blob;
    using Newtonsoft.Json;

    public class GameRepository
    {
        private CloudBlobContainer _cloudBlobContainer;
        public GameRepository(string connectionString)
        {
            CloudStorageAccount storageAccount;
            if (CloudStorageAccount.TryParse(connectionString, out storageAccount))
            {
                CloudBlobClient cloudBlobClient = storageAccount.CreateCloudBlobClient();
                _cloudBlobContainer = cloudBlobClient.GetContainerReference("chess");
                _cloudBlobContainer.CreateIfNotExists();
            }
        }

        public IEnumerable<string> List()
        {
            var blobs = _cloudBlobContainer.ListBlobs();
            return blobs.Select(b => b.StorageUri.ToString());
        }
        
        public Game GetGame(Guid id)
        {
            CloudBlockBlob blockBlob = _cloudBlobContainer.GetBlockBlobReference(id.ToString("N"));
            using (Stream jsonStream = new MemoryStream())
            {
                blockBlob.DownloadToStream(jsonStream);
                return DeserializeFromStream<Game>(jsonStream);
            }
        }

        public void Save(Game game)
        {
            CloudBlockBlob blockBlob = _cloudBlobContainer.GetBlockBlobReference(game.Id.ToString("N"));
            using (var memStream = new MemoryStream())
            {
                SerializeToStream(memStream, game);
                blockBlob.UploadFromStream(memStream);
            }
        }

        private void SerializeToStream(Stream stream, Game game)
        {
            var serializer = new JsonSerializer();
            using (var sr = new StreamWriter(stream))
            using (var jsonWriter = new JsonTextWriter(sr))
            {
                serializer.Serialize(jsonWriter, game);
            }
        }

        private T DeserializeFromStream<T>(Stream stream)
        {
            var serializer = new JsonSerializer();

            using (var sr = new StreamReader(stream))
            using (var jsonTextReader = new JsonTextReader(sr))
            {
                return serializer.Deserialize<T>(jsonTextReader);
            }
        }
    }
}