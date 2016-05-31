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

## POST JSON

This example is for MS SQL loopback connector, you can use different loopback connector.

You should use **HTTPS** because datasource contains some sensitive data!

```js
{
    "ds": {
        "server": "ip address or name of your database server",
        "port": 1433,
        "database": "name of database",
        "user": "username of database user",
        "password": "password of database user"
    },
    ,
    "method": {
        "name": "mssql stored procedure name",
        "parameters": [{
            "name": "foo",
            "value": "foo value"
        }, {
            "name": "bar",
            "value": "bar value"
        }]
    }
}
```

## Example call using curl

```js
curl -data "use json above" https://localhost:3100/advanced-search

or

curl -data "use json above" https://localhost:3100/myAdvancedSearchEndpoint
```

## License

ISC © [Nova Vizija d.d.](http://www.nova.vizija.si)
