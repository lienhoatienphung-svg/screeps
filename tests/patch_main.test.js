const fs = require('fs')
const patchScript = require('../patch_main.js')

jest.mock('fs')

describe('patch_main.js', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should read main.js and write the patched content', () => {
    // Mock readFileSync to return a simple string
    fs.readFileSync.mockReturnValue('dummy initial content')

    // Execute the script
    patchScript()

    // Verify readFileSync was called correctly
    expect(fs.readFileSync).toHaveBeenCalledTimes(1)
    expect(fs.readFileSync).toHaveBeenCalledWith('main.js', 'utf8')

    // Verify writeFileSync was called correctly
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1)
    expect(fs.writeFileSync).toHaveBeenCalledWith('main.js', expect.any(String), 'utf8')
  })

  it('should actually replace the old structure function if present', () => {
    // Read the actual patch_main.js to extract the old text so we can test the replacement
    const patch = patchScript.patches[0]
    const oldContent = patch.oldContent
    const newContent = patch.newContent

    const prefix = 'const a = 1;\n'
    const suffix = '\nconst b = 2;'
    const initialFileContent = prefix + oldContent + suffix
    const expectedFileContent = prefix + newContent + suffix

    fs.readFileSync.mockReturnValue(initialFileContent)

    patchScript()

    expect(fs.writeFileSync).toHaveBeenCalledWith('main.js', expectedFileContent, 'utf8')
  })
})
