import prisma from "../models/index.js";
import asyncHandler from "express-async-handler";

// ============================= BERRIES ==============================
// creates a berry
const createNewBerry = asyncHandler(async (req, res) => {
  const auth0Id = req.user.sub;
  const { postId } = req.body;

  const newBerry = await prisma.berry.create({
    data: {
      post: { connect: { id: parseInt(postId) } },
      user: { connect: { auth0Id } },
    },
  });
  res.send(newBerry);

  await prisma.activity.create({
    data: {
      type: 2,
      post: {
        connect: {
          id: postId,
        },
      },
      user: { connect: { auth0Id } },
    },
  });
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
  const { id } = req.params;
  const deletedBerry = await prisma.berry.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.send(deletedBerry);

  await prisma.activity.deleteMany({
    where: {
      type: 2,
      berryId: parseInt(id),
    },
  });
});

export default {
  createNewBerry,
  getBerriesOfPost,
  deleteBerry,
};
