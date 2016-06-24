// callApi({
//   type: 'SAVE_TEMPLATE',
//   data: template,
//   url: '/template',
//   method: 'post',
// })

const CALL_API = 'CALL_API'

export function callApi({ types, url, method = 'get', data }) => ({
  CALL_API: {
    types, method, data, url
  }
})

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300 && response.ok) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export default apiMiddleware = store => next => rawAction => {
  const apiAction = rawAction[CALL_API]

  if (!apiAction) {
    return next(action)
  }

  let { url, type, method, data, ...rest } = apiAction

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
      response.text().then(data => {
        newAction({
          type: response.ok ? ACTION_SUCCESS : ACTION_FAILURE,
          response: data || response.statusText
        })
      }).catch(error => {
        newAction({ type: ACTION_FAILURE, response: error })
      })
    })
    .catch(error => {
      newAction({ type: ACTION_FAILURE, response: error })
    }
}
