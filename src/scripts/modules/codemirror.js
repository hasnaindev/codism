import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'

import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/css-hint'
import 'codemirror/addon/hint/html-hint'
import 'codemirror/addon/hint/javascript-hint'

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
      mode: 'text/html'
    },
  },
  {
    key: 'css',
    el: select('#css-editor'),
    options: {
      mode: 'text/css',
    }
  },
  {
    key: 'js',
    el: select('#js-editor'),
    options: {
      mode: 'application/javascript'
    }
  }
]

export default () => {
  for (const { el, key, options } of config) {
    const codemirror = CodeMirror(el, {
      tabSize: 2,
      lineNumbers: true,
      lineWrapping: true,
      value: get()[key],
      theme: 'material-palenight',
      extraKeys: {
        'Ctrl-Space': 'autocomplete'
      },
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
