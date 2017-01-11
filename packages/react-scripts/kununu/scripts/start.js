const spawn = require("cross-spawn");

// Default to development if no ENV is set
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const result = spawn.sync(
    "node",
    [require.resolve("react-server-cli/target/cli"), "start"],
    { stdio: "inherit" }
);
process.exit(result.status);
