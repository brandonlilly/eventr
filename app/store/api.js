const CALL_API = 'CALL_API'

export const callApi = ({ type, url, method = 'get', data, ...rest }) => ({
  [CALL_API]: {
    ...rest, type, method, data, url
  }
})

const apiMiddleware = store => next => action => {
  if (!action[CALL_API]) {
    return next(action)
  }

  let { url, type, method, data, ...rest } = action[CALL_API]

  if (typeof url === 'function') {
    url = url(store.getState())
  }

  const ACTION_REQUEST = type + '_REQUEST'
  const ACTION_SUCCESS = type + '_SUCCESS'
  const ACTION_FAILURE = type + '_FAILURE'

  const newAction = obj => next({ ...rest, ...obj })

  newAction({ type: ACTION_REQUEST })
  fetch(url, { method: 'post', body: data })
    .then(response => {
      response.text()
        .then(data => {
          newAction({
            type: response.ok ? ACTION_SUCCESS : ACTION_FAILURE,
            response: data || response.statusText
          })
        })
        .catch(error => {
          newAction({ type: ACTION_FAILURE, response: 'Save failed' })
        })
    })
    .catch(error => {
      newAction({ type: ACTION_FAILURE, response: 'Save failed' })
    })
}

export default apiMiddleware
