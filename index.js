const fs = require('fs');
const uuidv4 = require('uuid/v4')
const express = require('express');
const rateLimit = require("express-rate-limit");
const platformsh = require('platformsh-config');

// Require local examples
var pdfs = require("./examples/pdfs.js");
var screenshots = require("./examples/screenshots.js");

// Build the application
var app = express();

// Define static source for css
app.use(express.static(__dirname + '/public'));

// Set rate limits
app.set('trust proxy', 1);
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'This demo permits 10 requests every 5 minutes. <br><br>You can try again later, or you can visit the <a href="https://docs.platform.sh/configuration/services/headless-chrome.html">Headless Chrome documentation</a> to configure the service on your own projects.'
});
// Apply to all requests
app.use(limiter);

// Define the index route content
app.get('/', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(`<html>
<head>
    <title>Headless Chrome on Platform.sh</title>
    <link rel="stylesheet" type="text/css" href="css/style.css" />
</head>
<body>

<h1>Headless Chrome on Platform.sh</h1>

<h2>Generate a PDF of a page (<a href="/pdfs/source">Source</a>)</h2>

<i>I need to generate PDFs of pages.</i></br></br>

Click 'Submit' to generate a PDF of the <a href="https://platform.sh/">Platform.sh website</a>, or paste in another URL.

</br></br>

<form method="get" action="/pdfs/result">
    <input type="text" name="pdfURL" value="https://platform.sh/">
    <input type="submit">
</form>

<h2>Take a screenshot of a page (<a href="/screenshots/source">Source</a>)</h2>

<i>Does my site look like I intended it to?</i></br></br>

Click 'Submit' to create a screenshot of the <a href="https://platform.sh/">Platform.sh website</a>, or paste in another URL.

</br></br>

<form method="get" action="/screenshots/result">
    <input type="text" name="screenshotURL" value="https://platform.sh/">
    <input type="submit">
    </br></br>
    <i>How about on mobile devices?</i>
    </br></br>
    <label class="checkbox"><input type="checkbox" name="emulateMobile" value=true> Emulate mobile device</label><br>
</form>
`);
    res.end(`</body></html>`);
})

// Define PDF result route
app.get('/pdfs/result', async function(req, res){
  // Get URL parameter or create a randomly generated ID number for the current PDF
  var pdfID = (req.query['pdfID']) ? req.query['pdfID'] : uuidv4();
  // Generate the PDF
  await pdfs.makePDF(req.query['pdfURL'], pdfID)
  // Define and download the file
  const file = `pdfs/${pdfID}.pdf`;
  res.download(file);
});

// Define Screenshots result route
app.get('/screenshots/result', async function(req, res){
  // Get URL parameter or create a randomly generated ID number for the current screenshot
  var screenshotID = (req.query['screenshotID']) ? req.query['screenshotID'] : uuidv4();
  // Generate the screenshot
  await screenshots.takeScreenshot(req.query['screenshotURL'], screenshotID, req.query['emulateMobile'])
  // Define and download the file
  const file = `screenshots/${screenshotID}.png`;
  res.download(file);
});

// PDFs source
app.get('/pdfs/source', (req, res) => {
    res.write(fs.readFileSync('./examples/pdfs.js', 'utf8'));
});

// Screenshots source
app.get('/screenshots/source', (req, res) => {
    res.write(fs.readFileSync('./examples/screenshots.js', 'utf8'));
});

// Get PORT and start the server
let config = platformsh.config();
app.listen(config.port, function() {
    console.log(`Listening on port ${config.port}`)
});
