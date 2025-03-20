const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Get the directory of the current script
const rootDir = __dirname;

// Path to the TypeScript compiler
const tscPath = path.join(rootDir, 'node_modules', '.bin', 'tsc');

console.log('Starting TypeScript compilation...');

// Check if tsc exists
if (fs.existsSync(tscPath)) {
    // Execute the TypeScript compiler
    exec(`"${tscPath}"`, { cwd: rootDir }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error during compilation: ${error.message}`);
            return;
        }
        
        if (stderr) {
            console.error(`Compilation stderr: ${stderr}`);
            return;
        }
        
        console.log('TypeScript compilation completed successfully!');
        console.log(stdout);
    });
} else {
    console.error('TypeScript compiler not found. Please install TypeScript with: npm install typescript --save-dev');
}
