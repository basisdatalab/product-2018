const express = require('express')
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect('mongodb://helmisatria:password123@ds036967.mlab.com:36967/product-trial', { useNewUrlParser: true }, (error) => {
  if (error) {
    console.log('Ada error euy')
    return
  }

  console.log('Berhasil connect ke DB')
})

const Mahasiswa = mongoose.model('Mahasiswa', {
  nama: String,
  nim: String
})

// ini buat render file ejs
app.set('view engine', 'hbs');

// ini buat change default folder views
app.set("views", path.join(__dirname, "halamans"));

app.get('/', (req, res) => {
  
  let variabel = {
    us: 'Ini dari variabel'
  }

  // 
  res.render('index', variabel)
})

app.get('/mahasiswa', (req, res) => {
  Mahasiswa
  .find() // SELECT * FROM MAHASISWA
  .then((allMahasiswa) => { // KALAU GA ERROR, allMahasiswa itu hasil SELECT nya
    res.send(allMahasiswa)
  })
  .catch(error => { // KALAU ERROR, variabel error akan ada valuenya
    res.send(error)
  })
})

app.get('/mahasiswa/baru', (req, res) => {
  // Get semua mahasiswa
  // Tampilin di mahasiswaBaru.ejs
  Mahasiswa
    .find()
    .then(allMahasiswa => {
      console.log(allMahasiswa)
      res.render('mahasiswaBaru', {
        mhs: allMahasiswa
      })
    })
    .catch((error) => {
      res.send(error)
    })
})

// Create Mahasiswa
app.post('/mhs', (req, res) => {
  console.log(req.body)

  Mahasiswa.create({
    nama: req.body.namaMhs
  })
  .then((hasil) => {
    console.log(hasil)
    res.redirect('/mahasiswa')
  })
  .catch((error) => {
    console.log(error);
  })
})

app.get('*', (req, res) => {
  res.send('Page tidak ketemu')
})

app.listen(8000, () => {
  console.log('8000')
})