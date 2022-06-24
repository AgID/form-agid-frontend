#stage 1
FROM node:14.19.0 as node
WORKDIR /app
COPY . .
RUN rm -f package-lock.json
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist /usr/share/nginx/html
# Expose port http_port
ENV HTTP_PORT 80
EXPOSE ${HTTP_PORT}
