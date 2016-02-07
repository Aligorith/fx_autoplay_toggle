echo off
REM Build all the icons at the required resolutions. Each one is hardcoded here for simplicity

echo Building "Disabled" icons
inkscape.exe --export-png disabled-16.png -w 16 disabled.svg
inkscape.exe --export-png disabled-32.png -w 32 logo.svg
inkscape.exe --export-png disabled-64.png -w 64 logo.svg

echo Building "Active" icons
inkscape.exe --export-png enabled-16.png -w 16 enabled.svg
inkscape.exe --export-png enabled-32.png -w 32 enabled.svg
inkscape.exe --export-png enabled-64.png -w 64 enabled.svg

