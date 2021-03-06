const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
async function sendConsignmentEmail(email, name, consignment_name, qty) {
  const msg = {
    to: email, // Change to your recipient
    from: "team@phirlo.in", // Change to your verified sender
    subject: `Welcome to Phirlo | Your ${consignment_name} Pickup Requested `,
    text: `Hey ${name}/n

    Your pickup request on Phirlo for the consignment named '${consignment_name}' is received. Someone from Team Phirlo will contact you regarding the consignment. Request you to pack aside ____ clothes for the pickup.

We look forward to your consignment 😃

/n

For assistance, please write back or dial 7338112475.

/n

*Shop More | Waste Less*

*Team Phirlo*





        `,
    html: `
    <h1>Hey ${name}</h1>


    <p>
    Your pickup request on Phirlo for the consignment named  '${consignment_name}'  is received. <br/>
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

module.exports = sendConsignmentEmail;
