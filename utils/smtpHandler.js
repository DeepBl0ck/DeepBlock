'use strict'
const Mailgen = require('mailgen');
const server = require("@config/server");
const nodemailer = require("nodemailer");
const { admin_email } = require("@config/email");
const smtpTransporter = require("nodemailer-smtp-transport");

module.exports = {
  mail(user_email, url) {
    const mailGenerator = new Mailgen({
      theme: 'salted',
      product: {
        // Appears in header & footer of e-mails
        name: 'DeepBlock',
        link: `http://${server.ip}:${server.port}`
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
      }
    });

    const email = {
      body: {
        name: "Thank you for sign up our service~",
        intro: 'Welcome to DeepBlock!!',
        action: {
          instructions: 'To verify your email, please click here',
          button: {
            color: '#3F51B5', // Optional action button color
            text: 'Confirm your account',
            link: url
          }
        },
        outro: 'Need help, or have questions?\nJust reply to this email, we\'d love to help.'
      }
    };

    const email_html = mailGenerator.generate(email);
    const mailOptions = {
      from: admin_email.id,
      to: user_email,
      subject: "DeepBlock - 이메일 인증을 해주세요",
      html: email_html
    };

    const smtpTransport = nodemailer.createTransport(
      smtpTransporter({
        service: admin_email.service,
        auth: {
          user: admin_email.id,
          pass: admin_email.pw,
        },
      })
    );

    smtpTransport.sendMail(mailOptions, (e, info) => {
      if (!e) {
        smtpTransport.close();
      }
    });
  },

  id(email, id) {
    const mailGenerator = new Mailgen({
      theme: 'salted',
      product: {
        // Appears in header & footer of e-mails
        name: 'DeepBlock',
        link: `http://${server.ip}:${server.port}`
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
      }
    });

    const email_id = {
      body: {
        name: "This is the result of finding your ID!",
        intro: id,
        outro: 'Need help, or have questions?\nJust reply to this email, we\'d love to help.'
      }
    };

    const email_html = mailGenerator.generate(email_id);
    const mailOptions = {
      from: admin_email.id,
      to: email,
      subject: "DeepBlock - 아이디 찾기 결과",
      html: email_html
    };

    const smtpTransport = nodemailer.createTransport(
      smtpTransporter({
        service: admin_email.service,
        auth: {
          user: admin_email.id,
          pass: admin_email.pw,
        },
      })
    );

    smtpTransport.sendMail(mailOptions, (e, info) => {
      if (!e) {
        smtpTransport.close();
      }
    });
  },

  password(email, password) {
    const mailGenerator = new Mailgen({
      theme: 'salted',
      product: {
        // Appears in header & footer of e-mails
        name: 'DeepBlock',
        link: `http://${server.ip}:${server.port}`
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
      }
    });

    const email_password = {
      body: {
        name: "This is your temporary password!",
        intro: password,
        outro: 'Need help, or have questions?\nJust reply to this email, we\'d love to help.'
      }
    };

    const email_html = mailGenerator.generate(email_password);
    const mailOptions = {
      from: admin_email.id,
      to: email,
      subject: "DeepBlock - 비밀번호 찾기 결과입니다",
      html: email_html
    };

    const smtpTransport = nodemailer.createTransport(
      smtpTransporter({
        service: admin_email.service,
        auth: {
          user: admin_email.id,
          pass: admin_email.pw,
        },
      })
    );

    smtpTransport.sendMail(mailOptions, (e, info) => {
      if (!e) {
        smtpTransport.close();
      }
    });
  }
}