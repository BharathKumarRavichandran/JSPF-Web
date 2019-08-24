FROM node:8-alpine

RUN apk update && \
    apk add nano

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install --only=production
COPY . ./

EXPOSE 3000

CMD ["./scripts/react_app_entry.sh"]