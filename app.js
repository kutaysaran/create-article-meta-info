const express = require('express')
const { fetchSummaryFromWikipedia,fetchMetaTags } = require('./fetchMethods')
const app = express()
const port = 3000
const multer  = require('multer')
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/create-article-tags/:title', async (req, res) => {
  
  try {
    const title = req.params.title
    const response = await fetchSummaryFromWikipedia(title)
    
    if (response.error) {
      res.send('Hata oluştu.')
    } else {
      const get_meta_tags = await fetchMetaTags(response.extract)
      if (get_meta_tags.error) {
        res.send('Cant get meta tags')
      } else {
        res.send()
      }
    }
    
  } catch (error) {
    console.log(error)
  }
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

