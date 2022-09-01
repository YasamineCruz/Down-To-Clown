const express = require('express');

const { restoreUser, requireAuth } = require('../../utils/auth');
const { User, Group, Membership, sequelize, GroupImage, Venue, Attendance, Event, EventImage } = require('../../db/models');

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



router.get('/', requireAuth, async(req, res, next) => {
    let payload = [];
    let groups= await Group.findAll({
        include: [
                 { model: User, attributes: [] },
                ],
        attributes: {
            include: [
                [
                    sequelize.fn("COUNT", sequelize.col("User.id")), 
                    "numMembers"
                ],
            ],
            },
        group: ['Group.id'],
        raw: true
    })

 
    for(let i = 0; i < groups.length; i++){
        let group = groups[i]
        let previewImage = await GroupImage.findOne({where: { groupId: group.id}})
        if(previewImage.preview === true){
            payload.push({
                id: group.id,
                organizerId: group.organizerId,
                about: group.about,
                type: group.type,
                private: group.private,
                city: group.city,
                state: group.state,
                createdAt: group.createdAt,
                updatedAt: group.updatedAt,
                numMembers: group.numMembers,
                previewImage: previewImage.url
            })
        } else {
            payload.push({
            id: group.id,
            organizerId: group.organizerId,
            about: group.about,
            type: group.type,
            private: group.private,
            city: group.city,
            state: group.state,
            createdAt: group.createdAt,
            updatedAt: group.updatedAt,
            numMembers: group.numMembers,
            previewImage: "No preview image at this time."
        })
        }

        
    }



    
    if(payload.length >= 1){
        res.json({Groups: payload})
    } else{
        const err = new Error('No Groups found');
        err.status = 401;
        err.title = 'No Groups';
        err.errors = ['There are no groups'];
        return next(err);
    }
})

router.get('/current', requireAuth, async(req, res, next) => {
    const { user } = req;
    let currentUser;
    let currentUserId;
    let currentUserOrganizer;
    let payload = [];

    if (user) {
      currentUser = user.toSafeObject();
      currentUserId = currentUser.id;
      
      currentUserOrganizer = await Group.findAll({
        where: { organizerId: currentUserId},
        include: [ 
            { model: User, attributes: [] },
            ],
        attributes: {
            include: [
                [
                    sequelize.fn("COUNT", sequelize.col("User.id")), 
                    "numMembers"
                ],
             ]
            },
        group: ['Group.id'],
        raw: true
    });
    let memberships = [];
   
    let currentMemberships = await Membership.findAll({where: { userId: currentUserId}, raw: true})
    if(currentMemberships){
        for(let i = 0; i < currentMemberships.length; i++){
            let membership = currentMemberships[i];
            let group = await Group.findByPk(membership.groupId)
            memberships.push(group)
        }
    }

    
    if(currentUserGroups.length < 1 && currentUserOrganizer.length < 1){
        res.json({
            message: "The current user has no groups"
        })
    } else {
            // adding in groups User is the organizer of with and without previewImage
        for(let i = 0; i < currentUserOrganizer.length; i++){
            let group = currentUserOrganizer[i]
            let previewImage = await GroupImage.findOne({where: { groupId: group.id}})
            if(previewImage.preview === true){
                payload.push({
                    id: group.id,
                    organizerId: group.organizerId,
                    about: group.about,
                    type: group.type,
                    private: group.private,
                    city: group.city,
                    state: group.state,
                    createdAt: group.createdAt,
                    updatedAt: group.updatedAt,
                    numMembers: group.numMembers,
                    previewImage: previewImage.url
                })
            } else {
                payload.push({
                id: group.id,
                organizerId: group.organizerId,
                about: group.about,
                type: group.type,
                private: group.private,
                city: group.city,
                state: group.state,
                createdAt: group.createdAt,
                updatedAt: group.updatedAt,
                numMembers: group.numMembers,
                previewImage: "No preview image at this time."
            })
            }
        // adding in groups User is in with and without preview Image
        for(let i = 0; i < memberships.length; i++){
            let group = memberships[i]
            let previewImage = await GroupImage.findOne({where: { groupId: group.id}})
            if(previewImage.preview === true){
                payload.push({
                    id: group.id,
                    organizerId: group.organizerId,
                    about: group.about,
                    type: group.type,
                    private: group.private,
                    city: group.city,
                    state: group.state,
                    createdAt: group.createdAt,
                    updatedAt: group.updatedAt,
                    numMembers: group.numMembers,
                    previewImage: previewImage.url
                })
            } else {
                payload.push({
                id: group.id,
                organizerId: group.organizerId,
                about: group.about,
                type: group.type,
                private: group.private,
                city: group.city,
                state: group.state,
                createdAt: group.createdAt,
                updatedAt: group.updatedAt,
                numMembers: group.numMembers,
                previewImage: "No preview image at this time."
            })
            }
        }      
        return res.json({Groups: payload})
    }
})



    router.get('/:groupId', requireAuth, async(req, res, next) => {
    const { groupId } = req.params
    const { user } = req;
    let currentUser = user.toSafeObject();
    let currentUserId = currentUser.id;
    let payload = [];
    
    let groups = await Group.findAll({
        where: { id: groupId },
        include: {model: User, attributes: []},
        attributes: {
            include: [
                [
                    sequelize.fn("COUNT", sequelize.col("User.id")), 
                    "numMembers"
                ],
             ]
            },
        group: ['Group.id'],
        raw: true
    })


    
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
    console.log(group.id)

    let newMember = await Membership.create({userId: currentUserId, groupId: group.id, status: 'organizer'})
    console.log(newMember)

    return res.json(group)

})

router.post('/:groupId/images', requireAuth, async(req, res, next) => {
    const { groupId } = req.params;
    const { url, preview } = req.body;
    let group = await Group.findByPk(groupId);
    if(group){
        let newImage = await group.createGroupImage({url, preview});
        res.json({
            id: newImage.id,
            url: newImage.url,
            preview: newImage.preview
        })
    } else {
        res.status = 404
        res.json({
            message: "Group couldn't be found",
            statusCode: 404
        })
    }
})


router.put('/:groupId', requireAuth, async(req, res, next) => {
    const { groupId } = req.params;
    const { name, about, type, private, city, state } = req.body;

    if(!name && !about && !type && !private && !city && !city && !state){
        res.status = 400;
        res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: {
                  name: "Name must be 60 characters or less",
                  about: "About must be 50 characters or more",
                  type: "Type must be 'Online' or 'In person'",
                  private: "Private must be a boolean",
                  city: "City is required",
                  state: "State is required",
                }
        })
    }

   

    let group = await Group.findByPk(groupId);

        if(group){
            group.set({id: groupId});
            group.update({ name, about, type, private, city, state})
            .then(function(group){
                res.json(group);
              })
            .catch(function (err) {
                res.status = 400;
                res.json({
                    message: "Validation Error",
                    statusCode: 400,
                    "errors": {
                        name: "Name must be 60 characters or less",
                        about: "About must be 50 characters or more",
                        type: "Type must be 'Online' or 'In person'",
                        private: "Private must be a boolean",
                        city: "City is required",
                        state: "State is required"
                    }
                })
              });
    
            
        } else {
            res.status = 404;
            res.json({
                message: "Group couldn't be found",
                statusCode: 404
            })
        }
   
        
    
})

