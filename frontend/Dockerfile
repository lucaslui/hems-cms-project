FROM node:14

COPY ./ /home/app/frontend

WORKDIR /home/app/frontend

ARG API_URL

RUN echo API_URL: $API_URL && \
    echo $API_URL

RUN npm install
RUN npm run build
RUN npm prune --production
RUN rm -rf ./src ./tsconfig.json ./webpack.common.js ./webpack.prod.js

CMD ["npm", "start"]