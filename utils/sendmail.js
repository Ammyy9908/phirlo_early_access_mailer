const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (email, password) => {
  const msg = {
    to: email, // Change to your recipient
    from: "team@phirlo.in", // Change to your verified sender
    subject: "Phirlo - Early Access",
    text: `
    Link to reset phirlo password.`,
    html: `
    <div class="gmail_default">Hey there!</div> <p>We&rsquo;re pumped to offer you early access to the very first version of&nbsp;<span class="il">Phirlo</span>.<span class="gmail_default">&nbsp;</span>You can login with&nbsp;<span class="gmail_default">the&nbsp;</span><span class="gmail_default"><span style="font-family: arial, sans-serif;">following&nbsp;</span></span>cred<span class="gmail_default"><span style="font-family: arial, sans-serif;">ential</span></span>s</p> <p><em><span style="font-size: xx-small;">Email:</span><span class="gmail_default"><span style="font-size: xx-small;">&nbsp;</span>&nbsp;&nbsp;</span></em><span style="color: #6aa84f;"><strong>${email}</strong></span></p> <p><em><span style="font-size: xx-small;">Password:</span><span class="gmail_default"><span style="font-size: xx-small;">&nbsp;</span>&nbsp;&nbsp;&nbsp;</span></em><span style="color: #6aa84f;"><strong>${password}</strong></span></p> <p><span class="gmail_default"><a href="https://phirlo.ooo/" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=https://phirlo.ooo/&amp;source=gmail&amp;ust=1654275756266000&amp;usg=AOvVaw1QuXHOkyOFUpDt15GMtfnq"><span style="font-family: arial, sans-serif;"><strong><span class="il">Phirlo</span>&nbsp;Early Access</strong></span></a></span></p> <p>&nbsp;</p> <hr /> <p><span class="gmail_default"><span style="font-family: arial, sans-serif;"><span class="il">Phirlo</span>&nbsp;is&nbsp;</span></span>your one stop solution to get rid of clothes you no longer want, wear or fit-in.</p> <ul> <li>Have clothes you don&rsquo;t&nbsp;<span class="gmail_default"><span style="font-family: arial, sans-serif;">need&nbsp;</span></span>anymore?</li> <li>Want to lighten your filled wardrobe?</li> <li>Don&rsquo;t fit in those clothes from last season?</li> </ul> <div>&nbsp;</div> <p><strong>Schedule a Pickup</strong></p> <p><span class="gmail_default"><span style="font-family: arial, sans-serif;">Cleaning</span></span>&nbsp;your wardrobe is as easy as sending a WhatsApp message. We come and pick those clothes from your doorstep<span class="gmail_default">&nbsp;</span><span class="gmail_default"><span style="font-family: arial, sans-serif;">for free.</span></span></p> <p><strong>Get Rewarded</strong></p> <p>Every time you clean your wardrobe, we offer&nbsp;<span class="il">Phirlo</span>&nbsp;Points which you can avail at your favorite brands to shop more.</p> <p><strong><span class="il">Phirlo</span>&nbsp;Store</strong></p> <p>Looking for an all new thrifting experience? Visit&nbsp;<span class="gmail_default"><span style="font-family: arial, sans-serif;">our</span></span>&nbsp;<span class="il">Phirlo</span>&nbsp;Store<span class="gmail_default">&nbsp;</span><span class="gmail_default"><span style="font-family: arial, sans-serif;">which goes live on 4th of June.</span></span></p> <p>&nbsp;</p> <hr /> <p>&nbsp;</p> <p>Experience the smart-age fashion. Come join&nbsp;<span class="il">Phirlo</span></p> <p><strong>Shop More | Waste Less</strong></p> <p><strong>&nbsp;</strong></p> <p><em>Rooting for your valuable feedbacks</em></p> <div class="gmail_default"><em><a href="mailto:team@phirlo.in" target="_blank" rel="noopener">team@<span class="il">phirlo</span>.in</a>&nbsp;| 7338112475</em></div>
    `,
  };
  try {
    let is_sent = await sgMail.send(msg);
    return is_sent;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = sendMail;
