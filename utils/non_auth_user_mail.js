const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
async function sendNonAuthConsignmentMail(user) {
  const msg = {
    to: user.email, // Change to your recipient
    from: "team@phirlo.in", // Change to your verified sender
    subject: `Welcome to Phirlo ${user.name}`,

    html: `


    <h1>Hey ${user.name}</h1>

Your Phirlo account has been created. You can login with the following credentials:<br/>
Email: ${user.email}<br/>
Password: ${user.password}



For assistance, please write back or dial 7338112475.<br/><br/>

Shop More | Waste Less<br/>

Team Phirlo
    </p>
    `,
  };
  try {
    let is_sent = await sgMail.send(msg);
    return is_sent;
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = sendNonAuthConsignmentMail;
