function readAs (file, options, as) {
  options = options || {};
  if (!(file instanceof Blob)) {
    throw new TypeError('Must be a File or Blob')
  }
  return new Promise(function(resolve, reject) {
    var reader = new FileReader()
    reader.onload = function(e) { resolve(e.target.result) }
    reader.onerror = function(e) { reject(new Error('Error reading' + file.name + ': ' + e.target.result)) }
    if (options.progress) {
      reader.onprogress = options.progress
    }
    reader['readAs' + as](file)
  })
}

function readAsDataURL (file, options) {
  return readAs(file, options, 'DataURL')
}

function readAsText (file, options) {
  return readAs(file, options, 'Text')
}

function readAsArrayBuffer (file, options) {
  return readAs(file, options, 'ArrayBuffer')
}

module.exports = {
  readAsDataURL: readAsDataURL,
  readAsText: readAsText,
  readAsArrayBuffer: readAsArrayBuffer,
}
