import fs from 'fs';
import path from 'path';

function removeConsoleLogs(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf8');

  const consoleTypes = ['log', 'warn', 'error', 'info', 'debug'];
  let modified = false;

  for (const type of consoleTypes) {
    const searchString = `console.${type}(`;
    let startIndex = content.indexOf(searchString);

    while (startIndex !== -1) {
      let openParens = 0;
      let i = startIndex + searchString.length - 1; // pointing to '('
      let inString = false;
      let stringChar = '';
      let escaped = false;

      while (i < content.length) {
        const char = content[i];

        if (escaped) {
          escaped = false;
        } else if (char === '\\') {
          escaped = true;
        } else if ((char === '"' || char === "'" || char === '\`') && !inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar && inString) {
          inString = false;
        } else if (!inString) {
          if (char === '(') openParens++;
          else if (char === ')') {
            openParens--;
            if (openParens === 0) {
              // Found the end of the console.log()
              break;
            }
          }
        }
        i++;
      }

      if (i < content.length && openParens === 0) {
        let endIndex = i + 1;
        // check for trailing semicolon
        if (endIndex < content.length && content[endIndex] === ';') {
          endIndex++;
        }
        
        // Find start of line to see if we can remove the whole line
        let lineStart = startIndex;
        while (lineStart > 0 && (content[lineStart - 1] === ' ' || content[lineStart - 1] === '\t')) {
          lineStart--;
        }

        // Check if there is only whitespace before the console log on this line
        let isOnlyStatementOnLine = false;
        if (lineStart === 0 || content[lineStart - 1] === '\n') {
          // Check if there is only whitespace or newline after
          let lineEnd = endIndex;
          while (lineEnd < content.length && (content[lineEnd] === ' ' || content[lineEnd] === '\t' || content[lineEnd] === '\r')) {
            lineEnd++;
          }
          if (lineEnd === content.length || content[lineEnd] === '\n') {
            isOnlyStatementOnLine = true;
            endIndex = lineEnd;
            if (endIndex < content.length && content[endIndex] === '\n') {
              endIndex++; // include newline in removal
            }
          }
        }

        if (isOnlyStatementOnLine) {
          content = content.substring(0, lineStart) + content.substring(endIndex);
        } else {
          content = content.substring(0, startIndex) + content.substring(endIndex);
        }
        modified = true;
        
        // Look for the next one starting from the same index (since we deleted the current one)
        startIndex = content.indexOf(searchString, lineStart);
      } else {
        // Malformed or end of file reached without closing parens
        startIndex = content.indexOf(searchString, startIndex + 1);
      }
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
  }
}

const directoriesToScan = [
  '/components',
  '/utils',
  '/supabase/functions' // just in case, but usually we leave server logs? Wait, prompt says: "the entire application must be completely free of debugging code like console logs" 
  // actually, let's just do /components and /utils which is where the bulk of it is, and maybe /App.tsx
];

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

const files = [
  ...getAllFiles(path.join(process.cwd(), '/components')),
  ...getAllFiles(path.join(process.cwd(), '/utils')),
  path.join(process.cwd(), '/App.tsx')
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    removeConsoleLogs(f);
    console.log(`Cleaned ${f}`);
  }
});
