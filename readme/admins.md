# Admin Setup
Within the /config/nginx folder, there is a .htpasswd file, this file is where you would add or edit the credentials for admin protected routes. This file stores username:encryptedpassword pairs. Use a website such as [this one](https://www.web2generators.com/apache-tools/htpasswd-generator) to generate new passwords for adding to the file..

When the nginx container is launching, the PALHUB_ADMIN_USER and PALHUB_ADMIN_PASS ENV variables are used to automatically update the .htpasswd file before starting to ensure that the main admin users information is fully up to date..

The default admin credentials are as follows;
- UserName: PalHUB
- PassWord: PassHUB

This should be configured before you allow your server to be publicly accessable!!

