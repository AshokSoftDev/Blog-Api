import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'
import { connectDB } from './db.js';
connectDB();
import { login, createPost, getPosts, authMiddleware, getPostById, deletePost } from './blog.controller.js';
import { upload } from "./multerConfig.js"; 

app.use(cors());
app.use(express.json());
 
app.use("/images", express.static("images"));

app.post('/login', login);
app.post('/createPost', [upload.single("img")], createPost);
app.get('/getPosts', getPosts);
app.get('/getPosts/:_id', getPostById);
app.delete('/deletePost/:_id', deletePost);

 

// app.post('/login', async (req, res) => {
//   // console.log(req);
//   const { username, password } = req.body;
//   const user = await users.findOne({ username });
//   console.log(user);
//   if (!user) {
//     return res.status(409).json({ message: "Invalid Username" });
//   }
//   if (user.password != password) {
//     return res.status(409).json({ message: "Invalid Password" });
//   }
//   return res.status(200).json(user);
// })

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  return res.send(`Hello ${name}!`);
});


const port = parseInt(process.env.PORT) || 8080;


app.listen(port, () => {
  console.log(`listening on port ${port}`);
}); 