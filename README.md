# swkj
Full stack web application -- presented by Scott Williams and Kevin Jedreski

### To run the server and have it restart whenever a file changes: ###
  npm run server
### To run mongo db and have it set up to work with the examples: ###
  mkdir data
  mongod --dbpath=./data --port 27017
### To beautify client side javascript: ###
  npm run beautify:client
### To beautify server side javascript: ###
  npm run beautify:server
#### When committing a file, the beautifier runs on the files. NOTE: if it modifies a file, you will need to do a ‘git add .’ and do another commit so that it is beautified before you push. ####
