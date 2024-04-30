module.exports = (config, webpack) => {
    config.plugins.push(
        new webpack.EnvironmentPlugin(["NODE_ENV", "SERVER_URL", "SUBMIT_FORM_TOKEN", "METRIC_SERVER_URL", "METRIC_SERVER_API_TOKEN"])
    );
    return config;
};