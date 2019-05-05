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
            IEnumerable<CloudBlockBlob> blobs = _cloudBlobContainer.ListBlobs().Select(b => b as CloudBlockBlob);
            return blobs.Select(b => b.Name);
        }
        
        // why returns 204
        public Game GetGame(Guid id)
        {
            CloudBlockBlob blockBlob = _cloudBlobContainer.GetBlockBlobReference(id.ToString());
            var jsonStream = new MemoryStream();
            blockBlob.DownloadToStream(jsonStream);
            jsonStream.Position = 0;
            return DeserializeFromStream<Game>(jsonStream);
        }

        public void Save(Game game)
        {
            CloudBlockBlob blockBlob = _cloudBlobContainer.GetBlockBlobReference(game.Id.ToString());
            blockBlob.UploadText(JsonConvert.SerializeObject(game));
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