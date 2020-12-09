const Package = require('./package.json')

module.exports = {
  apps: [{
    name: Package.name,
    max_memory_restart: '200M'
  }],

  deploy: {
    production: {
      ssh_options: ['ForwardAgent=yes'],
      user: 'root',
      host: '176.126.164.131',
      ref: 'origin/master',
      repo: `git@github.com:baitkul/legal-help-front.git`,
      path: '/var/www/front',
      'post-deploy': 'npm ci && npm run build'
    }
  }
}
