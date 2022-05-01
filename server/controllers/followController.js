import prisma from "../models/index.js";
import asyncHandler from "express-async-handler";

const createNewFollowing = asyncHandler(async (req, res) => {
    const auth0Id = req.user.sub;
    const { following } = req.body;
    const newFollowing = await prisma.user.update({
        data: {
            following,
            followers: {connect: { auth0Id }},
        },
    });
    res.send(newFollowing);
});

const deleteFollowing = asyncHandler(async (req, res) => {
    const auth0Id = req.user.sub;
    const { following } = req.body;
    const deletedFollowing = await prisma.folllows.delete({
        where: {
            followers: {connect: { auth0Id }},
            following,
        },
    });
    res.send(deletedFollowing);
})

export default {
    createNewFollowing,
    deleteFollowing
}