const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const Session = require('../model/Session')

require('dotenv/config');

// now goes to backend/routes because we use router.get that references to
router.get("/", (req, res) => {
  console.log("In GET all Sessions");
//   Post.find().then(documents => {
//     res.status(200).json({
//       message: "Sessions fetched successfully!",
//       posts: documents
//     });
//     console.log(documents);
//   });
})

/**
 * Create a Session with the user that created it in the database
 */
router.post('/createSession', async (req, res, next) => {
  console.log("POSTED A NEW Session");
  console.log("request", req);

  const session = new Session({
    gamemode: req.body.gamemode,
    users: [{
      //TODO: find a better way to access the elements in the array
      username: req.body.users[0].username,
      selectedScore: req.body.users[0].selectedScore
    }]
  })
  try {
    // session._id = req.body.username;
    const savedSession = await session.save();
    res.json(savedSession);
  } catch (e) {
    res.json({message: e});
  }
})


/**
 * Add a new user to the array for an existing session in the database.
 */
router.patch('/:sessionId', async (req, res) => {
  console.log("Adding new user for existing session.")
  try {
    const updateSession = await Session.updateOne(
      {_id: req.params.sessionId},
      {
        $push: {
          users: [{
            username: req.body.username,
            selectedScore: req.body.selectedScore
          }]
        }
      });
    res.json(updateSession);
    console.log("Updated the Session ", req.params.sessionId, " with a new user named ", req.body.username);
  } catch (e) {
    res.json({message: e});

  }
})

/**
 * Update the score of a user in the session.
 */
router.patch('/update/:sessionId', async (req, res) => {
  console.log("Updating the score for existing user.")
  try {
    let userToUpdate = req.body.username;

    const updateSession = await Session.updateOne(
      {
        _id: req.params.sessionId,
        users: {$elemMatch: {username: userToUpdate}}
      },
      {
        $set: {
          "users.$.selectedScore": req.body.selectedScore
        }
      });
    res.json(updateSession);
    console.log("Updated the score to ", req.body.selectedScore, " for the user ", req.body.username, " in the session ", req.params.sessionId);
  } catch (e) {
    res.json({message: e});

  }
})

/*
* Sets all the scores of each user to 0
*/
router.patch('/reset/:sessionId', async (req, res) => {
  try {
    const resetSession = await Session.updateMany(
      {_id: req.params.sessionId},
      {
        $set: {"users.$[].selectedScore": "0"}
      });

    res.json(resetSession);
    console.log("Reset all the scores to zero, in the session ", req.params.sessionId);
  } catch (e) {
    res.json({message: e});
  }
})


// Get Specific Post
router.get('fetch/:sessionId', async (req, res) => {
  try {
    const sessionUsers = await Session.findById(req.params.sessionId);
    res.json(sessionUsers);
    console.log(req.params.sessionId);
    console.log(sessionUsers)
  } catch (e) {
    res.json({message: e});

  }

})

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
