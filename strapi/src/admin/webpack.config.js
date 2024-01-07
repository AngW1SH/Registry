module.exports = (config, webpack) => {
    config.plugins.push(
        new webpack.EnvironmentPlugin(["NODE_ENV", "SERVER_URL"])
    );
    return config;
};