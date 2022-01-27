import CompilableStyleResource from '../classes/CompilableStyleResource'

const resource = new CompilableStyleResource()

export default (content, context) => {
  resource.setContent(content)
  resource.setContext(context)
  resource.execute()
}
