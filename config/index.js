const config = {
    common: require("./common"),
    development: require("./development"),
    production: require("./production"),
};

const exportedConfig = {
    ...config.common,
    ...(config[process.env.NODE_ENV || "development"]),
};

console.log(exportedConfig);

module.exports = exportedConfig;

