import prisma from "../models/index.js";
import asyncHandler from "express-async-handler";

const getHotCommentPosts = asyncHandler(async (req, res) => {
  const { size } = req.body;
  const take = size || 3;
  const now = new Date();
  const posts = await prisma.post.findMany({
    where: {
      createdAt: {
        gte: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7),
        lt: now,
      },
    },
    orderBy: {
      comments: {
        _count: "desc",
      },
    },
    include: {
      _count: {
        select: { comments: true, berries: true },
      },
      berries: {
        select: {
          user: true,
          id: true,
        },
      },
    },
    take,
  });
  res.send(posts);
});

const getHotBerryPosts = asyncHandler(async (req, res) => {
  const { size } = req.body;
  const take = size || 3;
  const now = new Date();
  const posts = await prisma.post.findMany({
    where: {
      createdAt: {
        gte: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7),
        lt: now,
      },
    },
    orderBy: {
      berries: {
        _count: "desc",
      },
    },
    include: {
      _count: {
        select: { comments: true, berries: true },
      },
      berries: {
        select: {
          user: true,
          id: true,
        },
      },
    },
    take,
  });
  res.send(posts);
});

export default {
  getHotCommentPosts,
  getHotBerryPosts,
};
