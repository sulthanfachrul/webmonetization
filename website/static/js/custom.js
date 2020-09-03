window.addEventListener('load', function () {
  var clipboard = new ClipboardJS('.btnClipboard', {
    target: function (trigger) {
      return trigger.parentNode
    }
  })

  clipboard.on('success', function (event) {
    event.clearSelection()
  })
  navigator.serviceWorker.register('/service-worker.js')
})

// From mozilla
String.prototype.quote = (function(){
  // prepare fallback
  // ----------------
  // backslash escape double quotes and backslashes
  var escp_regex = /[\\"]/g,
    escp_callback = '\\$&',
    // escape control characters
    ctrl_map = {
      '\b': '\\b', // backspace
      '\t': '\\t', // tab
      '\n': '\\n', // new line
      '\f': '\\f', // form feed
      '\r': '\\r'  // carriage return
    },
    // don't rely on `Object.keys(ctrl_map).join('')`
    ctrl_regex = new RegExp('[\b\t\n\f\r]', 'g'),
    ctrl_callback = function(match){
      return ctrl_map[match];
    },
    // hex-escape, spare out control characters and ASCII printables
    // [0-7,11,14-31,127-255]
    xhex_regex = /[\x00-\x07\x0B\x0E-\x1F\x7F-\xFF]/g,
    xhex_callback = function(match, char_code){
      char_code = match.charCodeAt(0);
      return '\\x' + (char_code < 16 ? '0' : '') + char_code;
    },
    // hex-escape all others
    uhex_regex = /[\u0100-\uFFFF]/g,
    uhex_callback = function(match, char_code){
      char_code = match.charCodeAt(0);
      return '\\u' + (char_code < 4096 ? '0' : '') + char_code;
    },
    // delegate to native `JSON.stringify` if available
    stringify = typeof JSON !== 'undefined' && JSON.stringify;

  // return actual polyfill
  // ----------------------
  return function(){
    var self = this; // promote compression
    if(self == null) throw new TypeError('can\'t convert ' + self + ' to object');
    if(stringify) return stringify(self);
    return '"' + self
      .replace(escp_regex, escp_callback)
      .replace(ctrl_regex, ctrl_callback)
      .replace(xhex_regex, xhex_callback)
      .replace(uhex_regex, uhex_callback) + '"';
  }
}());

function setpp (event) {
  event.preventDefault()
  var pp = event.target[0].value
  if (pp[0] !== '$' || pp.indexOf('=') !== -1 || pp.indexOf('+') !== -1) return
  var url = new URL(pp.replace(/^\$/, 'https://'))
  document.getElementById('pp').textContent = event.target[0].value
}

function toggleUrlInputVisibility (event) {
  document.getElementById('urlInputContainer').classList.toggle('displayNone')
  document.getElementById('referrerOutput').classList.add('displayNone')

  const checked = event.target.checked
  document.getElementById('generateButton').innerText = checked
    ? 'Generate Bookmarklet'
    : 'Generate Link'
}

function inputChanged () {
  document.getElementById('referrerOutput').classList.add('displayNone')
}

function generateReferrerLink (event) {
  event.preventDefault()

  const generateBookmarklet = document.getElementById('generateBookmarklet').value
  const paymentPointer = document.getElementById('paymentPointerInput').value

  const outputElem = document.getElementById('referrerOutput')
  outputElem.classList.remove('displayNone')

  const outputText = document.getElementById('referrerOutputText')
  const outputLink = document.getElementById('referrerOutputLink')

  if (generateBookmarklet) {
    outputText.innerText = 'Drag this link to your bookmarks bar (or right click this link and bookmark it) to install the bookmarklet. Click it while you\'re on any page to generate a link to the page including your wmref'    
    outputLink.href = `javascript:(function(){
      const url = new URL(window.location.href);
      const search = new URLSearchParams(window.location.search);
      search.append('wmref', ${paymentPointer.quote()});
      url.search = search.toString();
      alert(url.href);
    })()`
    outputLink.innerText = 'Generate WM Referrer Link'
  } else {
    outputText.innerText = 'Share this version of the link below in order to get a share of the Web Monetization revenue you refer. The site must support this feature by detecting the "wmref" parameter.'

    inputLink = document.getElementById('urlInput').value

    try {
      const url = new URL(inputLink)
    } catch (e) {
      console.error(e)
    }
    outputLink.innerText = 'WM Referrer Link'
  }
}
