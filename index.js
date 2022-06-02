const express = require("express");
const dotenv = require("dotenv");
const sendmail = require("./utils/sendmail");

dotenv.config();
const app = express();
app.use(express.json());

app.post("/sendmail", (req, res) => {
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
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
