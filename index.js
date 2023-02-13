"use strict";
var fileType = "bacola"
var cargs = process.argv.slice(2);
var autoname = true
var scriptFile = `${cargs[0] == undefined ? "index" : cargs[0]}${autoname ? `.${fileType}` : ""}`;
var variables = require(__dirname + "/variables.json");
var highLvl = true;
var constructorBackup = [];
var li = 0;
var ignore = false;
function appendVariables(list){
  Object.assign(variables, list)
  return null
}
let syntaxoptions = {
  paren: [{
    open: '(',
    close: ')'
  },
  {
    open: '[',
    close: ']'
  },
  {
    open: '{',
    close: '}'
  }],
  quoteSets: ['"',"'",'`'],
  whitespace: [' ','  ','	'],
  lineend: "\n",
  indents: '  '
};
let syntax = {
  paren: [{
    open: '(',
    close: ')'
  },
  {
    open: '[',
    close: ']'
  },
  {
    open: '{',
    close: '}'
  }],
  quoteSets: ['"',"'",'`'],
  whitespace: [' ','  ','	','	'],
  lineend: "\n",
  indents: '  '
};
appendVariables(
  /*{
    version: {
      value: null,
      locked: true
    },
    stopOnError: {
      value: true,
      locked: true
    },
    showVarCreation: {
      value: false,
      locked: true
    },
    keepLanguageDefiningCommands: {
      value: false,
      locked: true
    },
    clearConsoleAtStart: {
      value: false,
      locked: true
    }
  }*/
)
let constructors = [];
function newConstructor(fn,c) {
  constructors.push([fn, c]);
}
// Normal Print Function
newConstructor('none',{
    paren: [{
      open: '(',
      close: ')'
    },
    {
      open: '[',
      close: ']'
    },
    {
      open: '{',
      close: '}'
    }],
    quoteSets: ['"',"'",'`'],
    whitespace: [' ','  ','	','	'],
    c: '\n',
    map: [],
    evalParams: []
});
newConstructor('native',{
    paren: [{
      open: '(',
      close: ')'
    },
    {
      open: '[',
      close: ']'
    },
    {
      open: '{',
      close: '}'
    }],
    quoteSets: ['"',"'",'`'],
    whitespace: [' ','  ','	','	'],
    c: 'native function $1 {$2}',
    map: [['1','name'],['2','code']],
    evalParams: []
});
newConstructor('constructor',{
    paren: [{
      open: '(',
      close: ')'
    },
    {
      open: '[',
      close: ']'
    },
    {
      open: '{',
      close: '}'
    }],
    quoteSets: ['"',"'",'`'],
    whitespace: [' ','  ','	','	'],
    c: 'constructor $1 ({$2},{$3},{$4})',
    map: [['1','name'],['2','constructor'],['3','map'],['4','evalParams']],
    evalParams: []
});

newConstructor('setvarunlocked',{
    paren: [{
      open: '(',
      close: ')'
    },
    {
      open: '[',
      close: ']'
    },
    {
      open: '{',
      close: '}'
    }],
    quoteSets: ['"',"'",'`'],
    whitespace: [' ','  ','	','	'],
    c: 'setvarunlocked $1 = $2.',
    map: [['1','name'], ['2', 'value']],
    evalParams: ["name", "value"]
});

newConstructor('getvar',{
    paren: [{
      open: '(',
      close: ')'
    },
    {
      open: '[',
      close: ']'
    },
    {
      open: '{',
      close: '}'
    }],
    quoteSets: ['"',"'",'`'],
    whitespace: [' ','  ','	','	'],
    c: 'getvar $1',
    map: [['1','name']],
    evalParams: ["name"]
});

newConstructor('setvar',{
    paren: [{
      open: '(',
      close: ')'
    },
    {
      open: '[',
      close: ']'
    },
    {
      open: '{',
      close: '}'
    }],
    quoteSets: ['"',"'",'`'],
    whitespace: [' ','  ','	','	'],
    c: 'setvar $1 = $2.',
    map: [['1','name'], ['2', 'value']],
    evalParams: ["name", "value"]
});

