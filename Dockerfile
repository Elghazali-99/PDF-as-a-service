#container the node website
FROM node:12
WORKDIR /usr/src/app/website
COPY website ./website

#install md-to-pdf and express
RUN npm install -g md-to-pdf
RUN npm install express

#expose the port
EXPOSE 3000
CMD ["node", "website/index.js"]

