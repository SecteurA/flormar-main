import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function POST(req, { params }) {
  const { subject, data, files } = await req.json();

  try {
    var transporter = nodemailer.createTransport({
      host: 'ssl0.ovh.net',
      port: 587,
      auth: {
        user: 'commandes@flormar.ma',
        pass: 'h)T_-h!i9LpU2Fe7GV]66e,(D29a',
      },
    });
    let html = `


    `;

    const to = files ? 'recrutement@flormar.ma' : 'wholesale@flormar.ma';
    console.log(to);

    Object.keys(data).map(
      (k, i) =>
        (html += `<tr>
                    <td style='border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;font-weight:700  ; background-color: ${
        i % 2 ? ' #FFFFFF' : '#f8d7de50'
      }'>${k}</td> 
                    <td style='border: 1px solid #dddddd;
      text-align: left;
      padding: 8px; background-color: ${i % 2 ? ' #FFFFFF' : '#f8d7de50'}'>${
          data[k]
        }</td>
                  </tr>\n`)
    );
    var mailOptions = {
      from: 'commandes@flormar.ma',
      to,
      subject: subject,
      html: `
          <h1 style=" color:#000000;">
          ${subject}
          </h1>
      <table  style=' font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%; color:#000000' > 
      ${html} 
      
      </table>`,
      attachments: files?.map((file) => ({
        filename: file?.name,
        content: file?.data?.split('base64,')[1],
        encoding: 'base64',
      })),
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
