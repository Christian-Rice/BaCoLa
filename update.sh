if ! test -d "bacola" ; then
  mkdir "bacola"
fi &&
cd "bacola"
filesToRemove=( "modules/arrays.bclm" "modules/exampleModule.bclm" "modules/fs.bclm" "modules/safeMode.bclm" "" )

mkdir "../temp" &&

for i in "${filesToRemove[@]}"; do
  rm -rf "$i";
done &&

mkdir "../temp/modules" &&

mv "modules/*" "../temp/modules" &&
cd "../" &&

rm -rd "../bacola"

mkdir "bacola" &&
cd "bacola" &&

clear &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/index.js")" > "index.js" &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/language")" > "language" &&

mkdir "modules" &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/index.js")" > "modules/arrays.bclm" &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/modules/exampleModule.bclm")" > "modules/exampleModule.bclm" &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/modules/fs.bclm")" > "modules/fs.bclm" &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/modules/safeMode.bclm")" > "modules/safeMode.bclm" &&

#echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/bacola")" > "bacola" &&
echo "node bacola/index.js $1" > "bacola" &&

if ! test -f "variables.json" ; then
  echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/variables.json")" > "variables.json";
fi &&
cd "../" &&
if ! test -f "index.bacola" ; then
  echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/index.bacola")" > "index.bacola";
fi &&

if ! test -f "programFile" ; then
  touch "programFile";
fi &&
cd "bacola" &&
echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/variablesdefault.json")" > "variablesdefault.json" &&
cd "../" &&
cp "temp/modules/*" "bacola/modules" &&

rm -rf "temp" &&

chmod +x * &&

./bacola/bacola "$(cat "programFile")";