Destiny oAuth

### FOR LOCAL SSL ONLY
```javascript
var fs = require('fs');
var https = require('https'); // FOR LOCAL SSL ONLY

https.createServer({
  key: fs.readFileSync('ssl/key.pem'),
  cert: fs.readFileSync('ssl/cert.pem')
}, app).listen(port, function() {
  //db.serialize(function() {
    //db.run("CREATE TABLE token (username TEXT, token TEXT, refreshToken TEXT)");
  //});
	console.log('App server is running on https://localhost:' + port);
});
```

#### Reference
- https://www.bungie.net/Mobi/en/About/Article?id=45481
- http://blog.mgechev.com/2014/02/19/create-https-tls-ssl-application-with-express-nodejs/
- https://github.com/request/request/wiki/Using-request-with-https
- https://github.com/request/request#tlsssl-protocol
