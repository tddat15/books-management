FROM keymetrics/pm2:14-alpine
WORKDIR /app
ENV NODE_ENV dev
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY tsconfig.json ./
COPY . .
RUN yarn build
COPY pm-config.json .
CMD ["pm2-runtime", "start", "pm-config.json"]
