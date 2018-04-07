export function preventDoubleSubmission (fn) {
  return function (event) {
    const el = event.target
    let ret

    isLoading(el, true)
    try {
      ret = fn.call(this, event)
      if (isPromise(ret)) {
        ret
          .then(() => { isLoading(el, false) })
          .catch(() => { isLoading(el, false) })
      }
      return ret
    } finally {
      if (!isPromise(ret)) {
        isLoading(el, false)
      }
    }
  }
}

function isPromise (obj) {
  return obj && typeof obj.then === 'function' && typeof obj.catch === 'function'
}

function isLoading (el, arg) {
  if (arg) {
    el.classList.add('is-loading')
    el.disabled = true
  } else {
    el.classList.remove('is-loading')
    el.disabled = false
  }
}
