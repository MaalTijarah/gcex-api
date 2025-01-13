FROM node:18-alpine As development

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN npm install -g @nestjs/cli

RUN yarn install

COPY . .

RUN yarn build

FROM node:18-alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
RUN apk add --no-cache openssl
COPY package.json yarn.lock ./

RUN yarn install --production

COPY --from=development /app/dist ./dist

CMD ["node", "dist/main"]