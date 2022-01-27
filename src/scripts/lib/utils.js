const createBlob = (content, type) => new Blob([content], { type })

export const createStyleBlob = (content) => createBlob(content, 'text/css')
export const createScriptBlob = (content) => createBlob(content, 'application/javascript')

export const createObjectURL = (blob, context = window) => context.URL.createObjectURL(blob)
export const revokeObjectURL = (blob, context = window) => context.URL.revokeObjectURL(blob)

export const appendElement = (element, context = document.body) => context.append(element)
export const removeElement = (element, context = document) => context.removeChild(element)

export const createElement = (type, attributes) => {
  const element = document.createElement(type)

  if (attributes) {
    for (let attribute in attributes) {
      element.setAttribute(attribute, attributes[attribute])
    }
  }

  return element
}
