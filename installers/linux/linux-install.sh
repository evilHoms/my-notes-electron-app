#!/bin/sh
#Script to install my-notes app
npm install
touch linux-start.sh
echo "#!/bin/sh" > linux-start.sh
echo "#Script to install my-notes app" >> linux-start.sh
echo "cd $(pwd)/../.." >> linux-start.sh
echo "npm run start" >> linux-start.sh
chmod +755 ./linux-start.sh
touch MyNotes.desktop
echo "[Desktop Entry]" > MyNotes.desktop
echo "Type=Application" >> MyNotes.desktop
echo "Name=MyNotes" >> MyNotes.desktop
echo "Terminal=false" >> MyNotes.desktop
echo "Exec=$(pwd)/linux-start.sh" >> MyNotes.desktop
echo "Icon=$(pwd)/../../accets/images/note.png" >> MyNotes.desktop
echo "Name[ru]=MyNotes" >> MyNotes.desktop