newConstructor('error',{
    paren: [{
      open: '(',
      close: ')'
    },
    {
      open: '[',
      close: ']'
    },
    {
      open: '{',
      close: '}'
    }],
    quoteSets: ['"',"'",'`'],
    whitespace: [' ','  ','	','	'],
    c: 'error = $1.',
    map: [['1', 'txt']],
    evalParams: ['txt']
});
newConstructor('warn',{
    paren: [{
      open: '(',
      close: ')'
    },
    {
      open: '[',
      close: ']'
    },
    {
      open: '{',
      close: '}'
    }],
    quoteSets: ['"',"'",'`'],
    whitespace: [' ','  ','	','	'],
    c: 'warn = $1.',
    map: [['1', 'txt']],
    evalParams: ['txt']
});

newConstructor('EvalJS',{
    paren: [{
      open: '(',
      close: ')'
    },
    {
      open: '[',
      close: ']'
    },
    {
      open: '{',
      close: '}'
    }],
    quoteSets: ['"',"'",'`'],
    whitespace: [' ','  ','	','	'],
    c: 'EvalJS {$1}',
    map: [['1','txt']],
    evalParams: []
});

newConstructor('EvalJS2',{
    paren: [{
      open: '(',
      close: ')'
    },
    {
      open: '[',
      close: ']'
    },
    {
      open: '{',
      close: '}'
    }],
    quoteSets: ['"',"'",'`'],
    whitespace: [' ','  ','	','	'],
    c: 'EvalJS2 = $1',
    map: [['1','txt']],
    evalParams: ["txt"]
});

newConstructor('EvalFn',{
    paren: [{
      open: '(',
      close: ')'
    },
    {
      open: '[',
      close: ']'
    },
    {
      open: '{',
      close: '}'
    }],
    quoteSets: ['"',"'",'`'],
    whitespace: [' ','  ','	','	'],
    c: 'EvalFn = $1',
    map: [['1','txt']],
    evalParams: ["txt"]
});

newConstructor('import',{
    paren: [{
      open: '(',
      close: ')'
    },
    {
      open: '[',
      close: ']'
    },
    {
      open: '{',
      close: '}'
    }],
    quoteSets: ['"',"'",'`'],
    whitespace: [' ','  ','	','	'],
    c: 'import $1',
    map: [['1','name']],
    evalParams: ["name"]
});

newConstructor('executeFile',{
    paren: [{
      open: '(',
      close: ')'
    },
    {
      open: '[',
      close: ']'
    },
    {
      open: '{',
      close: '}'
    }],
    quoteSets: ['"',"'",'`'],
    whitespace: [' ','  ','	','	'],
    c: 'exec $1.',
    map: [['1','fn']],
    evalParams: ["fn"]
});

newConstructor('savevars',{
    paren: [{
      open: '(',
      close: ')'
    },
    {
      open: '[',
      close: ']'
    },
    {
      open: '{',
      close: '}'
    }],
    quoteSets: ['"',"'",'`'],
    whitespace: [' ','  ','	','	'],
    c: 'savevars.',
    map: [],
    evalParams: []
});

newConstructor('wait',{
    paren: [{
      open: '(',
      close: ')'
    },
    {
      open: '[',
      close: ']'
    },
    {
      open: '{',
      close: '}'
    }],
    quoteSets: ['"',"'",'`'],
    whitespace: [' ','  ','	','	'],
    c: 'wait $1.',
    map: [["1", "ms"]],
    evalParams: ["ms"]
});

newConstructor('if',{
    paren: [{
      open: '(',
      close: ')'
    },
    {
      open: '[',
      close: ']'
    },
    {
      open: '{',
      close: '}'
    }],
    quoteSets: ['"',"'",'`'],
    whitespace: [' ','  ','	','	'],
    c: '$1 ? $2 : $3',
    map: [['1', 'bool'],['2', 'then'],['3','else']],
    evalParams: ['bool', 'then', 'else']
});

