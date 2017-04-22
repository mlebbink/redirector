# redirector
Redirect http-requests based on TXT records

This project delivers three functions for redirecting.

1. Redirect \<naked-domain> to www.\<nakeddomain>
2. Show domainpark/default page for domains.
3. Redirect to another location, based on TXT record in dns.

For redirecting to another location create a TXT record in dns in the following format:

```
<domain-name> IN TXT "redirect=http://www.anotherdomain.com/landingpage"
```

Redirecting based on the TXT record is depended on the domainname, so you can redirect www.somedomain.tld to another location than second.somedomain.tld. 
Simply by making seperate TXT records for the two domainnames like.

```
www.somedomain.tld in TXT "redirect=http://www.anotherdomain.tld/www"
second.somedomain.tld in TXT "redirect=http://www.anotherdomain.tld/second"
```

To run this application, you can use docker or run it directly under node.js.

```
docker build -t redirector .
docker run -p 49160:8080 
