#!/bin/bash

docker build -t php7apache .
docker run -it -v $(echo `pwd`/../):/var/www/html php7apache composer install