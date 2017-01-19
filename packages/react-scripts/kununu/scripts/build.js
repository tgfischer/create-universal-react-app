const spawn = require('cross-spawn');

// Default to development if no ENV is set
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const result = spawn.sync(
    'node',
    [require.resolve('react-server-cli/target/cli'), 'compile'],
    {stdio: 'inherit'}
);
process.exit(result.status);
