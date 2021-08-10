#!/usr/bin/env node

const crypto = require("crypto");

let config = {
    varName: "nonce",
    size: 16
};

function router(req, res, next) {
    res.locals[config.varName] = genNonce();
    next();
}

function genNonce(size) {
    return crypto.randomBytes(size || config.size).toString("base64");
}

function changeConfig(newConfig) {
    if (newConfig.size < 16) console.warn(`Nonce size _SHOULD_ be larger than 16 bytes. I hope you know what you're doing using ${config.size} bytes instead!`);
    config = Object.assign(config, newConfig);
}

module.exports = function (opts) {
    changeConfig(opts);
    router.genNonce = genNonce;
    router.changeConfig = changeConfig;
    return router;
};

if (require.main === module) {
    console.log(genNonce(parseInt(process.argv[2])));
}