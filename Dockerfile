#stage 1
FROM node:14.19.0-alpine as builder
WORKDIR /app
COPY . /app
RUN npm ci 
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
# Expose port http_port
ENV HTTP_PORT 80
EXPOSE ${HTTP_PORT}
