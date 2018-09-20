const express = require('express')
const path = require('path');
const mongoose = require('mongoose');

const app = express()

mongoose.connect('mongodb://helmisatria:password123@ds036967.mlab.com:36967/product-trial', { useNewUrlParser: true }, (error) => {
  if (error) {
    console.log('Ada error woy!');
    return
  }
  console.log('Berhasil connect ke db! Horee');
});

const Cat = mongoose.model('Cat', { name: String });

// ini buat render file ejs
app.set('view engine', 'ejs');

// ini buat change default folder views
app.set("views", path.join(__dirname, "halamans"));

// app.get
app.get('/cihuy', (req, res) => {
  const variabelKirim = "Bams 123"

  console.log(variabelKirim);
  

  Cat.create({ name: 'KOCHEEENG' }, (err, result) => {
    if (err) {
      console.log('====================================');
      console.log(err);
      console.log('====================================');
    }

    console.log(result);
    
  }
  )

  
  res.render('cihuy.ejs', {
    iniVarDiFrontend: variabelKirim,
    cobalagi: 'Holaaa!',
    perlihatkan: false,
    list: [1, 3, 5, 7, 9]
  })
})



app.get('/json', (request, response) => {
  // res.send('Halo basdat!')
  const objek = {
    nama: 'Hevyka',
    topik: 'Product'
  }
  
  response.send("objek")
})

app.get('/hevyka', (req, res) => {
  res.send('Halo Hevyka')
})

app.get('/products', (req, res) => {
  res.send('Hoam')
})

app.get('/products/:cobaja', (req, res) => {
  const apaya = req.params.cobaja
  
  res.send('Ini halaman product: ' + apaya)
  // perintah, query database, proses
})

app.get('*', (req, res) => {
  res.send('Page tidak ketemu')
})

app.listen(8000, () => {
  console.log('8000')
})

function namaFunction() {

}

const namaFunction2 = () => {
  
}