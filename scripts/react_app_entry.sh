#!/bin/sh

sleep 20

echo ""
echo ""

echo " ###############################################"
echo ""
echo "    *****   Entering react_app_entry     ***** "

echo "    ***** Starting the React application *****"
node prodServer.js -b 0.0.0.0:3000
echo ""
echo " ###############################################"
echo ""
echo ""

echo "    *****         Exiting app           ***** "
echo " ###############################################"
echo ""