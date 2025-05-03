# *** DEV ***

FROM redis:7.2.8-alpine3.21

ARG REDIS_PASS

COPY redis.conf /usr/local/etc/redis/redis.conf
RUN echo "requirepass ${REDIS_PASS}" >>/usr/local/etc/redis/redis.conf

CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]
