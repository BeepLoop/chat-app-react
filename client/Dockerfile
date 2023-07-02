FROM node:17-alpine
RUN mkdir /app
WORKDIR /app
COPY ./package.json ./
RUN npm install --silent
COPY . /app
EXPOSE 4000
CMD ["npm","run", "dev"]
