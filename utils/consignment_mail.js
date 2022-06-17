const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
async function sendConsignmentEmail(email, name) {
  const msg = {
    to: email, // Change to your recipient
    from: "team@phirlo.in", // Change to your verified sender
    subject: "Phirlo - Consignments Updates",
    text: `
        Hi ${name}, Your consignment is submitted to Phirlo. Store current status of your consignment is Pending,
        `,
    html: `
    Hi ${name}, Your consignment is submitted to Phirlo. Store current status of your consignment is Pending,
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

module.exports = sendConsignmentEmail;
