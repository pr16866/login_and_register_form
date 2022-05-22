import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  userId: {
    type: String,
  },
});
const internRegister = mongoose.model("internRegister", schema);
export default internRegister;
