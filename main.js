const cron = require('node-cron')
const express = require('express')
const fs = require('fs')
const Gpio = require('orange-pi-gpio')
const data = JSON.parse(fs.readFileSync('times.json', 'utf-8'))

const AC1 = new Gpio({ pin: 8 })
const AC2 = new Gpio({ pin: 9 })

function pulsoAC1()
{
  AC1.write(1)
  console.log('Pulso AC1: ' + Date())
  setTimeout(() => { AC1.write(0) }, 1000)
  data.ACs.AC1.status = !data.ACs.AC1.status
}

function pulsoAC2()
{
  AC2.write(1)
  console.log('Pulso AC2: ' + Date())
  setTimeout(() => { AC2.write(0) }, 1000)
  data.ACs.AC2.status = !data.ACs.AC2.status
}

data.days.forEach(obj =>
{
  obj.hours.forEach(hour =>
  {
    console.log(`Schedulling ${ hour.time } * * ${ obj.day }`)
    cron.schedule(`${ hour.time } * * ${ obj.day }`, () =>
    {
      data.ACs.AC1.status !== hour.AC1 && pulsoAC1()
      data.ACs.AC2.status !== hour.AC2 && pulsoAC2()
    })
  })
})

cron.schedule('25 14 * * *', () =>
{
  console.log('14:25')
  pulsoAC1()
  pulsoAC2()
})