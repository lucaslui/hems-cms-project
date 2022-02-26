FROM node:14

COPY ./ /home/software-nuvem/backend

WORKDIR /home/software-nuvem/backend

RUN npm install
RUN npm run build
RUN npm prune --production
RUN rm -rf ./src ./tsconfig.json ./tsconfig-build.json

CMD ["npm", "start"]