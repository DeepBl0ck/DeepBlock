dockerize -wait tcp://db:3306 -timeout 20s
mv /app/.env-sample /app/.env
npm start