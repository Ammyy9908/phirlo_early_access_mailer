const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
async function sendResetPasswordLink(email, token) {
  const msg = {
    to: email, // Change to your recipient
    from: "team@phirlo.in", // Change to your verified sender
    subject: `Welcome to Phirlo | Your Password Reset Link`,
    text: `Hey Phirlo User/n

    Your Password Reset Link is here.

    <a href="http://localhost:3000/reset_password?email=${email}&token=${token}" target="_blank">Reset Password</a>

/n

For assistance, please write back or dial 7338112475.

/n

*Shop More | Waste Less*

*Team Phirlo*





        `,
    html: `
    <h1>Hey Phirlo User</h1>


    <p>
    Your Password Reset Link is here. <br/>
    <br/>
    
    <a href="http://localhost:3000/reset_password?email=${email}&token=${token}" target="_blank">Reset Password</a>
    <br/>
    <br/>






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

module.exports = sendResetPasswordLink;
