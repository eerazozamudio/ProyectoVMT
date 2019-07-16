#!/bin/bash
sencha app build
cd build/production/
zip -r ExtMVC.zip ExtMVC
scp -p ExtMVC.zip root@198.211.99.171:/var/www/html/vmt
ssh root@198.211.99.171
