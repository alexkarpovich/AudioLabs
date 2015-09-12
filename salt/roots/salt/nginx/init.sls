{% set app = pillar['app'] %}
nginx:
    pkg:
        - installed
    service:
        - running
        - reload: True
        - require:
            - pkg: nginx

/etc/nginx/nginx.conf:
    file:
        - managed
        - source: salt://nginx/nginx.conf
        - makedirs: True
        - user: root
        - group: root
        - mode: 644
        - service: nginx

/etc/nginx/sites-available/local.dev.com:
    file:
        - managed
        - source: salt://nginx/nginx.app.conf
        - context:
            bind: {{ app['gunicorn_bind'] }}
            dns_name: {{ app['dns_name'] }}
        - template: jinja
        - makedirs: True
        - user: root
        - group: root
        - mode: 644
        - service: nginx

nginx_run:
  service.running:
    - name: nginx
    - enable: True
    - watch:
      - file: /etc/nginx/sites-available/local.dev.com
    - require:
      - file: /etc/nginx/sites-enabled/local.dev.com
      - pkg: nginx

/etc/nginx/sites-enabled/local.dev.com:
  file.symlink:
    - target: /etc/nginx/sites-available/local.dev.com
    - user: root
    - group: root
    - mode: 644
    - require:
      - file: /etc/nginx/sites-available/local.dev.com

/etc/nginx/sites-enabled/default:
  file.absent:
    - name: /etc/nginx/sites-enabled/default
    - require:
      - pkg: nginx

php5_ppa:
  pkgrepo.managed:
    - ppa: ondrej/php5

php5-fpm:
  pkg.latest:
    - refresh: True
    - require:
      - pkgrepo: php5_ppa
  service.running:
    - enable: True
    - require:
      - pkg: php5-fpm
      - pkg: php5-mcrypt
      - pkg: php5-curl
      - pkg: php5-mysql
      - pkg: php5-cli