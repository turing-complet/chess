FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build-env
WORKDIR /app

# copy the contents of agent working directory on host to workdir in container
COPY . ./

# dotnet commands to build, test, and publish
RUN dotnet restore
RUN dotnet build -c Release
RUN dotnet publish -c Release -o out

FROM node:latest as tsbuild

RUN npm install -g typescript
WORKDIR /app
COPY tsconfig.json ./
COPY wwwroot/*.ts ./
RUN ls
RUN tsc -p tsconfig.json

# Second stage - Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:3.1
WORKDIR /app
COPY --from=tsbuild /app ./wwwroot
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "api.dll"]
