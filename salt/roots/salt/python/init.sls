build-essential:
    pkg:
        - installed

python-dev:
    pkg:
        - installed

python-pip:
    pkg:
        - installed
        - require:
            - pkg: build-essential
            - pkg: python-dev
python:
    pkg:
        - installed
        - names:
            - python
            - python-virtualenv
libpq-dev:
    pkg:
        - installed

libjpeg8:
    pkg:
        - installed

libjpeg8-dev:
    pkg:
        - installed

libfreetype6:
    pkg:
        - installed

libfreetype6-dev:
    pkg:
        - installed

zlib1g-dev:
    pkg:
        - installed
