import Resource from './Resource'
import {
  createElement,
  createScriptBlob,
  createObjectURL
} from '../lib/utils'

class CompilableScriptResource extends Resource {
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
      src: createObjectURL(createScriptBlob(this._scopify(content)), context.window)
    }

    return createElement('script', options)
  }

  _scopify (content) {
    return `(function() {\n${content}\n})();`
  }
}

export default CompilableScriptResource
