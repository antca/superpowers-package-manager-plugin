import fs from 'fs';

function copyFile(src, dest) {
  return new Promise((resolve, reject) =>
    fs.createReadStream(src)
      .pipe(fs.createWriteStream(dest))
      .on('finish', resolve)
      .on('error', reject)
  );
}

export { copyFile };
