import nodemailer from 'nodemailer';
const{ EMAIL_USER, EMAIL_PASS } = process.env

export const sendEmail = async () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth : {
      user :  EMAIL_USER,
      pass : EMAIL_PASS
    }
  });

  const options = {
    from : EMAIL_USER,
    to : 'layyagami9@gmail.com',
    subject : '',
    text : 'iniciaste sesion'
  }

  try {
   const send = await transporter.sendMail(options);
  } catch (error) {
    console.log(error)
  }
}