router.delete('/:groupId', async(req, res, next) => {
    const { groupId } = req.params;

    let group = await Group.findByPk(groupId)

    if(group){
        await group.destroy()

        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    } else {
        res.status = 404
        res.json({
            message: "Group couldn't be found",
            statusCode: 404
        })
    }
})

router.post('/:groupId/venues', requireAuth, async(req, res, next) => {
    const { groupId } = req.params;
    const { address, city, state, lat, lng } = req.body

    let group = await Group.findByPk(groupId);
    if(group){
        let venue = await group.createVenue({address, city, state, lat, lng})
        .then(function(venue){
            res.json({
                id: venue.id,
                groupId: venue.groupId,
                address: venue.address,
                city: venue.city,
                state: venue.state,
                lat: venue.lat,
                lng: venue.lng
            });
          })
        .catch(function (err) {
            res.status = 400;
            res.json({
                message: "Validation Error",
                statusCode: 400,
                "errors": {
                    address: "Street address is required",
                    city: "City is required",
                    state: "State is required",
                    late: "Latitude is not valid",
                    lng: "Longitude is not valid"
                }
            })
        })
    } else {
        res.status = 404;
        res.json({
            message: "Group couldn't be found",
            statusCode: 404
        })
    }
})

router.post('/:groupId/events', requireAuth, async(req, res, next) => {
    const { groupId } = req.params;
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;

    let group = await Group.findByPk(groupId);

    if(group){
        let event = await group.createEvent({ venueId, name, type, capacity, price, description, startDate, endDate})
        .then(function(event){
            res.json({
               id: event.id,
               groupId: event.groupId,
               venueId: event.venueId,
               name: event.name,
               type: event.type,
               capacity: event.capacity,
               price: event.price,
               description: event.description,
               startDate: event.startDate,
               endDate: event.endDate
            });
          })
        .catch(function (err) {
            res.status = 400;
            res.json({
                message: "Validation Error",
                statusCode: 400,
                "errors": {
                    venueId: "Venue does not exist",
                    name: "Name must be at least 5 characters",
                    type: "Type must be Online or In person",
                    capacity: "Capacity must be an integer",
                    price: "Price is invalid",
                    description: "Description is required",
                    startDate: "Start date must be in the future",
                    endDate: "End date is less than start date",
                }
            })
          });
    } else {
        res.status = 404
        res.json({
           message: "Group couldn't be found",
           stautCode: 404
        })
    }
})


