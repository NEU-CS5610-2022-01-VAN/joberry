import prisma from "../models/index.js";
import asyncHandler from "express-async-handler";

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await prisma.post.findMany({
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
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(posts);
});

const createNewPost = asyncHandler(async (req, res) => {
  const auth0Id = req.user.sub;
  const { title, body, tagIds } = req.body;
  const newPost = await prisma.post.create({
    data: {
      title,
      body,
      author: { connect: { auth0Id } },
    },
    
  });
  res.send(newPost);
  await prisma.activity.create({
    data: {
      type: 1,
      post: {
        connect: {
          id: newPost.id,
        },
      },
      user: { connect: { auth0Id } },
    },
  });
});

const getPostDetail = asyncHandler(async (req, res) => {
  const id = parseInt(parseInt(req.params.id));
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      comments: {
        include: {
          user: true,
        },
      },
      berries: {
        select: {
          user: true,
          id: true,
        },
      },
      _count: {
        select: { comments: true, berries: true },
      },
      author: true,
    },
  });
  res.send(post);
});

// updates a post by id
const updatePost = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, body } = req.body;
  const updatedPost = await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      body,
    },
    include: {
      comments: {
        include: {
          user: true,
        },
      },
      berries: {
        select: {
          user: true,
          id: true,
        },
      },
      _count: {
        select: { comments: true, berries: true },
      },
      author: true,
    },
  });
  res.send(updatedPost);
});

// deletes a post item by id
const deletePost = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const deletedPost = await prisma.post.delete({
    where: {
      id,
    },
  });
  res.send(deletedPost);
    await prisma.activity.deleteMany({
      where: {
        type: 1,
        postId: parseInt(id),
      },
    });
});

// searches posts by title or content
const searchPost = asyncHandler(async (req, res) => {
  const { search } = req.body;
  const searchResult = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            search,
          },
        },
        {
          body: {
            search,
          },
        },
        {
          author: {
            name: {
              contains: search,
            },
          },
        },
        {
          author: {
            email: {
              contains: search,
            },
          },
        },
      ],
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
  });
  res.send(searchResult);
});

// search posts by tags
const searchPostByTags = asyncHandler(async (req, res) => {
  const { search } = req.body;
  const searchResult = await prisma.post.findMany({
    where: {
      tags: {
        name: {
          contains: search,
        },
      },
    },
  });
  res.send(searchResult);
});



export default {
  getAllPosts,
  createNewPost,
  getPostDetail,
  updatePost,
  deletePost,
  searchPost,
  searchPostByTags,
};
