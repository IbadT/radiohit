FROM node:20-alpine

RUN apk add --no-cache ffmpeg

WORKDIR /opt/app
# ADD package.json package.json
COPY package.json package.json
RUN npm install --force
# ADD . .
COPY ./ /opt/app
CMD ["npm", "start"]
EXPOSE 55392