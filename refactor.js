const fs = require('fs')
const code = fs.readFileSync('patch_main.js', 'utf8')
const oldMatch = code.match(/const oldCategorizeRoomStructures = `([\s\S]*?)`/)
const newMatch = code.match(/const newCategorizeRoomStructures = `([\s\S]*?)`/)

const newCode = `const fs = require('fs')

const patches = [
  {
    oldContent: \`${oldMatch[1]}\`,
    newContent: \`${newMatch[1]}\`
  }
]

function runPatch () {
  const file = 'main.js'
  let content = fs.readFileSync(file, 'utf8') || ''

  if (content) {
    for (const patch of patches) {
      content = content.replace(patch.oldContent, patch.newContent)
    }
    fs.writeFileSync(file, content, 'utf8')
  }
}

runPatch.patches = patches;

if (require.main === module) {
  runPatch()
}

module.exports = runPatch
`
fs.writeFileSync('patch_main.js', newCode)
