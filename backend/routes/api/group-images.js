const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { GroupImage } = require('../../db/models');

const { Op } = require("sequelize");

const router = express.Router();


router.delete('/:imageId', requireAuth, async(req, res, next) => {
    const { imageId } = req.params;

    // const { user } = req;

    // let currentUser = user.toSafeObject();
    // let currentUserId = currentUser.id;

    let image = await GroupImage.findByPk(imageId)
    if(!image){
        res.status = 404;
        return res.json({
            message: "Group Image couldn't be found",
            statusCode: 404
        })
    }

    // let validateAuthorization = await Membership.findOne({ where: { [Op.and]: [ {userId: currentUserId}, { groupId: image.groupId} ] }})
    // if(validateAuthorization.status === "co-host" || validateAuthorization.status === "organizer"){
    //     await image.destroy();
    //     return res.json({
    //         message: "Successfully deleted",
    //         statusCode: 200
    //     })
    // }

    await image.destroy()
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    })

    // res.status = 403;
    // res.json({
    //     message: "Current User is not authorized to delete a image",
    //     statusCode: 403
    // })
})

module.exports = router;