const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
async function sendCouponPurchaseEmail(email, name, coupon) {
  const msg = {
    to: email, // Change to your recipient
    from: "team@phirlo.in", // Change to your verified sender
    subject: "Phirlo - Coupon Updates",
    text: `
        Hi ${name}, Your coupon is purchased successfully. Your coupon code is ${coupon.Id}.
        `,
    html: `
    Hi ${name}, Your coupon is purchased successfully. Your coupon code is ${coupon}
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

module.exports = sendCouponPurchaseEmail;
