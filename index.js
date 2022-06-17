const express = require("express");
const dotenv = require("dotenv");
const sendmail = require("./utils/sendmail");
const sendConsignmentEmail = require("./utils/consignment_mail");
const cors = require("cors");
const sendCouponPurchaseEmail = require("./utils/coupon_purchase");
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
    const { email, name } = req.body;

    sendConsignmentEmail(email, name)
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
  });

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
