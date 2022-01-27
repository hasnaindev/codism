import Resource from './Resource'
import {
  createElement,
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
      context,
      referenceId
    } = this

    const options = {
      id: referenceId,
      rel: 'stylesheet',
      href: createObjectURL(createStyleBlob(content), context.window)
    }

    return createElement('link', options)
  }
}

export default CompilableStyleResource
