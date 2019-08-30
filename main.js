const cron = require('node-cron')
const express = require('express')
const fs = require('fs')
const Gpio = require('orange-pi-gpio')

const AC1 = new Gpio({
  pin: 8, ready: () =>
  {
    let value = 0
    setTimeout(() =>
    {
      console.log(value ? 'Ligando' : 'Desligando' + ' AC 1')
      AC1.write(value)
      value = +!value
    }, 50)
  }
})