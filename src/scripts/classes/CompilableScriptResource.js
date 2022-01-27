import Resource from './Resource'
import {
  createElement,
  createScriptBlob,
  createObjectURL
} from '../lib/utils'

class CompilableScriptResource extends Resource {
  constructor ({ content = '' } = {}) {
    super()
    this.content = content
  }

  setContent (content) {
    this.content = content
    this._scopify()
  }

  build () {
    const {
      content,
      context,
      referenceId
    } = this

    const options = {
      id: referenceId,
      async: true,
      defer: true,
      src: createObjectURL(createScriptBlob(content), context.window)
    }

    return createElement('script', options)
  }

  _scopify () {
    this.content = `(function() {\n${this.content}\n})();`
  }
}

export default CompilableScriptResource
