#!/bin/bash
# Deploy script for Bezalel EP

# Update package.json name
sed -i 's/"name": "kauan-rewards"/"name": "bezalel-ep"/' package.json

# Build the project
echo "Building project..."
npm run build

echo "Build complete. Ready for deploy."
