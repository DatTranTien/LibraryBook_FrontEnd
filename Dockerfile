FROM node:18
WORKDIR /usr/src/app
COPY package.json ./
RUN npm i
COPY . .
EXPOSE 3106
ENV port=3106
CMD ["node","server"]