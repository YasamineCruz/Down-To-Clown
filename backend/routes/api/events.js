const express = require('express');

const { restoreUser, requireAuth } = require('../../utils/auth');
const { User, Group, Membership, sequelize, GroupImage, Venue, Attendance, EventImage, Event } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require("sequelize");
const groupimage = require('../../db/models/groupimage');

const router = express.Router();

let checkEventAuth = async(userId) => {
    let check = await Attendance.findOne({where: { userId: userId }})

    if(check){
        next()
    } else {
        const err = new Error('Unauthorized');
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 401;
        return next(err);
    }
}

router.get('/', requireAuth, async(req, res, next) => {
    const events = await Event.findAll({
        include: [
            { model: Group, attributes: { exclude: ['createdAt', 'updatedAt'] } }, 
            { model: Venue, attributes: { exclude: ['groupId','createdAt', 'updatedAt'] } }
        ],
        attributes: { exclude: ['createdAt', 'updatedAt']}
    })

    res.json({Events: events})
})

router.post('/:eventId/images', requireAuth, async(req, res, next) => {
    const { eventId } = req.params;
    const { url, preview } = req.body

    let event = await Event.findByPk(eventId);
    if(event){
        let eventImage = await event.createEventImage({url, preview})
        res.json({
                id: eventImage.id,
                url: eventImage.url,
                preview: eventImage.preview
        })
    } else {
        res.status = 404,
        res.json({
            message: "Event couldn't be found",
            statusCode: 404
        })
    }
})

router.get('/:eventId', requireAuth, async(req, res, next) => {
    const { eventId } = req.params;

    let event = await Event.findByPk(eventId, {
        include: [
            { model: Group, attributes: { exclude: ['createdAt', 'updatedAt', 'organizerId', 'about'] } }, 
            { model: Venue, attributes: { exclude: ['groupId','createdAt', 'updatedAt'] } },
            { model: EventImage, attributes: { exclude: ['eventId', 'createdAt', 'updatedAt'] } }
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
     })

    if(event){
        let numAttending = await Attendance.count({where: {eventId: event.id}})
        res.json({
            id: event.id,
            groupId: event.groupId,
            venueId: event.venueId,
            name: event.name,
            description: event.description,
            type: event.type,
            capacity: event.capacity,
            price: event.price,
            startDate: event.startDate,
            endDate: event.endDate,
            numAttending,
            Group: event.Group,
            Venue: event.Venue,
            EventImages: event.EventImages
        })
    } else {
        res.status = 404;
        res.json({
            message: "Event couldn't be found",
            statusCode: 404
        })
    }
})

router.put('/:eventId', requireAuth, async(req, res, next) => {
    const { eventId } = req.params;
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;

    let event = await Event.findByPk(eventId)
    
    if(event){
        if(event.venueId !== venueId){
            res.status = 404;
            return res.json({
                message: "Venue could not be found",
                statusCode: 404
            })
        }

        event.set({id: eventId, venueId})
        event.update({name, type, capacity, price, description, startDate, endDate})
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
                    address: "Street address is required",
                    city: "City is required",
                    state: "State is required",
                    lat: "Latitude is not valid",
                    lng: "Longitude is not valid",
                }
            })
          });

    } else {
        res.status = 404;
        return res.json({
            message: "Event couldn't be found",
            statusCode: 404
        })
    }
})

module.exports = router;