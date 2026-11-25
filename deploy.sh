#!/bin/sh

source ~/.nvm/nvm.sh
nvm install
nvm use
node -v

npm run build

#npm login
#npm publish --access public