
## Install Linux Dependencies
``` rm -rf node_modules/sharp ```
``` 
docker run -v "$PWD":/var/task lambci/lambda:build-nodejs8.10 npm install
```

## Run lambda enviroment locally

docker run --rm -v "$PWD":/var/task lambci/lambda:nodejs8.10