FROM node:18.16.0

WORKDIR /app

RUN npm install -g npm@9.6.5

COPY package.json .

RUN npm install

ARG RUNTIME=dev

ARG SCRTEMP=start:pm2

ENV NODE_ENV $RUNTIME

EXPOSE 8090

RUN if [ "$RUNTIME" != "local" ] ; then \
        npm install pm2 -g \
    ; fi

ENV SCRIPT $SCRTEMP

COPY . .

CMD npm run ${SCRIPT}