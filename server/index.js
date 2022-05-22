import express from "express";
import dotenv from "dotenv";
import connection from "./database/db.js";
import cors from "cors";
import internRegister from "./schema/register.js";
import bcrypt from "bcrypt";
const app = express();
dotenv.config();

app.use(cors());

let url = process.env.URL;
connection(process.env.MONGODB_URI || url);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
let port = process.env.PORT || 3001;



app.post("/register",async (req, res) => {
  const oldUser = await internRegister.findOne({ email: req.body.email });

  if (oldUser) {
    return res.send({
      success: false,
      message: "User Already Exist. Please Login",
    });
  }
  //Encrypt user password
  let encryptedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = encryptedPassword;
  
 
  let response = await internRegister.insertMany([req.body]);
  return res.send({
    success: true,
    message: "User Registered sucessfully",
    response,
  });
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  let user = await internRegister.findOne({ email: req.body.email });
  if (!user) {
    return res.send({success:false,message:"Please Register first"})
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    return res.send({
      success: true,
      message: "User loged in sucessfully",
      user
    }
    );
  }
});



app.listen(port, () => {
  console.log(`your server is runnig at port ${port}`);
});