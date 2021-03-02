const Package = require('./package.json')

module.exports = {
  apps: [{
    name: Package.name,
    max_memory_restart: '200M'
  }],

  deploy: {
    production: {
      ssh_options: ['ForwardAgent=yes'],
      user: process.env.PM2_USER,
      host: process.env.PM2_HOST,
      ref: 'origin/master',
      repo: `git@github.com:baitkul/legal-help-front.git`,
      path: '/var/www/front',
      'post-deploy': 'npm ci && npm run build'
    }
  }
}
