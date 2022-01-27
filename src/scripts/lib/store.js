import storage from "local-storage"

class Store {
  constructor () {
    this.state = {
      js: '',
      css: '',
      html: ''
    }

    this.subscribers = []
  }

  /**
   * Hydrates the store and add persistence.
   */
  init () {
    this._hydrate()
    this._persist()
  }

  /**
   * Gets the current state.
   *
   * @returns {Object}
   */
  get () {
    return { ...this.state }
  }

  /**
   * Sets the state and notify any
   * attached subscribers.
   *
   * @param {string} key
   * @param {*} value
   */
  set (key, value) {
    this.state = {
      ...this.state,
      [key]: value
    }

    this._notify(key, value, { ...this.state })
  }

  /**
   * Adds a subscription that runs each
   * time state is updated, this also returns
   * unsubscribe that you can call to
   * unsubscribe.
   *
   * @param {function} subscriber
   * @returns {function}
   */
  subscribe (subscriber) {
    if (typeof subscriber !== 'function') {
      throw new Error(`"subscriber" should be of type function, "${typeof subscriber} provided instead"`)
    }

    this.subscribers.push(subscriber)

    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== subscriber)
    }
  }

  /**
   * Notifies subscribes regarding
   * changes to the state.
   *
   * @param {string} updatedKey
   * @param {*} updatedValue
   * @param {Object} state
   */
  _notify (updatedKey, updatedValue, state) {
    this.subscribers.forEach(subscriber => {
      subscriber(updatedKey, updatedValue, state)
    })
  }

  /**
   * Hydrates the state from local storage.
   */
  _hydrate () {
    const data = storage(Store.STORAGE_KEY)

    if (data) {
      for (const key in data) {
        this.set(key, data[key])
      }
    }
  }

  /**
   * Store state in local storage
   * each time state is updated.
   */
  _persist () {
    this.subscribe((key, value, state) => {
      storage(Store.STORAGE_KEY, state)
    })
  }
}

Store.STORAGE_KEY = 'CODISM'

const store = new Store()

export const get = store.get.bind(store)
export const set = store.set.bind(store)
export const init = store.init.bind(store)
export const subscribe = store.subscribe.bind(store)
