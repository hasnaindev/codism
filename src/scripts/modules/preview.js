import select from 'select-dom'

import runJs from '../lib/js'
import runCss from '../lib/css'
import { subscribe } from '../classes/Store'

const refs = {
  window: null,
  document: null
}

const updateJs = content => runJs(content, refs)
const updateCss = content => runCss(content, refs)
const updateHtml = content => (refs.document.body.innerHTML = content)

export default () => {
  const el = select('#preview')

  refs.window = el.contentWindow
  refs.document = el.contentDocument

  const onStateChange = (key, value, { html, js }) => {
    switch (key) {
      case 'js':
      case 'html':
        updateHtml(html)
        updateJs(js)
      break
      case 'css':
        updateCss(value)
      break
    }
  }

  updateHtml(defaultHtml)
  subscribe(onStateChange)
}

const defaultHtml = `
<div style="text-align: center; padding-top: 30px; font-family: sans-serif">
  <h1 style="margin-bottom: 12px">Preview</h1>
  <p>Starting writing HTML, CSS and JavaScript!</p>
</div>
`
