const fs = require('node:fs/promises');
const path = require('node:path');

const foo = async () => {
  try {
    const filesArr = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', 'file5.txt'];
    const folderArr = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5'];

    const basePath = path.join(process.cwd(), 'base-folder');

    await fs.mkdir(basePath, { recursive: true });
    await Promise.all([
      ...folderArr.map(async (folderName) => {
        await fs.mkdir(path.join(basePath, folderName));
      }),
      ...filesArr.map(async (fileName) => {
        await fs.writeFile(path.join(basePath, fileName), 'HELLO !!!');
      })
    ]);

    const arr = await fs.readdir(basePath);

    await Promise.all(arr.map(async (item) => {
      const stat = await fs.stat(path.join(basePath, item));
      console.log(stat.isFile() ? 'FILE: ' : 'FOLDER: ', item);
    }));

  } catch (e) {
    console.error(e.message);
  }
}

foo().then();
