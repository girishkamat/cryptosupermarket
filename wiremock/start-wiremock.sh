#!/bin/bash
red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`

# echo -e "Downloading wiremock standalone jar"
# wget -N http://repo1.maven.org/maven2/com/github/tomakehurst/wiremock-standalone/2.17.0/wiremock-standalone-2.17.0.jar

echo "Starting wiremock server"
java -jar wiremock-standalone-2.17.0.jar --port 9000 --verbose --local-response-templating --root-dir . &
echo "Waiting for wiremock server to start"
while ! nc -z 127.0.0.1 9000; do sleep 1; done;
echo "Started wiremock server"