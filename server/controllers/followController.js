import prisma from "../models/index.js";
import asyncHandler from "express-async-handler";

const createNewFollowing = asyncHandler(async (req, res) => {
    const auth0Id = req.user.sub;
    const { followingId } = req.body;
    const newFollowing = await prisma.follows.create({
        data: {
            followingId,
            follower: {connect: { auth0Id }},
        },
    });
    res.send(newFollowing);
});

const deleteFollowing = asyncHandler(async (req, res) => {
    const auth0Id = req.user.sub;
    const {followingId} = req.body;
    const deletedFollowing = await prisma.folllows.delete({
        where: {
            follower: {connect: { auth0Id }},
            followingId,
        },
    });
    res.send(deletedFollowing);
})

export default {
    createNewFollowing,
    deleteFollowing
}