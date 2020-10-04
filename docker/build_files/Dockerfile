FROM node:8-alpine

RUN apk update && \
    apk add nano

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install
COPY . ./
RUN npm run build

EXPOSE 3000

CMD ["./scripts/react_app_entry.sh"]
