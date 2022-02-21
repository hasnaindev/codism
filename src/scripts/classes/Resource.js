import select from 'select-dom'
import { v4 } from 'uuid-browser'

class Resource {
  constructor (
    {
      uri = '',
      content = '',
      context = {}
    } = {}
  ) {
    this.uri = uri
    this.content = content
    this.context = context
    this.referenceId = `x${v4()}`
  }

  setContent (content) {
    this.content = content
  }

  setContext (context) {
    this.context = context
  }

  build () {
    throw new Error('implement build method in subclass')
  }

  execute () {
    const {
      context,
      referenceId,
    } = this

    const ref = select(`#${referenceId}`, context.document)

    if (ref) ref.remove()

    context.document.head.append(this.build())
  }
}

export default Resource
