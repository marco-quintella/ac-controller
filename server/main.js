const cron = require('node-cron')
const express = require('express')
const fs = require('fs')
const Gpio = require('orange-pi-gpio')
const cors = require('cors')
let data = JSON.parse(fs.readFileSync('times.json', 'utf-8'))

const app = new express()
app.use(cors())

const AC1 = new Gpio({ pin: 8 })
const AC2 = new Gpio({ pin: 9 })

let cronjobs = []
let jobs = []
let id = 0

function pulsoAC1() {
  AC1.write(0)
  console.log('Pulso AC1: ' + Date())
  setTimeout(() => { AC1.write(1) }, 1000)
  data.ACs.AC1.status = !data.ACs.AC1.status
  fs.writeFile('times.json', JSON.stringify(data), 'utf-8', function (error) {
    console.log(error ? 'Erro ao gravar aquivo de AC 1: ' + error : 'AC 1 operado com sucesso')
  })
}

function pulsoAC2() {
  AC2.write(0)
  console.log('Pulso AC2: ' + Date())
  setTimeout(() => { AC2.write(1) }, 1000)
  data.ACs.AC2.status = !data.ACs.AC2.status
  fs.writeFile('times.json', JSON.stringify(data), 'utf-8', function (error) {
    console.log(error ? 'Erro ao gravar aquivo de AC 2: ' + error : 'AC 2 operado com sucesso')
  })
}

function jobArrayGen () {
  jobs = []
  cronjobs = []
  
  data.days.forEach(obj => {
    obj.hours.forEach(hour => {
      const string = `${hour.time} * * ${obj.day}`
      console.log('Schedulling ' + string)

      cronjobs.push(cron.schedule(string, () => {
        data.ACs.AC1.status !== hour.AC1 && pulsoAC1()
        data.ACs.AC2.status !== hour.AC2 && pulsoAC2()
      }))
      
      jobs.push({ id: id, string: string, AC1: hour.AC1, AC2: hour.AC2 })
      id++
    })
  })
}

jobArrayGen()

cronjobs.forEach(job => {
  job.start()
})

app.get('/data', function (req, res) {
  res.send(data)
})

app.get('/jobs', function (req, res) {
  res.send(jobs)
})

app.get('/operaac1', function (req, res) {
  pulsoAC1()
  res.send(true)
})

app.get('/operaac2', function (req, res) {
  pulsoAC2()
  res.send(true)
})

app.post('/editar', function (req, res) {
  data = req.params.data
  console.log(req.params)
  cronjobs.forEach(job => {
    job.stop()
  })

  jobs = []
  cronjobs = []
  jobArrayGen()
  cronjobs.forEach(job => {
    job.start()
  })

  fs.writeFile('times.json', JSON.stringify(data), 'utf-8', function (error) {
    console.log(error ? 'Erro ao gravar aquivo de edição: ' + error : 'Data editado com sucesso')
  })
  
  res.send(data)
})

app.listen(80)