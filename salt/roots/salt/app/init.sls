git-core:
    pkg:
        - installed

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

npm-packages:
    npm.installed:
        - names:
            - bower
            - gulp
            - grunt-cli
            - forever
            - express-generator
        - require:
            - pkg: npm