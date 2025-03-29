FROM node:20-alpine


# Currently Disabled

#
# START PUPPETEER PDF CONFIG
#

# Installs latest Chromium (100) package.
#RUN apk add --no-cache \
#      chromium \
#      nss \
#      freetype \
#      harfbuzz \
#      ca-certificates \
#      ttf-freefont \
#      nodejs \
#      yarn
#ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
#RUN yarn add puppeteer@13.5.0
#
## Add user so we don't need --no-sandbox.
#RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
#    && mkdir -p /home/pptruser/Downloads /app \
#    && chown -R pptruser:pptruser /home/pptruser \
#    && chown -R pptruser:pptruser /app
#
## Run everything after as non-privileged user.
#USER pptruser

#
# END PUPPETEER PDF CONFIG
#

#
# START MAIN CONFIG
#

WORKDIR /opt/app

# Install corepack and pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy json and lock files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --force


#Copy all
# ADD . .
COPY ./ /opt/app

#Build
RUN pnpm run build

#Start on port 3000
CMD ["pnpm", "start"]
# CMD ["npm", "start"]
EXPOSE 3000