const express = require("express");
const dotenv = require("dotenv");
const sendmail = require("./utils/sendmail");
const sendConsignmentEmail = require("./utils/consignment_mail");
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
  .post("/mail/consignment", (req, res) => {
    const { email, name, consignment_type qty } = req.body;

    sendConsignmentEmail(email, name, consignment_type, qty)
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
    const { user, consignment_name, qty } = req.body;

    sendNonAuthConsignmentMail(user, consignment_name, qty).then((sented) => {
      console.log(sented);
      if (!sented) {
        res.status(500).json({ message: "Error while sending mail" });
      } else {
        res.status(200).json({ message: "Mail sent" });
      }
    });
  });

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
