const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
async function sendNonAuthConsignmentMail(user, consignment_name, qty) {
  console.log(user, consignment_name, qty);
  const msg = {
    to: user.email, // Change to your recipient
    from: "team@phirlo.in", // Change to your verified sender
    subject: `Welcome to Phirlo | ‘${consignment_name}‘ Pickup Requested`,

    html: `


    <h1>Hey ${user.name}</h1>

Your Phirlo account has been created. You can login with the following credentials:<br/>
Email: ${user.email}<br/>
Password: ${user.password}


    <p>
    Your pickup request on Phirlo for the consignment name is   '${consignment_name}'  is received. <br/>
    <br/>
    
    Someone from Team Phirlo will contact you regarding the consignment. Request you to pack 
    aside your ${qty} clothes for the pickup.
    <br/>
    <br/>



We look forward to your consignment 😃 <br/><br/>


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
