const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const markdownpdf = require('md-to-pdf');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/convert', (req, res) => {
    const markdownContent = req.body.markdownContent;

    // Create a temporary Markdown file
    fs.writeFileSync('temp.md', markdownContent);

    // Convert the Markdown file to PDF using markdown-pdf
    markdownpdf()
        .from('temp.md')
        .to('temp.pdf', function () {
            // Send the generated PDF to the client
            res.download('temp.pdf', 'Markdown-to-PDF.pdf', () => {
                // Cleanup temporary files after the download is complete
                fs.unlinkSync('temp.md');
                fs.unlinkSync('temp.pdf');
            });
        });
});

const port = 3000;

// Serve the index.html file as the default landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});