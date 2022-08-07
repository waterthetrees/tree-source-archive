import fs from 'fs';
import fse from 'fs-extra';

const dataNew = './data/raw/';
const dataOld = './data-old/';

// list all files in the directory
export const copyAllFiles = async (dir) => {
  const dataDir = dir || dataOld;
  try {
    const fileList = await fs.readdirSync(dataDir);
    fileList.forEach(fileName => copyFile(fileName, dataDir, dataNew));
  } catch (err) {
    console.error('copyAllFiles', err);
  }
}

async function copyFile(fileName, fromDir, toDir) {
  try {
    const exists = await fse.pathExists(`${toDir}${fileName}`);
    if (exists) return;
    await fse.copy(`${fromDir}${fileName}`, `${toDir}${fileName}`);
    console.log(`success copying from ${fromDir}${fileName} to ${toDir}${fileName}`);
  } catch (err) {
    console.error('copyFiles', err);
  }
}

copyAllFiles()