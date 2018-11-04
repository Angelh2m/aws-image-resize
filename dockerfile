FROM lambci/lambda:build-nodejs8.10

ENV AWS_DEFAULT_REGION us-east-1

COPY . .

RUN npm install

CMD cat .lambdaignore | xargs zip -9qyr lambda.zip . -x && \
    aws lambda update-function-code --function-name mylambda --zip-file fileb://lambda.zip
