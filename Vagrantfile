$script = <<SCRIPT
  echo 'Forever start node server'
  cd /var/www/app
  forever stopall
  NODE_ENV=development forever start --append --uid "audiolabs" ./bin/www
  echo 'Done forever start server'
SCRIPT

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"

  config.vm.hostname = "local.dev.com"
  config.vm.network :private_network, ip: '3.3.3.3'

  config.vm.synced_folder "salt/roots/salt", "/srv/salt/"
  config.vm.synced_folder "salt/roots/pillar", "/srv/pillar/"
  config.vm.synced_folder "app", "/var/www/app"

  config.vm.provision :salt do |salt|
  	salt.bootstrap_options = "-P"
    salt.minion_config = "salt/minion"
    salt.run_highstate = true
  end

  config.vm.provision "shell", inline: $script
end
