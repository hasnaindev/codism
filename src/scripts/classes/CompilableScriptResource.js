import Resource from './Resource'
import {
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
      context
    } = this

    const script = document.createElement('script')

    script.async = true
    script.defer = true
    script.src = createObjectURL(createScriptBlob(content), context.window)

    return script
  }

  _scopify () {
    this.content = `(function() {\n${this.content}\n})();`
  }
}

export default CompilableScriptResource
