const cron = require('node-cron')
const express = require('express')
const fs = require('fs')
const Gpio = require('orange-pi-gpio')

const AC1 = new Gpio({ pin: 8 })

function pulsoAC1()
{
  AC1.write(1)
  setTimeout(() => { AC1.write(0) }, 1000)
}

cron.schedule('55 18 * * *', () =>
{
  pulsoAC1()
})