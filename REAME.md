Welcome::

For production change nginx to 

    location /api {
        proxy_pass http://backend-service:3000;
    }

        proxy_pass http://backend:3000; = dev environment

Thanks