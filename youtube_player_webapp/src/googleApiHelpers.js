function collectGoogleApiListResults ({ collectionArray, apiFn, params, errorCallback, sucessfullCompletionCallback, pageToken }) {
  if (typeof (pageToken) !== 'undefined') {
    params.pageToken = pageToken
  }
  params.maxResults = 50
  const request = apiFn(params)
  const successFunction = function (resp) {
    collectionArray.push(resp.result.items)
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
