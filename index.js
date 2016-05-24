var loopback = require('loopback');

/*

Example seach:

{
    "ds": {
        "type": "mssql",
        "host": "razvoj08",
        "port": 1433,
        "database": "RZ_ZTM",
        "username": "eArhiv",
        "password": "eArhiv_ws",
        "schema": "eNarocanje"
    },
    "models": [{
        "name": "Zahtevekglava",
        "properties": {
            "vrsta": "string",
            "vrstaopis": "string",
            "stevilka": "string",
            "status": "string",
            "strmestonaziv": "string"
        }
    }, {
            "name": "Zahtevekpozicija",
            "properties": {
                "vrsta": "string",
                "stevilka": "string",
                "pozicija": "string",
                "matsredstvo": "string"
            }
        }
    ],
    "options": {
        "visited": {},
        "associations": false,
        "views": true,
        "schema": "eNarocanje"
    },
    "query": {
        "where": {
            "strmestonaziv": {
                "like": "%odsek%"
            }
        },
        "fields": {
            "id": false
        },
        "order": ["vrsta"]
    }
}

*/

module.exports = function (app) {

    app.post("/advanced-search", function (req, res, next) {

        if (!(req.body && req.body.ds && req.body.models && req.body.query)) {
            res.sendStatus(400);
        }

        var dataSource = req.body.ds,
            models = req.body.models,
            query = req.body.query,
            options = req.body.options;                
        
        try {
            var ds = loopback.createDataSource(dataSource.type, dataSource);
            
            //buildFromDb(ds, models, options, (count) => {
            buildFromModel(ds, models, (count) => {
                doSearch(query, ds.models[models[0].name], (err, result) => {
                    ds.disconnect();
                    
                    if (err) {
                        res.status(400).json(err);                    
                    } else {
                        res.status(200).json(result);
                    }                    
                });
            });

        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        };

    });
}

function buildFromModel(ds, models, done) {
    var count = 0;
    models.forEach(model => {
        count++;

        var m = loopback.createModel(model);
        loopback.configureModel(m, { dataSource: ds });
        console.log("Model:", ds.models[model.name].modelName);

        if (count === models.length) {
            done(count);
        }

    }, this);
}

function buildFromDb(ds, models, options, done) {
    var count = 0;
    models.forEach(model => {

        ds.discoverAndBuildModels(model.name, options,
            function (err, _models) {
                count++;
                console.log("Model:", ds.models[model.name].modelName);

                if (count === models.length) {
                    done(count);
                }
            });

    }, this);
}

function doSearch(query, model, done) {
    try {
        console.time("dbquery");

        model.find(query, function (err, inv) {
            console.timeEnd("dbquery");

            if (err) {
                done(err);
                return;
            }

            done(null, inv);
        });
    } catch (err) {
        done(err);
    };
}