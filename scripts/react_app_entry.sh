#!/bin/sh

sleep 2

echo ""
echo ""

echo " ###############################################"
echo ""
echo "    *****   Entering react_app_entry     ***** "

echo "    ***** Starting the React application *****"
npm run build -b 0.0.0.0:3000
echo ""
echo " ###############################################"
echo ""
echo ""

echo "    *****         Exiting app           ***** "
echo " ###############################################"
echo ""