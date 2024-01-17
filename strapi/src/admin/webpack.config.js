module.exports = (config, webpack) => {
    config.plugins.push(
        new webpack.EnvironmentPlugin(["NODE_ENV", "SERVER_URL", "SUBMIT_FORM_TOKEN"])
    );
    return config;
};