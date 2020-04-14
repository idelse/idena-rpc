module.exports = {
  apps : [
      {
        name: "idena-rpc",
        script: "./index.js",
        instances: "max",
        exec_mode: "cluster",
        env: {
            "NODE_ENV": "production"
        }
      }
  ]
}