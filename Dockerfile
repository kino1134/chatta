FROM node:8.11.0
MAINTAINER kino1134

# ADD package.json /data/
WORKDIR /opt
COPY . chatta/
RUN cd chatta && yarn install && yarn build
# RUN git clone https://github.com/kino1134/chatta.git \
#   && cd chatta \
#   && yarn install \
#   && yarn build

EXPOSE 3000

WORKDIR /opt/chatta
CMD ["yarn", "start"]
