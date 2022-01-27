import '../styles/index.css'

import initCodeMirror from './modules/codemirror'
import { init as initStore } from './lib/store'
import initPreview from './modules/preview'

initPreview()
initStore()
initCodeMirror()
