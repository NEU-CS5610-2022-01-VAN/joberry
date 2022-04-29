import prisma from "../models/index.js";
import asyncHandler from "express-async-handler";

// ============================= BERRIES ==============================
// creates a berry
const createNewBerry = asyncHandler(async (req, res) => {
  const auth0Id = req.user.sub;
  const { postId } = req.body;
  const newBerry = await prisma.berry.create({
    data: {
      postId,
      userId: { connect: { auth0Id } },
    },
  });
  res.send(newBerry);
});

// gets all berries of a post
const getBerriesOfPost = asyncHandler(async (req, res) => {
  const { postId } = req.body;
  const berries = await prisma.berry.findMany({
    where: {
      postId,
    },
    include: {
      user: true,
    },
  });
  res.send(berries);
});

// delete a berry
const deleteBerry = asyncHandler(async (req, res) => {
  const auth0Id = req.user.sub;
  const { postId } = req.body;
  const deletedBerry = await prisma.berry.delete({
    where: {
      postId,
      userId: { connect: { auth0Id } },
    },
  });
  res.send(deletedBerry);
});

// ============================= COMMENTS ==============================
// creates a comment
const createNewComment = asyncHandler(async (req, res) => {
  const auth0Id = req.user.sub;
  const { content, parentId } = req.body;
  const newComment = await prisma.comment.create({
    data: {
      content,
      parentId,
      author: { connect: { auth0Id } },
    },
  });
  res.send(newComment);
});

// gets all comments of a post
const getCommentsOfPost = asyncHandler( async (req, res) => {
  const { postId } = req.body;
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: true,
      childrenComments: {
        include: {
          childrenComments: true,
        },
      },
    },
  });
  res.send(comments);
});

//delete a comment
const deleteComment = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deletedComments = await prisma.comment.deleteMany({
    where: {
      id,
      parentId,
    },
  });
  res.send(deletedComments);
});

export default {
  createNewBerry,
  getBerriesOfPost,
  deleteBerry,
  createNewComment,
  getCommentsOfPost,
  deleteComment,
};