const fs = require('fs');
let code = fs.readFileSync('frontend/public/legacy-script.js', 'utf8');
code = `
  global.localStorage = {getItem:()=>null, setItem:()=>{}};
  global.document={readyState:"complete", body:{classList:{add:()=>{}}}, getElementById:()=>({}), querySelectorAll:()=>([])};
  global.window={addEventListener:()=>{}};
` + code;
try { eval(code); console.log('No syntax errors'); } catch(e) { console.error(e); }
