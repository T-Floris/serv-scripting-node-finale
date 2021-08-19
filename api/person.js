const { send, getRequestData, getJSONData } = require("../helpers");
const data = require("../data/database");

module.exports = {
    GET: {
        handler: async function (req, res, p) {
            let parms = p !== "" ? p.replace("/", "").split("/") : null;
            const dbData = await data.getData(parms);
            send(req, res, { says: "Person", method: req.method, dbData });
        }
    },
    POST: {
        handler: function (req, res) {
            getRequestData(req)
                .then(function (incoming) {
                    data.createRecord(incoming)
                        .then(function (result) {
                            send(req, res, result);

                        })
                        .catch(function (result) {
                            send(req, res, result);

                        })
                })
                .catch(function (err) {
                    send(req, res, err, 500)
                });
        }
    },
    PUT: {
        handler: async function (req, res, p) {
            try {
                let parms = p !== "" ? p.replace("/", "").split("/") : null;
                getRequestData(req)
                    .then(function (incoming) {
                        data.putData(incoming, parms)
                            .then(function (result) {
                                send(req, res, result);
                            })
                            .catch(function (result) {
                                send(req, res, result);
    
                            })
                    });
            }
            catch(err){
                send(req, res, err, 500);
            }
        }
    },
    DELETE: {
        handler: async function (req, res, p) {
            let parms = p !== "" ? p.replace("/", "").split("/") : null;
            const dbData = await data.deleteData(parms);
            send(req, res, { says: "Person", method: req.method, dbData });
        }
        
    }        
    
}