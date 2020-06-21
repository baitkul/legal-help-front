require('dotenv').config()
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
      host: [process.env.PM2_HOST],
      ref: 'origin/master',
      repo: `git@github.com:${process.env.PM2_USERNAME}/${Package.name}.git`,
      path: '/var/www/front',
      'post-deploy': 'npm ci && npm run build'
    }
  }
}
