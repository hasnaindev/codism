import 'codemirror/lib/codemirror.css'

import 'codemirror/mode/css/css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/javascript/javascript'

import select from 'select-dom'
import CodeMirror from 'codemirror'

import { get, set } from '../classes/Store'
import createDebouncer from '../lib/debouncer'

const config = [
  {
    key: 'html',
    el: select('#html-editor'),
    options: {
      mode: 'htmlmixed'
    },
  },
  {
    key: 'css',
    el: select('#css-editor'),
    options: {
      mode: 'css'
    }
  },
  {
    key: 'js',
    el: select('#js-editor'),
    options: {
      mode: 'javascript'
    }
  }
]

export default () => {
  for (const { el, key, options } of config) {
    const codemirror = new CodeMirror(el, {
      tabSize: 2,
      lineNumbers: true,
      lineWrapping: true,
      theme: 'material-palenight',
      value: get()[key],
      ...options
    })

    const debounce = createDebouncer(1000)

    codemirror.on('change', instance => {
      debounce(() => {
        set(key, instance.getValue())
      })
    })
  }
}
