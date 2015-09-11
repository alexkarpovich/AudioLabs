nodejs:
    pkg:
        - installed

nodejs-legacy:
    pkg:
        - installed
        - require:
            - pkg: nodejs
npm:
    pkg:
        - installed
        - require:
            - pkg: nodejs

bower:
    npm:
        - installed
        - require:
            - pkg: npm

less:
    npm:
        - installed
        - require:
            - pkg: npm

yuglify:
    npm:
        - installed
        - require:
            - pkg: npm

