dockerize -wait tcp://db:3306 -timeout 20s
mkdir /app/storage
chmod 606 /app/storage

npm start
