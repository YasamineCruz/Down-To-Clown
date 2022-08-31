const express = require('express');

const { restoreUser, requireAuth } = require('../../utils/auth');
const { User, Group, Membership, sequelize, GroupImage, Venue } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require("sequelize");

const router = express.Router();

const validateGroup = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 1, max: 60 })
        .withMessage('Name must be 60 characters or less'),
    check('about')
        .exists({ checkFalsy: true })
        .isLength({ min: 50 })
        .withMessage('About must be 50 characters or more'),
    check('type')
        .exists({ checkFalsy: true }),
    check('type')
        .not()
        .isISIN('Online', 'In person')
        .withMessage("Type must be 'Online' or 'In person'"),
    check('private')
        .exists({ checkFalsy: true })
        .isBoolean({ checkFalsy: true})
        .withMessage('Private must be a boolean'),
    check('city')
        .exists({ checkFalsy: true})
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    handleValidationErrors
]


router.get('/', async(req, res, next) => {
    let payload = [];
    let groups = await Group.findAll({
        include: [
                 { model: User, attributes: [] }, 
                ],
        attributes: {
            include: [
                [
                    sequelize.fn("COUNT", sequelize.col("User.id")), 
                    "numMembers"
                ]
             ]
            },
        group: ['Group.id'],
        raw: true
    })

    
    for(let i = 0; i < groups.length; i++){
        let group = groups[i]
      
            let previewImage = await GroupImage.findOne({ where: { groupId: group.id }, attributes: ['url'], raw: true})
           
            payload.push({
                id: group.id,
                organizerId: group.organizerId,
                name: group.name,
                about: group.about,
                type: group.type,
                private: group.private,
                city: group.city,
                createdAt: group.createdAt,
                updatedAt: group.updatedAt,
                numMembers: group.numMembers,
                previewImage: previewImage.url
            })
        
    }
    
    
    if(groups){
        res.json({Groups: payload})
    } else{
        const err = new Error('No Groups found');
        err.status = 401;
        err.title = 'No Groups';
        err.errors = ['There are no groups'];
        return next(err);
    }
})

router.get('/current', async(req, res, next) => {
    const { user } = req;
    let currentUser;
    let currentUserId;
    let currentUserGroups;
    let currentUserOrganizer;
    let payload = [];

    if (user) {
      currentUser = user.toSafeObject();
      currentUserId = currentUser.id;
      
      currentUserOrganizer = await Group.findAll({
        where: { organizerId: currentUserId},
        include: { model: User, attributes: [] },
        attributes: {
            include: [
                [
                    sequelize.fn("COUNT", sequelize.col("User.id")), 
                    "numMembers"
                ]
             ]
            },
        group: ['Group.id'],
        raw: true
    });
    console.log(currentUserOrganizer)

    currentUserGroups = await Group.findAll({
        include: [
                 { model: User, where: { id: currentUserId} }, 
                ],
        attributes: {
            include: [
                [
                    sequelize.fn("COUNT", sequelize.col("User.id")), 
                    "numMembers"
                ]
             ]
            },
        group: ['Group.id'],
        raw: true
    })

    
    if(currentUserGroups.length < 1 && currentUserOrganizer.length < 1){
        res.json({
            message: "The current user has no groups"
        })
    } else {
        for(let i = 0; i < currentUserGroups.length; i++){
            let group = currentUserGroups[i]
            console.log(group.id)
           
                let previewImage = await GroupImage.findOne({ where: { groupId: group.id }, attributes: ['url'], raw: true})
                if(previewImage){
                    payload.push({
                        id: group.id,
                        organizerId: group.organizerId,
                        name: group.name,
                        about: group.about,
                        type: group.type,
                        private: group.private,
                        city: group.city,
                        createdAt: group.createdAt,
                        updatedAt: group.updatedAt,
                        numMembers: group.numMembers,
                        previewImage: previewImage.url
                    })
                } else {
                    payload.push({
                        id: group.id,
                        organizerId: group.organizerId,
                        name: group.name,
                        about: group.about,
                        type: group.type,
                        private: group.private,
                        city: group.city,
                        createdAt: group.createdAt,
                        updatedAt: group.updatedAt,
                        numMembers: group.numMembers,
                        previewImage: "There is no previewImage for this group."
                    })
                }
            
        }
    
        for(let i = 0; i < currentUserOrganizer.length; i++){
            let group = currentUserOrganizer[i]
                for(let j = 0; j < payload.length; j++){
                    let groupInPayload = payload[i]

                    if(groupInPayload.id !== group.id){
                        let previewImage = await GroupImage.findOne({ where: { groupId: group.id }, attributes: ['url'], raw: true})
               
                        if(previewImage){
                            payload.push({
                                id: group.id,
                                organizerId: group.organizerId,
                                name: group.name,
                                about: group.about,
                                type: group.type,
                                private: group.private,
                                city: group.city,
                                createdAt: group.createdAt,
                                updatedAt: group.updatedAt,
                                numMembers: group.numMembers,
                                previewImage: previewImage.url
                            })
                        } else {
                            payload.push({
                                id: group.id,
                                organizerId: group.organizerId,
                                name: group.name,
                                about: group.about,
                                type: group.type,
                                private: group.private,
                                city: group.city,
                                createdAt: group.createdAt,
                                updatedAt: group.updatedAt,
                                numMembers: group.numMembers,
                                previewImage: "There is no previewImage for this group."
                            })
                        }
            }
        }               
        }
        
          return res.json({Groups: payload})
    }
   
    } else{
            const err = new Error('No user is signed in');
            err.status = 401;
            err.title = 'User error';
            err.errors = ['There was no provided user id'];
            return next(err);
            
        }
    })



    router.get('/:groupId', requireAuth, async(req, res, next) => {
    const { groupId } = req.params
    let payload = [];
    let groups = await Group.findAll({
        where: { id: groupId },
        include: [
                 { model: User, attributes: []},
                ],
        attributes: {
            include: [
                [
                    sequelize.fn("COUNT", sequelize.col("User.id")), 
                    "numMembers"
                ]
             ]
            },
        group: ['Group.id'],
        raw: true
    })

    console.log(groups)

    
    for(let i = 0; i < groups.length; i++){
        let group = groups[i]
        
            let previewImage = await GroupImage.findAll({ where: { groupId: group.id }, attributes: ['url'], raw: true})
            let organizer = await User.findOne({ where: { id: group.organizerId }})
            let Venues = await Venue.findAll({where: { groupId: group.id}})
            payload.push({
                id: group.id,
                organizerId: group.organizerId,
                name: group.name,
                about: group.about,
                type: group.type,
                private: group.private,
                city: group.city,
                createdAt: group.createdAt,
                updatedAt: group.updatedAt,
                numMembers: group.numMembers,
                GroupImages: previewImage,
                Organizer: organizer,
                Venues
            })
        
    }
    
    
    if(groups){
        res.json({Groups: payload})
    } else{
        const err = new Error('No Groups found');
        err.status = 401;
        err.title = 'No Groups';
        err.errors = ['There are no groups'];
        return next(err);
    }
})


router.post('/', requireAuth, validateGroup, async(req, res, next) => {
    const { name, about, type, private, city, state } = req.body;
    const { user } = req;

     let currentUser = user.toSafeObject();
     let currentUserId = currentUser.id;

    const group = await Group.create({
        organizerId: currentUserId,
        name,
        about,
        type,
        private,
        city,
        state
    })

    return res.json({group})

})



module.exports = router;