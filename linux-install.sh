#!/bin/sh
#Script to install my-notes app
yarn install
touch linux-start.sh
echo "#!/bin/sh" > linux-start.sh
echo "#Script to install my-notes app" >> linux-start.sh
echo "cd $(pwd)" >> linux-start.sh
echo "yarn start" >> linux-start.sh
chmod +755 ./linux-start.sh


