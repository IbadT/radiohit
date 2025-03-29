FROM node:20-alpine

WORKDIR /opt/app

#Copy json and lock files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

#Install packages
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

#Copy all
# ADD . .
COPY ./ /opt/app

#Build
RUN corepack enable pnpm && pnpm run build

#Start on port 3000
CMD ["pnpm", "start"]
# CMD ["npm", "start"]
EXPOSE 7246