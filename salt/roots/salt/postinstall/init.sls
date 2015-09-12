postinstall.sh:
    cmd.script:
        - source: salt://postinstall/postinstall.sh
        - user: root
        - group: root
        - shell: /bin/bash