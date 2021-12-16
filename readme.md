
A chessboard with no validation to tell you what moves you can make.
Currently requires a blob storage account.

Build:
```
docker build . -t chess
```

Add your connection string to the .env.example file and run this
```
docker run -p 3000:80 --env-file .env.example chess:latest
```

Go to localhost:3000
