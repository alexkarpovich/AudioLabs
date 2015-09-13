#!/bin/bash

# Restarting nginx service
sudo service nginx restart

echo 'Npm installing required packages'
cd /var/www/app && sudo npm install --no-bin-links
echo 'Done installing npm required packages'

echo 'Forever start node server'
cd /var/www/app
forever stopall
NODE_ENV=development forever start --append --uid "audiolabs" app.js
echo 'Done forever start server'
