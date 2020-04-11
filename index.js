const app = require("express")();
const proxy = require("express-http-proxy");
const { target, apiKey, port, whitelist } = require("./config");

function tryParseJSON (rawJson) {
    try {
        const object = JSON.parse(rawJson);
        if (object && typeof object === "object")
            return object;
    }
    catch (e) {}
    return false;
};

app.use(proxy(target, {

    proxyReqBodyDecorator: (bodyContent) => {
        const body = tryParseJSON(bodyContent);
        if (body && whitelist.includes(body.method)) {
            return {
                ...body,
                key: apiKey,
            };
        }
        return "";
    },

}));

app.listen(port);
