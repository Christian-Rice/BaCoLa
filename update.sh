rm -rf "index.js" &&
rm -rf "language" &&
rm -rf "modules" &&

clear &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/index.js")" > "index.js" &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/language")" > "language" &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/update.sh")" > "update.sh" &&

mkdir "modules" &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/index.js")" > "modules/arrays.bclm" &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/modules/exampleModule.bclm")" > "modules/exampleModules.bclm" &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/modules/fs.bclm")" > "modules/fs.bclm" &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/modules/safeMode.bclm")" > "modules/safeMode.bclm" &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/bacola")" > "bacola" &&

chmod +x * &&

./bacola "$(cat programFile)";