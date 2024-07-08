module.exports = {
  apps: [
    {
      name: 'be',
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
