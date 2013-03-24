# Node.js iconic font generator

## Install

Install *git*, *nodejs*, *npm* using your package manager

Clone files to your server using 

    git clone git@bitbucket.org:antaranian/eik-n.git YOURDIRECTORY

Go to ***server/*** directory and install dependencies using 

    cd YOURDIRECTORY/server/ && npm install

In ***YOURDIRECTORY/server/config/config.js*** change `baseHost` to *YOURHOST*

Install FontForge ([http://fontforge.org/nix-install.html][1])

Create a virtual server with nick of YOURHOST and directory root of **YOURDIRECTORY**

Add behaviour rule to vserver to internally redirect all requests matching regular expression `/api/(.*)` to local interpreter at [127.0.0.1:8080][2] (it’s our server)

Create a virtual server for static file handling with nick of *static.YOURHOST* and directory root of ***YOURDIRECTORY/static***

Add read/write permissions to ***YOURDIRECTORY/static***

Run app.js under ***YOURDIRECTORY/server*** with 

    node app.js

 or if you have *forever* package installed, run with

    forever app.js

Open *YOURHOST* with your browser.


  [1]: http://fontforge.org/nix-install.html
  [2]: http://127.0.0.1:8080