#container the node website
FROM node:12
WORKDIR /usr/src/app/website
COPY website ./website

#install md-to-pdf@4.0.1 and express
RUN npm install -g md-to-pdf@4.0.1
RUN npm install express

#expose the port
EXPOSE 3000
CMD ["node", "website/index.js"]

