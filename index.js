const express = require("express");
const dotenv = require("dotenv");
const sendmail = require("./utils/sendmail");
const sendConsignmentEmail = require("./utils/consignment_mail");
const sendResetPasswordLink = require("./utils/send_reset_password_email");
const cors = require("cors");
const sendCouponPurchaseEmail = require("./utils/coupon_purchase");
const sendNonAuthConsignmentMail = require("./utils/non_auth_user_mail");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app
  .post("/sendmail", (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    sendmail(email, password).then((is_sented) => {
      console.log(is_sented);
      if (!is_sented) {
        res.status(500).json({ message: "Error while sending mail" });
      } else {
        res.status(200).json({ message: "Mail sent" });
      }
    });
  })
  .post("/reset", async (req, res) => {
    const { email, token } = req.body;
    console.log(email, token);
    sendResetPasswordLink(email, token).then((sented) => {
      if (sented) {
        res.status(200).json({ message: "Link sent" });
      } else {
        res.status(500).json({ message: "Error while sending link" });
      }
    });
  })
  .post("/mail/consignment", (req, res) => {
    const { email, name, consignment_name, qty } = req.body;

    sendConsignmentEmail(email, name, consignment_name, qty)
      .then((is_sented) => {
        console.log(is_sented);
        if (!is_sented) {
          res.status(500).json({ message: "Error while sending mail" });
        } else {
          res.status(200).json({ message: "Mail sent" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Error while sending mail" });
      });
  })
  .post("/mail/coupon", (req, res) => {
    const { email, name, coupon } = req.body;
    sendCouponPurchaseEmail(email, name, coupon)
      .then((is_sented) => {
        console.log(is_sented);
        if (!is_sented) {
          res.status(500).json({ message: "Error while sending mail" });
        } else {
          res.status(200).json({ message: "Mail sent" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Error while sending mail" });
      });
  })
  .post("/mail/non-auth", async (req, res) => {
    const { user } = req.body;

    sendNonAuthConsignmentMail(user).then((sented) => {
      console.log(sented);
      if (!sented) {
        res.status(500).json({ message: "Error while sending mail" });
      } else {
        res.status(200).json({ message: "Mail sent" });
      }
    });
  });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
