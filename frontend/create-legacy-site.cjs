const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'src', 'legacy-content.txt');
const outputPath = path.join(__dirname, 'src', 'LegacySite.jsx');

if (!fs.existsSync(htmlPath)) {
    console.error('HTML file not found');
    process.exit(1);
}

let html = fs.readFileSync(htmlPath, 'utf8').trim();

// Clean up trailing backtick if it exists
if (html.endsWith('`')) {
    html = html.substring(0, html.length - 1);
}

const legacyHTML = ` ${html.replace(/`/g, '\\`').replace(/\${/g, '\\${')} `;

const component = `import React, { useEffect } from "react";

const legacyHTML = \`${html.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`;

const LegacySite = () => {
  useEffect(() => {
    // Re-initialize legacy scripts
    const script = document.createElement("script");
    script.src = "/legacy-script.js";
    script.async = true;
    
    script.onload = () => {
      console.log("Legacy script loaded");
      setTimeout(() => {
        if (typeof window.initApp === "function") {
          window.initApp();
        }
        if (typeof window.navTo === "function") {
          window.navTo('home');
          const nav = document.getElementById("main-nav");
          if (nav) nav.style.display = "block";
        }
      }, 100);
    };

    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: legacyHTML }} />
  );
};

export default LegacySite;`;

fs.writeFileSync(outputPath, component);
console.log('LegacySite.jsx created successfully');
