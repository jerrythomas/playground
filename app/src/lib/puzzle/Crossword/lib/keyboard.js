import { isEmpty } from 'lodash'

export function navigate(node, { x, y, allowed }) {
  const data = { x, y, allowed }
  const actions = {
    ArrowUp: () => ({ x: 0, y: -1, action: 'moveBy' }),
    ArrowDown: () => ({ x: 0, y: 1, action: 'moveBy' }),
    ArrowLeft: () => ({ x: -1, y: 0, action: 'moveBy' }),
    ArrowRight: () => ({ x: 1, y: 0, action: 'moveBy' }),
    Backspace: () => ({ x: data.x, y: data.y, action: 'remove' }),
    Delete: () => ({ x: data.x, y: data.y, action: 'remove' }),
    Enter: () => ({ x: data.x, y: data.y, action: 'toggle' })
  }

  function handleKeyUp(e) {
    const key = e.key === ' ' ? 'Enter' : e.key
    let detail = {}

    if (key in actions) {
      detail = actions[key]()
    } else {
      detail = data.allowed.includes(key.toUpperCase())
        ? { x: data.x, y: data.y, value: key.toUpperCase(), action: 'replace' }
        : {}
    }
    if (!isEmpty(detail)) node.dispatchEvent(new CustomEvent('change', { detail }))
  }

  window.addEventListener('keyup', handleKeyUp)
  return {
    update({ x, y, allowed }) {
      data.x = x
      data.y = y
      data.allowed = allowed
    },
    destroy() {
      window.removeEventListener('keyup', handleKeyUp)
    }
  }
}
