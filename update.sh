
filesToRemove=( "modules/arrays.bclm" "modules/exampleModule.bclm" "modules/fs.bclm" "modules/safeMode.bclm" "language" "index.js" "variablesdefault.json" )

for i in "${filesToRemove[@]}"; do
  if test -f "$i" ; then
    rm -rf "$i" || true;
  fi
done &&

clear &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/index.js")" > "index.js" &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/language")" > "language" &&

if ! test -d "modules" ; then
  mkdir "modules";
fi &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/modules/arrays.bclm")" > "modules/arrays.bclm" &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/modules/exampleModule.bclm")" > "modules/exampleModule.bclm" &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/modules/fs.bclm")" > "modules/fs.bclm" &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/modules/safeMode.bclm")" > "modules/safeMode.bclm" &&

#echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/bacola")" > "bacola" &&
echo "node index.js $1" > "bacola" &&

if ! test -f "variables.json" ; then
  echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/variables.json")" > "variables.json";
fi &&

if ! test -f "index.bacola" ; then
  echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/index.bacola")" > "./index.bacola";
fi &&

if ! test -f "programFile" ; then
  touch "programFile";
fi &&

echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/variablesdefault.json")" > "variablesdefault.json" &&

chmod +x * &&

eval "node index.js $(cat "programFile")";