let fns = {
  native: (ARGS) => {
    //console.log(ARGS.code.trim('\n').trim())
    //fns[ARGS.name] = Function("return "+ARGS.code.trim('\n').trim())();
    fns[ARGS.name] = eval("()=>{return "+ARGS.code.trim('\n').trim() + "}")();
  },
  constructor: (ARGS) => {
    newConstructor(ARGS.name,{
    paren: syntax.paren,
    quoteSets: ['"',"'",'`'],
    whitespace: [' ','  ','	','	'],
    c: ARGS.constructor,
    map: JSON.parse(ARGS.map),
    evalParams: JSON.parse(ARGS.evalParams)
    });
  },
  printDBL: (ARGS) => {
    console.log(ARGS.label+": "+ARGS.content);
  },
  setvarunlocked: (ARGS) => {
    if ((ARGS.name) in variables){
        variables[ARGS.name].value = ARGS.value;
    }else{
      variables[ARGS.name] = {
        value: ARGS.value,
        locked: true
      };
      if (variables.showVarCreation.value){
        console.log(`Created varable: ${ARGS.name}`);
      }
    }
  },
  getvar: (ARGS) => {
    if ((ARGS.name) in variables){
      return variables[ARGS.name].value
    }else{
      if (!ignore){
        console.log("\x1b[31m%s\x1b[0m",`ExecutionError: Unknown variable`);
        if (variables.stopOnError.value){
          process.exit();
        }
      }
    }
  },
  setvar: (ARGS) => {
    if ((ARGS.name) in variables){
      if (!variables[ARGS.name].locked){
        variables[ARGS.name].value = ARGS.value;
      }else{
        if (!ignore) {
          console.log("\x1b[31m%s\x1b[0m",`ExecutionError: Cannot write to a locked variable`);
          if (variables.stopOnError.value){
          process.exit();
          }
        }
      }
    }else{
     variables[ARGS.name] = {
        value: ARGS.value,
        locked: false
      };
      if (variables.showVarCreation.value){
        console.log(`Created varable: ${ARGS.name}`);
      }
    }
  },
  error: (ARGS) => {
    if (!ignore) {
      console.log("\x1b[31m%s\x1b[0m",`ExecutionError: ${ARGS.txt}`);
      if (variables.stopOnError.value){
        process.exit();
      }
    }
  },
  warn: (ARGS) => {
    if (!ignore){
      console.log("\x1b[33;1m%s\x1b[0m",`ExecutionWarn: ${ARGS.txt}`);
      if (variables.stopOnWarn.value){
        process.exit();
      }
    }
  },
  EvalJS: (ARGS) => {
    try{
      return eval(ARGS.txt.trim("\n").trim())
    }catch(err){
      if (!ignore) {
        console.log("\x1b[31m%s\x1b[0m",`ExecutionError: ${err}`);
        if (variables.stopOnError.value){
          process.exit();
        }
      }
    }
  },
  EvalJS2: (ARGS) => {
    try{
      return eval(ARGS.txt)
    }catch(err){
      if (!ignore) {
        console.log("\x1b[31m%s\x1b[0m",`ExecutionError: ${err}`);
        if (variables.stopOnError.value){
          process.exit();
        }
      }
    }
  },
  EvalFn: (ARGS) => {
    return readFunction(ARGS.txt)
  },
  import: (ARGS) => {
    var fs = require("fs");
    let program = fs.readFileSync(`${ARGS.name.split("%MFOLDER%").join(__dirname + "/modules")}${autoname ? ".bclm" : ""}`).toString();
    let _l = compileLines(program,syntaxoptions);
    for(let [i, line] of _l.entries()) {
      readFunction(line, true, i)
    }
    //evalModule(program)
    /*constructors.pop()
    constructors.pop()
    constructors.pop()*/
  },
  executeFile: (ARGS) => {
    let program = fs.readFileSync(`${ARGS.fn}${autoname ? `.${fileType}` : ""}`).toString();
    let _l = compileLines(program,syntaxoptions);
    _l = compileLines(program,syntax);
    for(let [i, line] of _l.entries()) {
      readFunction(line, false, i);
    }
  },
  savevars: (ARGS) => {
    var fs = require("fs");
    fs.writeFileSync(__dirname + "/variables.json", JSON.stringify(variables, null, "\t"))
  },
  if: (ARGS) => {
    return ARGS.bool ? ARGS.then : ARGS.else
  },
  wait: (ARGS) => {
    return new Promise(resolve => setTimeout(resolve, ARGS.ms));
  }
}

