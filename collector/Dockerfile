FROM node:14

COPY ./ /home/app/collector

WORKDIR /home/app/collector

RUN npm install
RUN npm run build
RUN npm prune --production
RUN rm -rf ./src ./tsconfig.json

CMD ["npm", "start"]