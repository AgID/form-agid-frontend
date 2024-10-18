#stage 1
FROM node:14 as builder
WORKDIR /app
COPY . /app

# Make ssh dir
RUN mkdir /root/.ssh/
 
# Create id_rsa from string arg, and set permissions

RUN echo cat ~/file/outside/build/context/id_rsa . > /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa
 
# Create known_hosts
RUN touch /root/.ssh/known_hosts

# Add git providers to known_hosts
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts

RUN npm config set unsafe-perm true && \
npm install -g @angular/cli npm-snapshot && \
npm cache clean --force

RUN npm i
ARG BUILD_MODE
RUN npm run ${BUILD_MODE} --stats-json --source-map=false
#stage 2
FROM nginxinc/nginx-unprivileged
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
# Expose port http_port
ENV HTTP_PORT 80
EXPOSE ${HTTP_PORT}
