rm -rf "index.js" &&
rm -rf "language" &&
rm -rf "modules" &&

clear &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/index.js")" > "index.js" &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/language")" > "language" &&

mkdir "modules" &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/index.js")" > "modules/arrays.bclm" &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/modules/exampleModule.bclm")" > "modules/exampleModules.bclm" &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/modules/fs.bclm")" > "modules/fs.bclm" &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/modules/safeMode.bclm")" > "modules/safeMode.bclm" &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/bacola")" > "bacola" &&

if ! test -f "File2.txt" ; then
  echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/variables.json")" > "variables.json";
fi &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/variablesdefault.json")" > "variablesdefault.json" &&

chmod +x * &&

./bacola "$(cat programFile)";