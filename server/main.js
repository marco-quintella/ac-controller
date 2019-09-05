const cron = require('node-cron')
const express = require('express')
const fs = require('fs')
const Gpio = require('orange-pi-gpio')
const cors = require('cors')
const data = JSON.parse(fs.readFileSync('times.json', 'utf-8'))

const app = new express()
app.use(cors())

const AC1 = new Gpio({ pin: 8 })
const AC2 = new Gpio({ pin: 9 })

const cronjobs = []
const jobs = []
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

data.days.forEach(obj => {
  obj.hours.forEach(hour => {
    const string = `${hour.time} * * ${obj.day}`
    console.log('Schedulling ' + string)
    cronjobs.push(cron.schedule(string, () => {
      data.ACs.AC1.status !== hour.AC1 && pulsoAC1()
      data.ACs.AC2.status !== hour.AC2 && pulsoAC2()
    }))
    jobs.push({ id: id, string: string })
    id++
  })
})

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

app.get('/editar', function (req, res) {
  const editarId = req.params.job.id
  jobs[editarId] = req.params.job
  cronjobs[editarId].stop()
  cronjobs[editarId] = cron.schedule(
    req.params.job.string,
    () => {
      data.ACs.AC1.status !== hour.AC1 && pulsoAC1()
      data.ACs.AC2.status !== hour.AC2 && pulsoAC2()
    }
  )
  cronjobs[editarId].start()
  console.log('Schedulling ' + req.params.job.string)
  const dados = req.params.job.string.split(' ')
  const dia = dados.days.filter(day => day.day === dados[4])
  res.send(dia)
})

app.get('/excluir', function (req, res) {
  const editarId = req.params.job.id
  cronjobs[editarId].destroy()
})

app.listen(80)