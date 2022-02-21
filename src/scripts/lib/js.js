import CompilableScriptResource from '../classes/CompilableScriptResource'

const resource = new CompilableScriptResource()

export default (content, context) => {
  resource.setContent(content)
  resource.setContext(context)
  resource.execute()
}
