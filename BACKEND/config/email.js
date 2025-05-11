const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  secure:true,

  host: 'smtp.gmail.com',

  port:465,

  auth: {
    user: 'terminator.terminate2024@gmail.com', 
    pass: 'wlcookumpvjpllba', 
  },

});

module.exports = transporter;
