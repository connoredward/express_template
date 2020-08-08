FROM node:12-alpine

RUN mkdir -p /app

WORKDIR /tmp
COPY package*.json ./
RUN npm ci --no-optional
RUN cp -a /tmp/node_modules /app/
RUN rm -rf /tmp/* && \
  npm install -g nodemon

WORKDIR /app
COPY . .

CMD [ "npm", "run", "dev" ]