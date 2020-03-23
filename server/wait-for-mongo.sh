#!/bin/sh

: ${MONGO_HOST:=mongo}
: ${MONGO_PORT:=27017}
FILE=.env
if test -f "$FILE"
then
    export $(cat $FILE)
else
    echo "File .env not found. Using default configuration."
fi

until nc -z $MONGO_HOST $MONGO_PORT
do
    echo "Waiting for Mongo ($MONGO_HOST:$MONGO_PORT) to start..."
    sleep 0.5

done

if [ -z "$MODE" ]
then
    : ${MODE:=development}
fi

if [ $MODE = "development" ]
then
    echo "Running in development mode"
    npm install
    npm run dev
else
    echo "Running in production mode"
    npm install --only=prod
    npm run start
fi

eval $*