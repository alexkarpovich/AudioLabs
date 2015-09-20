#!/bin/bash

# Restarting nginx service
sudo service nginx restart

echo 'Npm installing required packages'
cd /var/www/app && sudo npm install --no-bin-links
echo 'Done installing npm required packages'

echo 'Vextab building'
cd /var/www/app/node_modules/vextab && sudo npm install --no-bin-links
grunt
echo 'Vextab building done'

echo 'MIDI.js building'
cd /var/www/app && sudo npm install mudcube/MIDI.js --no-bin-links
cd /var/www/app/node_modules/midi && sudo npm install --no-bin-links
sudo npm install xmlhttprequest --no-bin-links
grunt
echo 'MIDI.js building done'

echo 'Forever start node server'
cd /var/www/app
forever stopall
NODE_ENV=development forever start --append --uid "audiolabs" ./bin/www
echo 'Done forever start server'
