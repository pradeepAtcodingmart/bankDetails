module.exports = {
  apps: [
    {
      name: 'CMS',
      script: 'index.js',

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      args: 'one two',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    production: {
      user: 'pradeep',
      host: '172.20.10.83',
      ref: 'origin/ote',
      repo: 'ssh://git@stash.bms.bz/internationaloutbound/io-cms-fe.git',
      path: '/home/pradeep/io-cms-fe',
      'pre-deploy': 'git reset --hard',
      'post-deploy':
        'npm install && npm run build && sudo rm -rf /usr/share/nginx/html/build; sudo cp -r build /usr/share/nginx/html'
    }
  }
};
