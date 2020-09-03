const React = require('react')

const CompLibrary = require('../../core/CompLibrary.js')

const Container = CompLibrary.Container

const scriptTag = `
  document.getElementById('referrerParamsForm').onsubmit = generateReferrerLink
  document.getElementById('generateBookmarklet').onclick = toggleUrlInputVisibility
  document.getElementById('generateBookmarklet').checked = false
  document.getElementById('paymentPointerInput').onchange = inputChanged
  document.getElementById('urlInput').onchange = inputChanged
`

function WmReferrer (props) {
  const { config: siteConfig } = props
  const { baseUrl } = siteConfig

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer metaTagContainer">
        <header className="postHeader">
          <h1>Web Monetized Referrer Tools</h1>
        </header>

        <p>
          Some web monetized sites will share their revenue with you if you
          include your payment pointer in the URL when you link to them.
        </p>

        <p>
          This tool lets you easily include your payment pointer when linking
          to people's sites, so you can take advantage of this more easily.
        </p>

        <h2>How to use this tool</h2>

        <p>
          Enter your payment pointer and a URL, and it will create a web monetized
          referral link. If the page you're linking to supports web monetized referrals,
          you'll get a cut of the revenue when people use your link.
        </p>

        <p>
          To easily generate web monetized referral links for lots of sites,
          check the 'generate bookmarklet' box. Install the bookmarklet and click it in
          your bookmarks bar to generate a web monetized referral link for any site
          you're visiting.
        </p>

        <form id="referrerParamsForm">
          <div className="referrerField">
            <label htmlFor="generateBookmarklet">Generate bookmarklet?</label>
            <input id="generateBookmarklet" type='checkbox' defaultChecked={false}/>
          </div>

          <div className="referrerField">
            <label htmlFor="paymentPointerInput">Payment Pointer</label>
            <br />
            <input
              id="paymentPointerInput"
              className="paymentPointerInput"
              type="text"
              placeholder="$YourPaymentPointer"
            />
          </div>

          <div id="urlInputContainer" className="referrerField">
            <label htmlFor="urlInput">URL</label>
            <br />
            <input
              id="urlInput"
              className="paymentPointerInput"
              type="text"
              placeholder="http://example.com"
            />
          </div>

          <div className="referrerField">
            <button id="generateButton" style={{ marginLeft: '0px' }}>Generate Link</button>
          </div>
        </form>
        <script dangerouslySetInnerHTML={{
          __html: scriptTag
        }} />
        <div id="referrerOutput" className="displayNone referrerOutput">
          <p id="referrerOutputText"></p>
          <a id="referrerOutputLink"></a>
        </div>
      </Container>
    </div>
  )
}

module.exports = WmReferrer
