const spawn = require("cross-spawn");

const result = spawn.sync(
    "node",
    [require.resolve("react-server-cli/target/cli"), "start"],
    { stdio: "inherit" }
);
process.exit(result.status);
