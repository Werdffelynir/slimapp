###################################################
# docker build -t php7apache .
# docker run -it -p 8080:80 -v /var/www/slimapp:/var/www/html php7apache
###################################################
FROM nimmis/apache-php7

COPY 000-default.conf /etc/apache2/sites-available/000-default.conf

ENV MYSQL_ROOT_USER=root
ENV MYSQL_ROOT_PASSWORD=root

EXPOSE 80 443

RUN a2enmod rewrite
CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
