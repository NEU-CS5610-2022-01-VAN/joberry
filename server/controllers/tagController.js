import prisma from "../models/index.js";
import asyncHandler from "express-async-handler";
import postController from "./postController.js"


// CRUD

// creates a new tag
const createNewTag = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const newTag = await prisma.tag.create({
        data: {
            name,
        }
    });
    res.send(newTag);
});

// updates a Tag by id
const updateTag = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const updatedTag = await prisma.Tag.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    res.send(updatedTag);
  });

// deletes a Tag item by id
const deleteTag = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const deletedTag = await prisma.Tag.delete({
      where: {
        id,
      },
    });
    res.send(deletedTag);
  });
  
// searches Tags by name
const searchTag = asyncHandler(async (req, res) => {
    const { search } = req.body;
    const searchResult = await prisma.Tag.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
            },
          },
        ],
      },
    });
    res.send(searchResult);
  });

// get all the tags 
const getAllTags = asyncHandler(async (req, res) => {
    const Tags = await prisma.Tag.findMany();
    res.send(Tags);
  });

export default {
  createNewTag,
  deleteTag,
  searchTag,
  updateTag,
  getAllTags,
};
