import select from 'select-dom'
import {
  appendElement,
  createElement,
  createObjectURL,
  createStyleBlob,
  revokeObjectURL
} from './utils'

const id = 'css-ref'

export default (content, refs) => {
  let ref = select(`#${id}`, refs.document)

  if (ref) ref.remove()

  ref = createElement('link', refs.document, { rel: 'stylesheet' })

  if (ref && ref.href) {
    revokeObjectURL(ref.href, refs.document)
  }

  ref.href = createObjectURL(createStyleBlob(content), refs.window)
  appendElement(ref, refs.document.head)
}
