import { merge } from 'lodash'
// import fetch from 'isomorphic-fetch'

/**
 * Wrapper around `fetch` to query a JSON resource.
 *
 * @param {string} method - The HTTP method ("GET", "POST", "PUT", "DELETE" ...)
 * @param {string} url - The URL to query
 * @param {object} additionalInit - Additional parameters to pass to `fetch`
 */
export function fetchJson (method, url, additionalInit = {}) {
  const init = {
    method: method,
    headers: {
      Accept: 'application/json'
    }
  }

  merge(init, additionalInit)

  return fetch(url, init).then(data => {
    if (data.status >= 200 && data.status < 300) return data.json()
    throw data
  })
  .catch(err => { throw err })
}

/**
 * Call `fetchJson` with a JSON dict.
 *
 * @param {string} method - Same as in `fetchJson`
 * @param {string} url - Same as in `fetchJson`
 * @param {object} body - A JSON serializable object
 * @param {object} additionalInit - Same as in `fetchJson`
 *
 * @see {@link superFetch}
 */
export function fetchJsonWithBody (method, url, body, additionalInit = {}) {
  const init = {
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    }
  }

  merge(init, additionalInit)

  return fetchJson(method, url, init)
}
