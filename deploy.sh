#!/bin/bash
npm run build
echo "Build complete! Open https://app.netlify.com/drop and drag the 'dist' folder there for instant deployment."
open https://app.netlify.com/drop
open dist
