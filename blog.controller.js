

import Post from "./blog.model.js";
import SubArticle from "./subArticle.model.js";
import { users } from "./user.model.js";
import jwt from 'jsonwebtoken';

// export const createPost = async (req, res) => {
//     try {
//         const { title, content, category, tags, subArticles } = req.body;

//         // const parsedTags = JSON.parse(tags || "[]");
//         // const parsedSubArticles = JSON.parse(subArticles || "[]");

//         const post = new Post({ title, content, category, tags });
//         await post.save();

//         const subArticlesArray = subArticles.map((sub) => ({
//             ...sub,
//             postId: post._id,
//         }));
//         const createdSubArticles = await SubArticle.insertMany(subArticlesArray);

//         post.subArticles = createdSubArticles.map((sub) => sub._id);
//         await post.save();

//         return res.status(201).json({ message: "Post created", post });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// };


export const createPost = async (req, res) => {
    try {
        const { title, content, category, tags, subArticles } = req.body;

        const parsedTags = JSON.parse(tags || "[]");
        const parsedSubArticles = JSON.parse(subArticles || "[]");

        const image = req.savedImageName ? req.savedImageName : null;

        const post = new Post({ title, content, category, tags: parsedTags, image });
        await post.save();

        const subArticlesArray = parsedSubArticles.map((sub) => ({
            ...sub,
            postId: post._id,
        }));
        const createdSubArticles = await SubArticle.insertMany(subArticlesArray);

        post.subArticles = createdSubArticles.map((sub) => sub._id);
        await post.save();

        return res.status(201).json({ message: "Post created successfully", post });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};




export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("subArticles");
        return res.json(posts);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};  
export const getPostById = async (req, res) => {
    try {
        const { _id } = req.params; // Get ObjectId from request parameters
        const post = await Post.findById(_id).populate("subArticles");

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        return res.json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


export const login = async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    const user = await users.findOne({ username });
    console.log(user);
    if (!user) {
        return res.status(409).json({ message: "Invalid Username" });
    }
    if (user.password != password) {
        return res.status(409).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3h" });
    return res.status(200).json({jwt: token});
}

export const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });
  
    try {
      const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
      
      req.user = verified;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid Token" });
    }
  };