function collectGoogleApiListResults ({ collectionArray, apiFn, params, errorCallback, sucessfullCompletionCallback, pageToken }) {
  if (typeof (pageToken) !== 'undefined') {
    params.pageToken = pageToken
  }
  params.maxResults = 50
  const request = apiFn(params)
  const successFunction = function (resp) {
    resp.result.items.map(function (item) {
      collectionArray.push(item)
      return ''
    })
    if (typeof (resp.result.nextPageToken) === 'undefined') {
      sucessfullCompletionCallback()
      return
    }
    collectGoogleApiListResults({
      collectionArray,
      apiFn,
      params,
      errorCallback,
      sucessfullCompletionCallback,
      pageToken: resp.result.nextPageToken
    })
  }
  request.then(successFunction, errorCallback)
}

export default {
  collectGoogleApiListResults
}
