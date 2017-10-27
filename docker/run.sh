#!/bin/bash

docker run -it -p 8080:80 -v $(echo `pwd`/../):/var/www/html php7apache

