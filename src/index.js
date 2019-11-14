import { RawSource } from 'webpack-sources'
import StyleSheet from 'style-sheet'

class StyleSheetPlugin {
  constructor(options = {}) {
    this.options = Object.assign(
      {
        filename: 'style-sheet-bundle.css',
      },
      options
    )
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('StyleSheetPlugin', compilation => {
      compilation.hooks.additionalChunkAssets.tap('StyleSheetPlugin', () => {
        const { chunkGroups } = compilation
        if (
          chunkGroups.length > 0 &&
          chunkGroups[0].origins.length > 0 &&
          chunkGroups[0].origins[0].request === null
        ) {
          chunkGroups[0].chunks[0].files.push(this.options.filename)
        }
      })
    })

    compiler.hooks.emit.tap('StyleSheetPlugin', compilation => {
      compilation.emitAsset(
        this.options.filename,
        new RawSource(StyleSheet.getCss())
      )
    })
  }
}

export default StyleSheetPlugin
