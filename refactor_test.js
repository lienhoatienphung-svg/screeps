const fs = require('fs');

const testFile = 'tests/patch_main.test.js';
let testCode = fs.readFileSync(testFile, 'utf8');

testCode = testCode.replace(
  `    const actualFs = jest.requireActual('fs')
    const patchScriptContent = actualFs.readFileSync('patch_main.js', 'utf8')

    const oldContentMatch = patchScriptContent.match(
      /const oldCategorizeRoomStructures = \\\`([\\s\\S]*?)\\\`;/
    )
    const newContentMatch = patchScriptContent.match(
      /const newCategorizeRoomStructures = \\\`([\\s\\S]*?)\\\`;/
    )

    if (!oldContentMatch || !newContentMatch) {
      throw new Error('Could not find old or new content in patch_main.js')
    }

    const oldContent = oldContentMatch[1]
    const newContent = newContentMatch[1]`,
  `    const patch = patchScript.patches[0]
    const oldContent = patch.oldContent
    const newContent = patch.newContent`
);

fs.writeFileSync(testFile, testCode, 'utf8');
