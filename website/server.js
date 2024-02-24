const express = require('express');
const {mdToPdf} = require('md-to-pdf');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()) 
app.use(express.static(path.join(__dirname)));



app.post('/convert', async(req, res) => {
    try {
        const mdContent = req.body.mdContent; 
        const pdf = await mdToPdf({ content: mdContent }).catch(console.error);
        
        if(pdf){
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename=converted.pdf');
          res.send(pdf.content);
          return
        } else{
          const errorMessage = "Bad markdown code.";
          const errorPdf = await mdToPdf({ content: errorMessage }).catch(console.error);
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename=converted.pdf');
          res.send(errorPdf.content);
          return
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});