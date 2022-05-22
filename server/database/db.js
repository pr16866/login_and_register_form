import Mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();

const connection = async (url) => {
    try {
        await Mongoose.connect(url, { useNewUrlParser: true }); 
        console.log("db connected");
    } catch (er) {
        console.log(er)
    }

}
export default connection;