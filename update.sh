if ! test -d "bacola" ; then
  mkdir "bacola"
fi &&

filesToRemove=( "modules/arrays.bclm" "modules/exampleModule.bclm" "modules/fs.bclm" "modules/safeMode.bclm" "" )

if ! test -d "../temp" ; then
  mkdir "../temp";
fi &&
cd "bacola"
for i in "${filesToRemove[@]}"; do
  if test -f "$i" ; then
    rm -rf "$i";
  fi
done &&
cd "../" &&
if ! test -d "../temp/modules" ; then
  mkdir "../temp/modules";
fi &&
cd "bacola"
mv "modules/*" "../temp/modules" &&
cd "../" &&

rm -rd "../bacola" &&

if ! test -d "bacola" ; then
  mkdir "bacola"
fi &&

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