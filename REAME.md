Welcome::

For production change nginx to 

    location /api {
        proxy_pass http://backend-service:3000; #= production environment
    }

        proxy_pass http://backend:3000; #= dev environment

And in .env 
    [SSL=TRUE] #= production environment
    [SSL=Flase] #= dev environment


Thanks..