const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, Membership, sequelize, GroupImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get('/', async(req, res, next) => {

    let groups = await Group.findAll({
        include: [
                 { model: User, attributes: [] }, 
                 { model: GroupImage, attributes: ['url', 'previewImage']} 
                ],
        attributes: {
            include: [
                [
                    sequelize.fn("COUNT", sequelize.col("User.id")), 
                    "numMembers"
                ]
             ]
            },
        group: ['Group.id']
    })

    
    if(groups){
        res.json(groups)
    } else{
        const err = new Error('No Groups found');
        err.status = 401;
        err.title = 'No Groups';
        err.errors = ['There are no groups'];
        return next(err);
    }
})

router.get('/:groupId', async(req, res, next) => {

})

module.exports = router;