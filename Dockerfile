FROM richarvey/nginx-php-fpm:3.1.6

# Install bash, curl, gnupg, nodejs and npm
RUN apk add --no-cache bash curl gnupg nodejs npm

COPY . .

# Image config
ENV SKIP_COMPOSER 1
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

# Laravel config
ENV APP_ENV production
ENV APP_DEBUG false
ENV LOG_CHANNEL stderr

# Allow composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER 1

EXPOSE 80

CMD ["/start.sh"]
