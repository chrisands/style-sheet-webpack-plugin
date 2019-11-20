import { RawSource } from 'webpack-sources'
import { getCss } from 'style-sheet/babel'

class StyleSheetPlugin {
  constructor(options = {}) {
    this.options = Object.assign(
      {
        filename: 'style-sheet-bundle.css',
      },
      options
    )
  }

  // Replaces [hash] with actual hash
  getFilename(compilation) {
    const { hash } = compilation.getState()
    const { filename } = this.options

    return filename.replace(/(.+)\[hash\](.+)/, `$1${hash}$2`)
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('StyleSheetPlugin', compilation => {
      // Add css file to chunk
      compilation.hooks.additionalChunkAssets.tap('StyleSheetPlugin', () => {
        const { chunkGroups } = compilation
        if (
          chunkGroups.length > 0 &&
          chunkGroups[0].origins.length > 0 &&
          chunkGroups[0].origins[0].request === null
        ) {
          chunkGroups[0].chunks[0].files.push(this.getFilename(compilation))
        }
      })
    })

    // Emit css file
    compiler.hooks.emit.tap('StyleSheetPlugin', compilation => {
      compilation.emitAsset(this.getFilename(compilation), new RawSource(getCss()))
    })
  }
}

export default StyleSheetPlugin
