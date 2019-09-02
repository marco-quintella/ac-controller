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
  console.log('Pulso AC1')
  setTimeout(() => { AC1.write(0) }, 1000)
  data.ACs.AC1.status = !data.ACs.AC1.status
}

function pulsoAC2()
{
  AC2.write(1)
  console.log('Pulso AC2')
  setTimeout(function () { AC2.write(0) }, 1000)
  data.ACs.AC2.status = !data.ACs.AC2.status
}

for (let i = 0; i < data.days.length; i++)
{
  const obj = data.days[i]
  for (let j = 0; i < obj.hours.length; j++)
  {
    const hour = obj.hours[j]
    console.log(`Schedulling ${ hour.time } * * ${ obj.day }`)
    cron.schedule(`${ hour.time } * * ${ obj.day }`, function ()
    {
      data.ACs.AC1.status !== hour.AC1 && pulsoAC1()
      data.ACs.AC2.status !== hour.AC2 && pulsoAC2()
    })
  }
}


cron.schedule('52 13 * * *', function ()
{
  pulsoAC1()
})
