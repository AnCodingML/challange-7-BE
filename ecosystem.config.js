module.exports = {
  apps: [
    {
      name: 'fe-challange-8',
      script: 'bin/www.ts',
      interpreter: 'ts-node',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
