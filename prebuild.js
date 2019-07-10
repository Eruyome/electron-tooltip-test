const fs = require('fs')
const path = require('path')
const os = require('os')
const rimraf = require('rimraf')

const tempFolder = path.join(os.tmpdir(), 'PoE-TradeMacro')
const fileList = ['index.html', 'style.css', 'renderer.js']

try {
	rimraf.sync(tempFolder);
} catch (e) {}

if (!fs.existsSync(tempFolder)) {
    fs.mkdirSync(tempFolder);
}

for(let file of fileList) {
    fs.copyFileSync(path.join(__dirname, file), path.join(tempFolder, file))
}
console.log(`Copied files "${fileList}" to "${tempFolder}".\n`)