import select from 'select-dom'
import {
  appendElement,
  createElement,
  createObjectURL,
  createScriptBlob,
  revokeObjectURL
} from './utils'

const id = 'js-ref'

export default (content, refs) => {
  let ref = select(`#${id}`, refs.document)

  if (ref) ref.remove()

  ref = createElement('script', refs.document, { id, async: true, defer: true })

  if (ref && ref.src) {
    revokeObjectURL(ref.src, refs.window)
  }

  ref.src = createObjectURL(createScriptBlob(scopify(content)), refs.window)
  appendElement(ref, refs.document.head)
}

const scopify = content => `
(function() {
${content}
})();
`.trim()
