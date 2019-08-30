const cron = require('node-cron')
const express = require('express')
const fs = require('fs')
const Gpio = require('orange-pi-gpio')

let gpio5 = new Gpio({
  pin: 5, mode: 'out', ready: function ()
  {
    let value = 1
    setInterval(function ()
    {
      gpio5.write(value)
      value = +!value
    }, 50)
  }
})