router.get('/:groupId/events', requireAuth, async(req, res, next) => {
    const { groupId } = req.params;

    let payload = [];

  
    let events = await Event.findAll({
        where: { groupId: groupId},
            include: [
                { model: Group, attributes: { exclude: ['createdAt', 'updatedAt'] } }, 
                { model: Venue, attributes: { exclude: ['groupId','createdAt', 'updatedAt'] } },
                { model: User, attributes: [] },
                { model: EventImage, attributes: [], where: { preview: true }},
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt'] ,
                include: [
                    [
                    sequelize.fn("COUNT", sequelize.col("Users.id")), 
                    "numMembers"
                ],
                [
                    sequelize.col('EventImages.url'),'previewImage'
                ] 
                  ]
            },
            group: "Event.id",
        })

    let eventNoPreview = await Event.findAll({
            where: { groupId: groupId},
            include: [
                { model: Group, attributes: { exclude: ['createdAt', 'updatedAt'] } }, 
                { model: Venue, attributes: { exclude: ['groupId','createdAt', 'updatedAt'] } },
                { model: User, attributes: [] },
                { model: EventImage, attributes: [], where: { preview: false}},
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt'] ,
                include: [
                    [
                    sequelize.fn("COUNT", sequelize.col("Users.id")), 
                    "numMembers"
                    ]
                ],
            },
            group: "Event.id",
        })

    for(let i = 0; i < events.length; i++){
        let event = events[i]
        payload.push(event)
    }

    for(let i = 0; i < eventNoPreview.length; i++){
        let event = eventNoPreview[i];
        payload.push(event)
    }

    console.log(payload)

    if(payload.length >= 1){
        res.json({ Events: payload})
    } else {
        res.status = 404;
        res.json({
            message: "Group couldn't be found",
            statusCode: 404
        })
    }
})


router.post('/:groupId/membership', requireAuth, async(req, res, next) => {
    const { groupId, memberId, status } = req.body

    let group = await Group.findByPk(groupId);
    let currentMemberships = await Membership.findAll({where: { id: { [Op.not] : null } }, raw: true})
    for(let i = 0; i < currentMemberships.length; i++){
        let member = currentMemberships[i]
        let valuesForMember = Object.values(member)

        if(Number(valuesForMember[1]) === Number(memberId) 
        && Number(valuesForMember[2] === Number(groupId) 
        && valuesForMember[3] === "pending")){
            res.status = 400;
            return res.json({
                message: "Membership has alread been requested",
                statusCode: 400
        })
        }
     }

    if(group){
        let membership = await Membership.create({
            userId: memberId,
            groupId,
            status
            })
        
        return res.json({
            id: membership.id,
            groupId: membership.groupId, 
            memberId: membership.userId,
            status: membership.status 
        })
    } else {
        res.status = 404;
        return res.json({
            message: "Group couldn't be found",
            statusCode: 404
        })
    }
})


router.put('/:groupId/membership', requireAuth, async(req, res, next) => {
    const { groupId } = req.params
    const { memberId, status } = req.body;
    const { user } = req;

     let currentUser = user.toSafeObject();
     let currentUserId = currentUser.id;

    

    let membership = await Membership.findOne({where: { [Op.and]: [ {userId: memberId}, {groupId} ] } })

    let group = await Group.findByPk(groupId)

    let checkUser = await User.findByPk(currentUserId)
    let currentUserMembership = await Membership.findOne({where: { [Op.and]: [ {userId: currentUserId}, {groupId} ] } })


    if(status === "pending"){
        res.status = 400;
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                status: "Cannot change a membership status to pending"
            }
        })
    }

    if(!group){
        res.status = 400;
        return res.json({
            message: "Group couldn't be found",
            statusCode: 404,
        })
    }

    if(!checkUser){
        res.status = 404;
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                memberId: "User couldn't be found"
            }
        })
    }

    if(!membership){
        res.status = 404;
        return res.json({
            message: "Membership between the user and the group does not exist",
            statusCode: 404
        })
    }

    if(currentUserMembership.status === "organizer"){
        membership.update({status})
        return res.json({
            id: membership.id,
            groupId: membership.groupId,
            memberId: membership.userId,
            status: membership.status
        })
    } else if ( currentUserMembership.status === 'co-host'){
        membership.update(status)
        return res.json({
            id: membership.id,
            groupId: membership.groupId,
            memberId: membership.userId,
            status: membership.status
        })
    } else {
        res.status = 400;
        return res.json({
            message: "User must have correct permissions",
            statusCode: 400
        })
    }
})


module.exports = router;