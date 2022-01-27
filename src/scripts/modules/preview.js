import select from 'select-dom'

import runJs from '../lib/js'
import runCss from '../lib/css'
import { subscribe } from '../classes/Store'

const refs = {
  window: null,
  document: null
}

const updateJs = content => {
  runJs(content, refs)
}

const updateCss = content => {
  runCss(content, refs)
}

const updateHtml = content => {
  refs.document.body.innerHTML = content
}

export default () => {
  const el = select('#preview')

  refs.window = el.contentWindow
  refs.document = el.contentDocument

  const onStateChange = (key, value) => {
    switch (key) {
      case 'js':
        updateJs(value)
      break
      case 'css':
        updateCss(value)
      break
      case 'html':
        updateHtml(value)
      break
    }
  }

  subscribe(onStateChange)
}
