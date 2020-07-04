#!/bin/bash
IP=$(curl http://169.254.169.254/latest/meta-data/public-hostname)
sed -i "s/PUBLIC_DNS_PLACEHOLDER/$IP/g" /home/yard-rent/server/app.js

