import Resource from './Resource'
import {
  createStyleBlob,
  createObjectURL
} from '../lib/utils'

class CompilableStyleResource extends Resource {
  constructor ({ content = '' } = {}) {
    super()
    this.content = content
  }

  setContent (content) {
    this.content = content
  }

  build () {
    const {
      content,
      context
    } = this

    const stylesheet = document.createElement('link')
    stylesheet.rel = 'stylesheet'
    stylesheet.href = createObjectURL(createStyleBlob(content), context.window)

    return stylesheet
  }
}

export default CompilableStyleResource
