FROM node

WORKDIR /usr/src/app
ADD . /usr/src/app

RUN npm install

EXPOSE 4040

CMD ["npm", "run", "start"]
