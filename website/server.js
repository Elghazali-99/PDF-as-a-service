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
        const pdf = await mdToPdf({ content: mdContent },{ dest: './output.pdf' }).catch(console.error);
        
        if(pdf){
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename=converted.pdf');
          res.send(pdf.content);
          return
        } else{
          res.send("Bad markdown code. Could not create pdf.")
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