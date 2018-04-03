FROM node:8.11.0
MAINTAINER kino1134

# WORKDIR /opt
# ローカルから最新ソースを取る場合
# COPY . chatta/
# RUN cd chatta && yarn install && yarn build
# Gitから最新ソースを取る場合
# ADD package.json /data/
# RUN git clone https://github.com/kino1134/chatta.git \
#   && cd chatta \
#   && yarn install \
#   && yarn build

# ローカルソースをマウントする
RUN mkdir /opt/chatta
ADD package.json /opt/chatta/package.json
WORKDIR /opt/chatta
RUN yarn install

VOLUME /opt/chatta

EXPOSE 3000

# WORKDIR /opt/chatta
CMD ["yarn", "dev"]
