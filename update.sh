i=0
rm -rf "index.js" &&
rm -rf "language" &&
rm -rf "modules" &&

clear &&

i=$((i+1))
echo $i
echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/index.js")" > "index.js" &&

i=$((i+1))
echo $i
echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/language")" > "language" &&

i=$((i+1))
echo $i
echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/update.sh")" > "update.sh" &&

mkdir "modules" &&

i=$((i+1))
echo $i
echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/index.js")" > "modules/arrays.bclm" &&

i=$((i+1))
echo $i
echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/modules/exampleModule.bclm")" > "modules/exampleModules.bclm" &&

i=$((i+1))
echo $i
echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/modules/fs.bclm")" > "modules/fs.bclm" &&

i=$((i+1))
echo $i
echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/modules/safeMode.bclm")" > "modules/safeMode.bclm" &&

i=$((i+1))
echo $i
echo "$(curl -fsSL "https://raw.githubusercontent.com/Christian-Rice/BaCoLa/master/bacola")" > "bacola" &&

chmod +x * &&

./bacola "$(cat programFile)";