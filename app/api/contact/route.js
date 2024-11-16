import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function POST(req, { params }) {
  const { email, message, name, subject, téléphone } = await req.json();

  try {
    var transporter = nodemailer.createTransport({
      host: 'ssl0.ovh.net',
      port: 587,
      auth: {
        user: 'commandes@flormar.ma',
        pass: 'h)T_-h!i9LpU2Fe7GV]66e,(D29a',
      },
    });

    const to = 'info@flormar.ma';

    var mailOptions = {
      from: email,
      to,
      subject: subject,
      text: `
      Email :           ${email}
      Nom et prénom :   ${name}
      Subject :         ${subject}
      Message :         ${message}
      Téléphone :       ${téléphone}
      `,
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return reject(error);
        } else {
          console.log('Email Sent');
          return resolve('');
        }
      });
    });
    console.log('Email Sent');
    return Response.json({ message: 'Email Sent' });
  } catch (error) {
    return Response.json({ error: error?.message }, { status: 500 });
  }
}
