const cron = require('node-cron')
const express = require('express')
const fs = require('fs')
const Gpio = require('orange-pi-gpio')
const data = JSON.parse(fs.readFileSync('times.json', 'utf-8'))

const app = new express()

// const AC1 = new Gpio({ pin: 8 })
// const AC2 = new Gpio({ pin: 9 })

const cronjobs = []
const jobs = []
let id = 0

function pulsoAC1() {
  // AC1.write(0)
  console.log('Pulso AC1: ' + Date())
  // setTimeout(() => { AC1.write(1) }, 1000)
  data.ACs.AC1.status = !data.ACs.AC1.status
}

function pulsoAC2() {
  // AC2.write(0)
  console.log('Pulso AC2: ' + Date())
  // setTimeout(() => { AC2.write(1) }, 1000)
  data.ACs.AC2.status = !data.ACs.AC2.status
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

app.listen(80)