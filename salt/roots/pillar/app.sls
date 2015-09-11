app:
  gunicorn_bind: 127.0.0.1:8000
  dns_name: local.dev.com
  work_dir: /vagrant