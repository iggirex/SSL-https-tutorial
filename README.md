creating SSL certs and HTTPS


1) make a server with 'fs' included

var express = require('express');
var app = express();
var fs = require('fs');

2) (in server) Ask for certificate files needed to create ssl connection, these are a) private key b) primary certificate c) intermediate certificate

var key = fs.readFileSync('encryption/private.key');
var cert = fs.readFileSync( 'encryption/primary.crt' );
var ca = fs.readFileSync( 'encryption/intermediate.crt' );

3) create these files mentioned above with this terminal command:

openssl req -new -newkey rsa:2048 -nodes -out mydomain.csr -keyout private.key

3.TRICKY) This above command will only create private.key and .mydomain.csr. We still need primary.crt, and this must come from a CA (certificate authority) so $$$ needs to be paid. Here is a way to create your own primary.crt, which is called "self-signed" though it can display an error in the browser saying certificate authority is unknown and untrusted. (Respect my authoroty)

openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

NOTE -- for the files in this example command should be: openssl x509 -req -days 365 -in mydomain.csr -signkey primary.key -out .mydomain.crt

4) create options obj that includes these files

var options = {
  key: key,
  cert: cert,
  ca: ca
};

5) (in server) Listen on correct port for https

var https = require('https');
https.createServer(options, app).listen(443);

6)


-----------------------------------

The openssl toolkit is used to generate an RSA Private Key and CSR (Certificate Signing Request). It can also be used to generate self-signed certificates which can be used for testing purposes or internal usage.

1) The first step is to create your RSA Private Key. This key is a 1024 bit RSA key which is encrypted using Triple-DES and stored in a PEM format so that it is readable as ASCII text.

openssl genrsa -des3 -out server.key 1024

2) 
