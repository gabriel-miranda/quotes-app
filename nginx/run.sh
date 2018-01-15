#!/bin/sh

cat >/etc/nginx/nginx.conf <<EOF
daemon off;
worker_processes ${WORKER_PROCESSES:-1};
error_log stderr;

events {
  worker_connections ${WORKER_CONNECTIONS:-128};
}

http {
  include mime.types;
  default_type application/octet-stream;
  server_tokens off;

  gzip on;
  gzip_proxied any;
  gzip_types text/plain application/json;

  map \$http_upgrade \$connection_upgrade {
    default upgrade;
    ''      close;
  }

  proxy_http_version 1.1;
  proxy_set_header Upgrade \$http_upgrade;
  proxy_set_header Connection \$connection_upgrade;
  proxy_set_header Host \$host;

  upstream www {
    server ${QUOTES_WWW_INTERNAL_HOST:-www}:${QUOTES_WWW_INTERNAL_PORT:-3001} max_fails=3 fail_timeout=5;
  }

  upstream api {
    server ${QUOTES_API_INTERNAL_HOST:-api}:${QUOTES_API_INTERNAL_PORT:-4001} max_fails=3 fail_timeout=5;
  }

  server {
    listen 80;
    server_name _;
  }

  server {
    listen ${QUOTES_WWW_PUBLIC_PORT:-3000};
    server_name ${QUOTES_WWW_PUBLIC_HOST:-localhost};
    client_max_body_size 14M;
    proxy_read_timeout 150s;

    location / {
      proxy_pass http://www;
    }

    location /api/ {
      rewrite /api(.*) \$1 break;
      proxy_pass http://api;
    }
  }

  server {
    listen ${QUOTES_API_PUBLIC_PORT:-4000};
    server_name ${QUOTES_API_PUBLIC_HOST:-api.*};

    location / {
      proxy_pass http://api;
    }
  }
}
EOF

exec nginx "$@"