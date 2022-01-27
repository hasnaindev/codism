import select from 'select-dom'
import { v4 } from 'uuid-browser'

class Resource {
  constructor (
    {
      uri = '',
      context = {}
    } = {}
  ) {
    const id = v4().replace(/-/g, '_')

    this.uri = uri
    this.context = context
    this.referenceId = `#x${id}`
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

    const ref = select(referenceId, context.document)

    if (ref) ref.remove()

    context.document.head.append(this.build())
  }
}

export default Resource
