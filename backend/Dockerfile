FROM node:13

ENV DOCKERIZE_VERSION v0.2.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \  
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Create app directory
RUN mkdir -p /app/storage
RUN chmod 606 /app/storage
WORKDIR /app

# Install dependencies
COPY package*.json /app/
RUN npm install -y

# Bundle app source
COPY . /app

COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod 777 /docker-entrypoint.sh
ENTRYPOINT /docker-entrypoint.sh

# Exports
EXPOSE 8001
