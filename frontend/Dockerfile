FROM node:14

COPY ./ /home/software-nuvem/frontend

WORKDIR /home/software-nuvem/frontend

ENV API_URL http://ec2-18-230-78-12.sa-east-1.compute.amazonaws.com:5050/api/ 

RUN echo API_URL: $API_URL && \
    echo $API_URL

RUN npm install
RUN npm run build
RUN npm prune --production
RUN rm -rf ./src ./tsconfig.json ./webpack.common.js ./webpack.prod.js

CMD ["npm", "start"]