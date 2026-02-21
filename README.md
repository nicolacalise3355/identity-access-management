#Custom identity-access-management
Identify and Access Management

run..
chmod +x install.sh start.sh update-configs.sh

install mongo on docker

docker run -d \
  --name mongo-local \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=nicola \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  -v mongo_data:/data/db \
  mongo:latest


