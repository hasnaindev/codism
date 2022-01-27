import CompilableScriptResource from '../classes/CompilableScriptResource'

const resource = new CompilableScriptResource()

export default (content, refs) => {
  resource.setContent(content)
  resource.setContext(refs)
  resource.execute()
}
