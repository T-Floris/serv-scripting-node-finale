const helpers = require("./helpers")
const logger = require("./logger");
const api = {};


api["/api/person"] = require("./api/person");

module.exports = function(req, res){
    logger(req, res);
    const endpoint = new URL(req.url, "http://localhost:3003").pathname;
 
    const regEx = /^\/((css|img|js)\/)?[\w-]+\.(html|css|png|jpe?g|js|gif|tiff|svg|bmp)$/i;
    let result = endpoint.match(regEx);

    if(result) {
        // helpers.sendFile(req, res, "./static/" + result[0]);
        helpers.streamFile(req, res, "./static/" + result[0]);
        return;
    }

    // Hvis jeg er her er der ikke fundet et match
    const apiRX = /^(?<route>\/api\/\w+)(?<params>(\/\w+)*)$/
    result = endpoint.match(apiRX);
    // console.log(result);
    if(result){
        // Hvis jeg er her er der fundet et match
        if(api[result.groups.route]) {
            if(api[result.groups.route][req.method]){
                // Hvis jeg er her er der fundet en metode der matcher req.method
                api[result.groups.route][req.method].handler(req, res, result.groups.params);
                return;
            }
            helpers.send(req, res, {msg: "Metode ikke tilladt her"}, 405);
            return;
        }
    }

    // console.log(endpoint);
    helpers.send(req, res, {message: `Ressource '${endpoint}' not awailable`}, 404);
}

