import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import jwt from "express-jwt";
import jwks from "jwks-rsa";

var requireAuth = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTH0_JWK_URI,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ["RS256"],
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

app.get("/ping", (req, res) => {
  res.send("pong");
});

// ============================= USER ===================================
// verify user status, if not registered in our database we will create it
app.post("/verify-user", requireAuth, async (req, res) => {
  const auth0Id = req.user.sub;
  const email = req.user[`${process.env.AUTH0_AUDIENCE}/email`];
  const name = req.user[`${process.env.AUTH0_AUDIENCE}/name`];

  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });

  if (user) {
    res.json(user);
  } else {
    const newUser = await prisma.user.create({
      data: {
        email,
        auth0Id,
        name,
      },
    });
    res.json(newUser);
  }
});

// get Profile information of authenticated user
app.get("/profile", requireAuth, async (req, res) => {
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

  res.json(user);
});

// ============================= POSTS ==================================
// get all posts
app.get("/posts", requireAuth, async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
});

// creates a post
app.post("/posts", requireAuth, async (req, res) => {
  const auth0Id = req.user.sub;
  const { title, body } = req.body;
  const newPost = await prisma.post.create({
    data: {
      title,
      body,
      author: { connect: { auth0Id } },
    },
  });
  res.status(201).json(newPost);
});

// get a post by id
app.get("/posts/:id", requireAuth, async (req, res) => {
  const id = req.params.id;
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      comments: true,
      berries: true,
    },
  });
  res.status(201).json(post);
});

// updates a post by id
app.put("/posts/:id", requireAuth, async (req, res) => {
  const id = req.params.id;
  const { title, body } = req.body;
  const updatedPost = await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      body,
    },
  });
   res.status(201).json(updatedPost);
});

// deletes a post item by id
app.delete("/posts/:id", requireAuth, async (req, res) => {
  const id = req.params.id;
  const deletedPost = await prisma.post.delete({
    where: {
      id,
    },
  });
  res.json(deletedPost);
});

// searches posts by title or content
app.post("/posts-search", requireAuth, async (req, res) => {
  const { search } = req.body;
  const searchResult = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: search,
          },
        },
        {
          body: {
            contains: search,
          }
        },
      ],
    },
  });
   res.status(201).json(searchResult);
});

// ============================= BERRIES ==============================
// creates a berry
app.post("/berries", requireAuth, async (req, res) => {
  const auth0Id = req.user.sub;
  const { postId } = req.body;
  const newBerry = await prisma.berry.create({
    data: {
      postId,
      userId: { connect: { auth0Id } },
    },
  });
  res.status(201).json(newBerry);
});

// gets all berries of a post
app.get("berries", requireAuth, async (req, res) => {
  const { postId } = req.body;
  const berries = await prisma.berry.findMany({
    where: {
      postId,
    },
    include: {
      user: true,
    },
  });
  res.status(201).json(berries);
});

// delete a berry
app.delete("/berries", requireAuth, async (req, res) => {
  const auth0Id = req.user.sub;
  const { postId } = req.body;
  const deletedBerry = await prisma.berry.delete({
    where: {
      postId,
      userId: { connect: { auth0Id } },
    },
  });
  res.status(201).json(deletedBerry);
});

// ============================= COMMENTS ==============================
// creates a comment
app.post("/comments", requireAuth, async (req, res) => {
  const auth0Id = req.user.sub;
  const { content, parentId } = req.body;
  const newComment = await prisma.comment.create({
    data: {
      content,
      parentId,
      author: { connect: { auth0Id } },
    },
  });
  res.status(201).json(newComment);
});

// gets all comments of a post
app.get("/comments", requireAuth, async (req, res) => {
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
  res.status(201).json(comments);
});

//delete a comment
app.delete("/comments/:id", requireAuth, async (req, res) => {
  const id = req.params.id;
  const deletedComments = await prisma.comment.deleteMany({
    where: {
      id,
      parentId,
    },
  });
  res.status(201).json(deletedComments);
});
