import '../styles/index.css'

import initCodeMirror from './modules/codemirror'
import { init as initStore } from './classes/Store'
import initPreview from './modules/preview'

initPreview()
initStore()
initCodeMirror()
