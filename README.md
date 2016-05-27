# nv-advanced-search
Advanced database search using Strongloop

## Install

```
npm install nv-advanced-search --save
```

## Usage

server.js
```js
require('nv-advanced-search')(app);

// or

require('nv-advanced-search')(app, '/myAdvancedSearchEndpoint');
```

POST body

This example is for MS SQL loopback connector, you can use different loopback connector.

```js
{
    "ds": {
        "type": "mssql",
        "host": "ip address or name of your database server",
        "port": 1433,
        "database": "name of database",
        "username": "username of database user",
        "password": "password of database user",
        "schema": "schema if different than dbo"
    },
    "models": [{
        "name": "Nameofyourmodel",
        "properties": {
            "foo": "string",
            "bar": "string"
        }
    }],
    "options": {
    },
    "query": {
        "where": {
            "foo": {
                "like": "%bar%"
            }
        },
        "fields": {
            "id": false
        },
        "order": ["foo"]
    }
}
```

```js
curl -data "use json above" https://localhost:3100/advanced-search

or

curl -data "use json above" https://localhost:3100/myAdvancedSearchEndpoint
```

## License

ISC © [Nova Vizija d.d.](http://www.nova.vizija.si)
