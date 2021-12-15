const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const Session = require('../model/Session')

require('dotenv/config');

// now goes to backend/routes because we use router.get that references to
router.get("/",  (req, res) => {
  console.log("In GET all Sessions");
//   Post.find().then(documents => {
//     res.status(200).json({
//       message: "Sessions fetched successfully!",
//       posts: documents
//     });
//     console.log(documents);
//   });
})

// router.get("/id", (req, res) => {
//   res.send("id route"); // respond to the user sending a string :)
// })

// Submit a post
router.post('/createSession', async (req, res, next) => {
  console.log("POSTED A NEW Session");
  console.log("request", req);
  // console.log(res);
  console.log("res" + res.body);
  const session = new Session({

          username: req.body.username,
          selectedScore: req.body.selectedScore

  })
  try{
    const savedSession = await session.save();
    res.json(savedSession);
    }catch (e) {
    res.json({message: e});
  }
})

// // Get Specific Post
// router.get('/:postId',async (req,res) => {
//   try{
//     const post = await Post.findById(req.params.postId);
//     res.json(post);
//     console.log(req.params.postId);
//   }catch (e) {
//     res.json({message: e});

//   }

// })

// // Delete post
// router.delete('/:postId', async (req,res) => {
//   try{
//     const removedPost = await Post.deleteOne({_id: req.params.postId} )
//     res.json(removedPost)
//     console.log("Post: "  + req.params.postId+ " removed");
//   }catch (e) {
//     res.json({message: e});
//   }
// })

//Update a post

// router.patch('/:postId',async (req,res) => {
//   try{
//     const updatePost = await Post.updateOne(
//       {_id: req.params.postId},
//       {$set:
//           {title: req.body.title, description: req.body.description}
//       });
//     res.json(updatePost);
//     console.log(req.params.postId);
//     console.log("Edited post!");
//   }catch (e) {
//     res.json({message: e});

//   }

// })

module.exports = router;
