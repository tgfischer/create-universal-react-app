const spawn = require('cross-spawn');

const argv = process.argv.slice(2);

// Default to development if no ENV is set
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const result = spawn.sync(
    'node',
    [require.resolve('react-server-cli/target/cli'), ...argv],
    {stdio: 'inherit'}
);
process.exit(result.status);
