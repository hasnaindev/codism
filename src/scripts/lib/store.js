const state = {
  js: '',
  css: '',
  html: ''
}

const listeners = []

const notify = (key, value, state) =>
  listeners.forEach(listener => listener(key, value, state))

export const get = () => ({ ...state })

export const set = (key, value) => {
  state[key] = value
  notify(key, value, { ...state })
}

export const listen = listener =>
  typeof listener === 'function' && listeners.push(listener)

export const hydrate = () => {
  const value = localStorage.getItem('code')

  if (value) {
    try {
      const parsed = JSON.parse(value)
      for (const key in parsed) set(key, parsed[key])
    } catch (error) {
      console.error(error)
    }
  }
}

const persist = () => {
  listen((key, value, state) => {
    localStorage.setItem('code', JSON.stringify(state))
  })
}

hydrate()
persist()
