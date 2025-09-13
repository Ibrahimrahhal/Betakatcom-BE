const fs = require('fs');
const path = require('path');

function findTsFiles(dir) {
    let tsFiles = [];
    
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            // Recursively search subdirectories
            tsFiles = tsFiles.concat(findTsFiles(filePath));
        } else if (file.endsWith('.ts')) {
            tsFiles.push(filePath);
        }
    }
    
    return tsFiles;
}

function appendLineToFile(filePath, lineToAppend) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check if file already ends with a newline
        const needsNewline = content.length > 0 && !content.endsWith('\n');
        const finalContent = content + (needsNewline ? '\n' : '') + lineToAppend + '\n';
        
        fs.writeFileSync(filePath, finalContent, 'utf8');
        console.log(`✓ Appended line to: ${filePath}`);
    } catch (error) {
        console.error(`✗ Error processing ${filePath}:`, error.message);
    }
}

function processAllTsFiles() {
    const currentDir = process.cwd();
    const lineToAppend = '// Auto-generated comment';
    
    console.log(`Searching for TypeScript files in: ${currentDir}`);
    
    try {
        const tsFiles = findTsFiles(currentDir);
        
        if (tsFiles.length === 0) {
            console.log('No TypeScript files found.');
            return;
        }
        
        console.log(`Found ${tsFiles.length} TypeScript file(s):`);
        tsFiles.forEach(file => console.log(`  - ${file}`));
        
        console.log('\nProcessing files...');
        tsFiles.forEach(file => {
            appendLineToFile(file, lineToAppend);
        });
        
        console.log(`\nCompleted! Processed ${tsFiles.length} file(s).`);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Run the script
processAllTsFiles();
