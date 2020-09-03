const React = require('react')

const CompLibrary = require('../../core/CompLibrary.js')

const Container = CompLibrary.Container

function WmReferrer (props) {
  const [ paymentPointer, setPaymentPointer ] = React.useState('')
  const [ paymentPointerEntered, setPaymentPointerEntered ] = React.useState(false)
  const [ url, setUrl ] = React.useState('')

  console.log('rendering. paymentPointerEntered=' + paymentPointerEntered)

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer metaTagContainer">
        <header className="postHeader">
          <h1>Web Monetized Referrers</h1>
        </header>

        <p>
          Some web monetized sites will share their revenue with you if you
          include your payment pointer in the URL when you link to them.
        </p>

        <p>
          This tool lets you easily include your payment pointer when linking
          to people's sites, so you can take advantage of this more easily. Enter your
          payment pointer, and then you can either add it to a single link or create a
          bookmarklet to easily link to any site.
        </p>

        <form id="paymentPointerForm" onSubmit={(ev) => {
          console.log('got form submit')
          ev.preventDefault()
          setPaymentPointerEntered(true)
        }}>
          <input
            className="paymentPointerInput"
            type="text"
            placeholder="$YourPaymentPointer"
            value={paymentPointer}
            onChange={(ev) => setPaymentPointer(ev.target.value)}
          />
          <button id="generateButton" type="button" onClick={(ev) => {
            ev.preventDefault()
            setPaymentPointerEntered(true)
          }}>Continue</button>

          {paymentPointerEntered && <input
            className="paymentPointerInput"
            type="text"
            placeholder="Your outgoing link"
            value={url}
            onChange={(ev) => setUrl(ev.target.value)}
          />}
        </form>
        <div className="metaTagOutput">
          <p>
            To monetize your website add the following &lt;meta&gt; tag to the &lt;head&gt; section of all pages on your website.
          </p>
        </div>
      </Container>
    </div>
  )
}

module.exports = WmReferrer
