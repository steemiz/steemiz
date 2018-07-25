# build environment
FROM node:9.6.1 as builder

RUN mkdir /var/www
RUN mkdir /var/www/steemiz
WORKDIR /var/www/steemiz

RUN npm install -g yarn
ENV PATH /var/www/steemiz/node_modules/.bin:$PATH
COPY package.json /var/www/steemiz/package.json
COPY yarn.lock /var/www/steemiz/yarn.lock
COPY .env /var/www/steemiz/.env
COPY public /var/www/steemiz/public/
COPY src /var/www/steemiz/src/
RUN yarn install
RUN yarn build

# production environment
FROM nginx:1.13.9-alpine
COPY --from=builder /var/www/steemiz/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
