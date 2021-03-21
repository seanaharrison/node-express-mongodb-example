#!/bin/sh
set -e
deployment_volume=/usr/app/web/views

original_volume=/usr/app/web/tmp/views
if test -d ${original_volume}; then
echo "Existe carpeta $original_volume"
 if [ -z "$(ls -A ${deployment_volume}/)" ]; then
    echo "Copiando ficheros originales"
    cp -R ${original_volume}/* $deployment_volume}/
 fi
fi    

npm $1