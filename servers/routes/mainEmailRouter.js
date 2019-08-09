//========================================== dependencies ==========================================
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

//============================================ endpoints ===========================================
router.get('/', (req, res, next) =>{
  const msg = "Route for the main email"

  try{
    res.status(200).json({msg});
  } catch(err) {
    next(err);
  }
});

router.post('/send', async (req, res, next) => {
  const { name, sendtype, email, subject, message } = req.body;
  try {
    let subjectPortfolio = subject;
    if(sendtype === "portfolio"){
      subjectPortfolio = "(Portfolio) " + subject;
    }

    // send email here
    const htmlEmail = `
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${name}</li>
        <li>Name: ${email}</li>
        <li>Name: ${subject}</li>
      </ul>
      <h3>Message</h3>
      <p>${message}</p>
    `;

    // for more info -> https://ourcodeworld.com/articles/read/264/how-to-send-an-email-gmail-outlook-and-zoho-using-nodemailer-in-node-js
    let transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_MAIN_EMAIL_HOST, // smtp-mail.outlook.com for outlook
      port: process.env.NODEMAILER_MAIN_EMAIL_PORT,
      secure: false, // true for 465, false for all other ports || try "secureConnection: false, tls: {ciphers: SSLv3}," for outlook
      auth: {
        user: process.env.NODEMAILER_MAIN_EMAIL_USER, // generated ethereal user
        pass: process.env.NODEMAILER_MAIN_EMAIL_PASS // generated ethereal password
      }
    });

    let mailOptions = {
      from: name,
      to: process.env.NODEMAILER_MAIN_EMAIL_USER,
      replyTo: email,
      subject: subjectPortfolio,
      text: message,
      html: htmlEmail
    };

    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: ', info.message);
    console.log('Message URL: ', nodemailer.getTestMessageUrl(info));

    res.status(201).json({msg: 'success'});
  } catch(err) {
    next(err);
  }
});

// router.post('/log-back-in/:user_id', authenticate, async (req, res) => {

//============================================= export =============================================
module.exports = router;
