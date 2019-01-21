::Script to install my-notes app

echo ::Script to start my-notes app > windows-start.bat
echo npm run start --prefix %~dp0..\.. >> windows-start.bat

echo wscript.exe %~dp0invisible.vbs %~dp0windows-start.bat > MyNotes.bat

echo Set oWS = WScript.CreateObject("WScript.Shell") > CreateShortcut.vbs
echo sLinkFile = "MyNotes.lnk" >> CreateShortcut.vbs
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> CreateShortcut.vbs
echo oLink.TargetPath = "%~dp0MyNotes.bat" >> CreateShortcut.vbs
echo oLink.IconLocation = "%~dp0..\..\accets\images\note.ico" >> CreateShortcut.vbs
echo oLink.Save >> CreateShortcut.vbs
cscript CreateShortcut.vbs
del CreateShortcut.vbs

cd ../..
npm install
