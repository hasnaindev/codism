import '../styles/index.css'

import initCodeMirror from './modules/codemirror'
import initPreview from './modules/preview'
import { hydrate } from './lib/store'

initPreview()
hydrate()
initCodeMirror()