// Back to Actual Engine


function allZero(arr) {
  for(let i in arr) {
    if(arr[i]!=0) {
      return false;
    }
  }
  return true;
}
//console.log(decodeParams('<@param1="a" @param2="b">', "param2", "param1"))
function decodeParams(paramstr, ...args) {
  //<@param1="a" @param2="b">
  var params_raw;
  if (paramstr.startsWith("<") && paramstr.endsWith(">")) {
    params_raw = paramstr.substring(1, paramstr.length-1);
  } else {
    throw "Invalid parameter syntax!"
  }
  var params = params_raw.split(" ");
  var params_return = [];
  for (var i = 0; i < params.length; i++){
    params[i] = params[i].split("=");
  }
  for (var j = 0; j < args.length; j++){
    for (var k = 0; k < params.length; k++){
      if (("@" + args[j]) == params[k][0]) {
        var str = params[k][1].match(/(['"])((\\\1|.)*?)\1/gm).join("");
        params_return[params_return.length] = str.substring(1, str.length-1)
      }
    }
  }
  return params_return;
}
                
function splitFromConstructor(txt,c) {
  let p = [];
  for(let i in c.paren) {
    p.push(0);
  }
  let q = [];
  for(let i in c.quoteSets) {
    q.push(0);
  }
  let params = {};
  let j = 0;
  //if(!txt) {
    //console.log(txt);
    //throw Error(txt);
  //}
  for(let i=0; i<txt.length; i++) {
    if(txt[i] == c.c[j]) {
      j++;
    } else {
      if(c.c[j]=="$") {
        //i++;
        j+=2;
        params[c.c[j-1]] = ""
        while(!((txt[i]==c.c[j]||(i>txt.length-1))&&allZero(p)&&allZero(q))) {
          params[c.c[j-1]] += txt[i];
          if(allZero(q)) {
            for(let k in c.paren) {
              if(txt[i] == c.paren[k].open) {
                p[k] = p[k] + 1;
              }
              if(txt[i] == c.paren[k].close) {
                p[k] = p[k] - 1;
              }
            }
          }
          for(let k in c.quoteSets) {
            if(txt[i] == c.quoteSets[k]) {
              q[k] = 1 - q[k];
            }
          }
          if(i > txt.length+1) {
            //console.log(allZero(q),allZero(p));
            //throw Error("Past propper range; check that quotes and parentheses match.")
            if (!ignore) {
              console.log("\x1b[31m%s\x1b[0m",`ExecutionError: Past propper range; check that quotes and parentheses match.`);
              if (variables.stopOnError.value){
                process.exit();
              }
            }
          }
          i++;
        }
        i--;
      } else {
        throw ("Incorrect constructor")
      }
    }
  } 
  return params;
}

function mapParam(map,param) {
  for(let jkl=0; jkl<map.length; jkl++) {
    if(map[jkl][0]==param) {
      return map[jkl][1];
    }
  }
  return '[UN-NAMED PARAMS]';
}

function readFunction(txt, lvl, ln) {
  if(txt=="") {
    return "";
  }
  //console.log(txt);
  let curr = {};
  let fn = '';
  let map = [];
  let evalParams = false;
  for(let l=0; l<constructors.length; l++) {
    
    try {
      //console.log(txt);
      curr = splitFromConstructor(txt,constructors[l][1]);
      fn = constructors[l][0];
      if (!lvl && (fn == "native" || fn == "constructor" || fn == "setvarunlocked")){
        if (!ignore) {
          console.log("\x1b[31m%s\x1b[0m",`ExecutionError: Function does not exist (L${ln}): \n\n${txt}\n`);
        if (variables.stopOnError.value){
            process.exit();
          }
        }
      }
      evalParams = constructors[l][1].evalParams;
      map = constructors[l][1].map;
    } catch(err) {
      if(err == 'Incorrect constructor') {
        continue;
      } else {
        //throw err;
        if (!ignore) {
          console.log("\x1b[31m%s\x1b[0m",`ExecutionError: ${err}`);
          if (variables.stopOnError.value){
            process.exit();
          }
        }
      }
    }
  }
  let ncurr = {};
  
  for(let l in curr) {
    ncurr[mapParam(map,l)] = curr[l];
  }
  if(evalParams) {
    for(let l of evalParams) {
      ncurr[l] = readFunction(ncurr[l]);
    }
  }
  if(fn!='') {
    return fns[fn](ncurr);
  } else {
    //throw Error('Function does not exist.')
    if (!ignore) {
      console.log("\x1b[31m%s\x1b[0m",`ExecutionError: Function does not exist (CODE-BLOCK_ID::${ln}): \n\n\x1b[1m\x1b[31m${txt}\n`);
      if (variables.stopOnError.value){
        process.exit();
      }
    }
  }
}


function compileLines(txt,c) {
  let code;
  if(c.indents) {
  let stuff = txt.split('\n');
  let indentLevel = 0;
  for(let jkl in stuff) {
    for(let counter = 0; counter<indentLevel; counter++) {
      if(stuff[jkl].search(c.indents)==-1) {
        indentLevel = counter;
        //stuff[jkl] = "}" + stuff[jkl];
        stuff[jkl-1] += "\n}"
      } else {
        stuff[jkl] = stuff[jkl].replace(c.indents,'');
      }
    }
    if(stuff[jkl].search(c.indents)!=-1) {
      indentLevel++;
      stuff[jkl] = stuff[jkl].replace(c.indents,"");
      stuff[jkl-1] += " {"
    }
  }
  code = stuff.join('\n');
  //console.log(code);
  } else {
  code = txt;
  }

  let lines = [''];
  let p = [];
  for(let i in c.paren) {
    p.push(0);
  }
  let q = [];
  for(let i in c.quoteSets) {
    q.push(0);
  }
  for(let j=0; j<code.length; j++) {
    lines[lines.length-1] += code[j];
  if(allZero(q)) {
    for(let k in c.paren) {
      if(code[j] == c.paren[k].open) {
        p[k] = p[k] + 1;
      }
      if(code[j] == c.paren[k].close) {
        p[k] = p[k] - 1;
      }
    }
  }
  for(let k in c.quoteSets) {
    if(code[j] == c.quoteSets[k]) {
      q[k] = 1 - q[k];
    }
  }
  if(allZero(q)&&allZero(p)&&code[j]==c.lineend) {
    //console.log(q,p);
    lines.push('');
  }
  
  }
  lines = lines.map(n=>{
    let z = n;
    for(let xyz in c.whitespace) {
    while(z.search(c.whitespace[xyz])==0) {
      z = z.trim(c.whitespace[xyz]);
    }
    }
    z = z.trim("\n");
    return z;
  });
  return lines;


}

let fs = require('fs');
/* Read language program */
var read = async ()=>{
  try{
    let program = fs.readFileSync(__dirname + '/language').toString();
    let _l = compileLines(program,syntaxoptions);
    for(let [i, line] of _l.entries()) {
      await readFunction(line, true, i+1);
    }
    console.log('\x1b[47m\x1b[30m%s\x1b[0m', `BaCoLa ${variables.version.value}`)
    /* Read program */
    program = fs.readFileSync(scriptFile).toString();
    _l = compileLines(program,syntax);
  
    for(let [i, line] of _l.entries()) {
      if (variables.keepLanguageDefiningCommands.value){
        await readFunction(line, true, i+1);
      }else{
        await readFunction(line, false, i+1);
      }
    }
  }catch(err){
    if (!ignore){
      console.log("\x1b[31m%s\x1b[0m",`ExecutionError: ${err}`);
      if (variables.stopOnError.value){
        process.exit();
      }
    }
  }
};

read();