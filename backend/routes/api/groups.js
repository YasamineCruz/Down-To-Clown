const express = require('express');

const { restoreUser } = require('../../utils/auth');
const { User, Group, Membership, sequelize, GroupImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require("sequelize");

const router = express.Router();


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
        where: { organizerId: 1},
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
                 { model: User, where: { id: 1} }, 
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
    console.log(currentUserGroups)
    
    if(currentUserGroups.length < 1 && currentUserOrganizer.length < 1){
        res.json({
            message: "The current user has no groups"
        })
    } else {
        for(let i = 0; i < currentUserGroups.length; i++){
            let group = currentUserGroups[i]
          
           
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
    
        for(let i = 0; i < currentUserOrganizer.length; i++){
            let group = currentUserOrganizer[i]
                for(let j = 0; j < payload.length; j++){
                    let groupInPayload = payload[i]

                    if(groupInPayload.id !== group.id){
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

module.exports = router;