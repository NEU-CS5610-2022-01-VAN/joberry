import prisma from '../models/index.js'
import asyncHandler from "express-async-handler";

// verify user status, if not registered in our database we will create it
const verifyUser = asyncHandler(async (req, res) => {
  const auth0Id = req.user.sub;
  const email = req.user[`${process.env.AUTH0_AUDIENCE}/email`];
  const name = req.user[`${process.env.AUTH0_AUDIENCE}/name`];
  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });

  if (user) {
    res.send(user);
  }
  else {
    const newUser = await prisma.user.create({
      data: {
        email,
        auth0Id,
        name,
      },
    });
    res.send(newUser);
  }
});

// get Profile information of authenticated user
const getProfile = asyncHandler(async (req, res) => {
  const auth0Id = req.user.sub;
  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
    include: {
      posts: true,
      berries: true,
      comments: true,
    },
  });
  res.send(user);
});

// get user information
const getUserInfo = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  res.send(user);
});


export default { verifyUser, getProfile, getUserInfo };
