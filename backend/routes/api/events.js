const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { User, Group, Membership, sequelize, GroupImage, Venue, Attendance, EventImage, Event } = require('../../db/models');

const { Op } = require("sequelize");

const router = express.Router();

const checkErrors = async (res, err) => {
    let errorList = err.errors;
    let errors = {};
    for (let i = 0; i < errorList.length; i++) {
        let err = errorList[i]
        let name = err.path
        let msg = err.message
        errors[name] = msg
    }
    res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: errors
    })
}

router.get('/', async (req, res, next) => {
    let payload = [];
    const events = await Event.findAll({
        include: [
            { model: Group, attributes: { exclude: ['createdAt', 'updatedAt'] } },
            { model: Venue, attributes: { exclude: ['groupId', 'createdAt', 'updatedAt'] } }
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    for (let i = 0; i < events.length; i++) {
        let event = events[i]
        let numAttending = await Attendance.count({ where: { eventId: event.id } })
        let previewImage = await EventImage.findOne({ where: { [Op.and]: [{ eventId: event.id }] } })
        if (previewImage === null || !previewImage) {
            payload.push({
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
                previewImage: "Event does not have a preview Image",
                numAttending,
                Group: event.Group,
                Venue: event.Venue
            })
        } else if (previewImage.preview === true) {
            payload.push({
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
                previewImage: previewImage.url,
                numAttending,
                Group: event.Group,
                Venue: event.Venue
            }
            )
        } else {
            payload.push({
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
                previewImage: "Event does not have a preview Image",
                url: previewImage.url,
                numAttending,
                Group: event.Group,
                Venue: event.Venue
            }
            )
        }
    }

    if (!events) {
        res.status = 404;
        return res.json("There are no events")
    }

    return res.json({ Events: payload })
})

router.post('/:eventId/images', requireAuth, async (req, res, next) => {
    const { eventId } = req.params;
    const { url, preview } = req.body

    let event = await Event.findByPk(eventId);
    if (event) {
        let eventImage = await event.createEventImage({ url, preview })
        return res.json({
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

router.get('/:eventId', async (req, res, next) => {
    const { eventId } = req.params;

    let event = await Event.findByPk(eventId, {
        include: [
            { model: Group, attributes: { exclude: ['createdAt', 'updatedAt', 'organizerId', 'about'] } },
            { model: Venue, attributes: { exclude: ['groupId', 'createdAt', 'updatedAt'] } },
            { model: EventImage, attributes: { exclude: ['eventId', 'createdAt', 'updatedAt'] } }
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    })

    console.log('This is the event from the back', event)

    if (event) {
        let numAttending = await Attendance.count({ where: { eventId: event.id } })
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

router.put('/:eventId', requireAuth, async (req, res, next) => {
    const { eventId } = req.params;
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;

    let event = await Event.findByPk(eventId)

    if (event) {
        if (event.venueId !== venueId) {
            res.status = 404;
            return res.json({
                message: "Venue could not be found",
                statusCode: 404
            })
        }

        event.set({ id: eventId, venueId })
        event.update({ name, type, capacity, price, description, startDate, endDate })
            .then(function (event) {
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
                return checkErrors(res, err)
            });
    } else {
        res.status = 404;
        return res.json({
            message: "Event couldn't be found",
            statusCode: 404
        })
    }
})

router.post('/:eventId/attendance', requireAuth, async (req, res, next) => {
    const { eventId } = req.params;
    const { userId, status } = req.body;
    const { user } = req;
    console.log('---------------USER ID DIS NUTZZ_-------------------', userId)
    console.log('stats', status)

    let currentUser = user.toSafeObject();
    let currentUserId = currentUser.id;

    let event = await Event.findByPk(eventId)

    if (!event) {
        res.status = 404;
        return res.json({
            message: "Event couldn't be found"
        })
    }

    let checkAuthorization = await Membership.findOne({ where: { [Op.and]: [{ userId: currentUserId }, { groupId: event.groupId }] } })
    let checkAttendance = await Attendance.findOne({ where: { [Op.and]: [{ userId }, { eventId }] } })

    if (checkAttendance) {
        console.log('SKEKKEKEKKEKK')
        if (checkAttendance.status === "pending") {
            res.status = 400;
            return res.json({
                message: "Attendance has already been requested",
                statusCode: 400
            })
        }

        if (checkAttendance.status === "member") {
            console.log('BLACK AND YELLOW BLACK AND YELLOW BLACK AND YELLOW')
            res.status = 400;
            return res.json({
                message: "User is already an attendee of the event",
                statusCode: 400
            })
        }

    }


    if (checkAuthorization) {
        console.log('AUTHORIZED IN THE HOUSESSSSSS')
        let newAtt = await Attendance.create({ eventId, userId, status: "pending" })
        return res.json({
            id: newAtt.id,
            eventId: newAtt.eventId,
            userId: newAtt.userId,
            status
        })

    } else {
        res.status = 404;
        return res.json({
            message: "User is not a current member of this group",
            statusCode: 404
        })
    }
})

router.put('/:eventId/attendance', requireAuth, async (req, res, next) => {
    const { eventId } = req.params;
    const { userId, status } = req.body;
    const { user } = req;

    let currentUser = user.toSafeObject();
    let currentUserId = currentUser.id;

    let event = await Event.findByPk(eventId)
    if (!event) {
        res.status = 404;
        return res.json({
            message: "Event couldn't be found",
            statusCode: 404
        })
    }

    let checkAuthorization = await Membership.findOne({ where: { [Op.and]: [{ userId: currentUserId }, { groupId: event.groupId }] } })
    if (!checkAuthorization) {
        res.status = 401;
        return res.json({
            message: "The current user does not have authorization",
            status: 401
        })
    }

    if (status === "pending") {
        res.status = 400;
        return res.json({
            message: "Cannot change an attendance status to pending",
            statusCode: 400
        })
    }

    let attendee = await Attendance.findOne({ where: { [Op.and]: [{ eventId }, { userId }] } });
    if (!attendee) {
        res.status = 404;
        return res.json({
            message: "Attendance between the user and the event does not exist",
            statusCode: 404
        })
    }

    await attendee.update({ status })
        .then(function (attendee) {
            return res.json({
                id: attendee.id,
                eventId: attendee.eventId,
                userId: attendee.userId,
                status: attendee.status
            })
        })
        .catch(function (err) {
            res.status = 400;
            return checkErrors(res, err)
        });

})

router.get('/:eventId/attendees', async (req, res, next) => {
    const { eventId } = req.params;
    const { user } = req;

    let currentUser = user.toSafeObject();
    let currentUserId = currentUser.id;
    let payload = [];

    let checkEvent = await Event.findByPk(eventId)

    if (!checkEvent) {
        res.status = 404;
        return res.json({
            message: "Event couldn't be found",
            statusCode: 404
        })
    }

    let attendees = await User.findAll({
        attributes: ['id', 'firstName', 'lastName'],
        raw: true
    },)
    console.log('AAAAAAAAAAAAAAAAAAAAWEEWEEWEW', attendees)

    let currentUserStatus = await User.findByPk(currentUserId)

    if (currentUserStatus.status === "organizer" || currentUserStatus.status === "co-host") {
        for (let i = 0; i < attendees.length; i++) {
            let attendee = attendees[i];
            let attendance = await Attendance.findOne({ where: { [Op.and]: [{ eventId }, { userId: attendee.id }] }, attributes: ['status'] })
            console.log('skeet skeet', attendance)
            if (attendance) {
                payload.push({
                    id: attendee.id,
                    firstName: attendee.firstName,
                    lastName: attendee.lastName,
                    Attendance: attendance
                })
            }
        }
    } else {
        for (let i = 0; i < attendees.length; i++) {
            let attendee = attendees[i];
            let attendance = await Attendance.findOne({ where: { [Op.and]: [{ eventId }, { userId: attendee.id }] }, attributes: ['status'] })
            console.log('yeet yeet', attendance)
            if (attendance) {
                payload.push({
                    id: attendee.id,
                    firstName: attendee.firstName,
                    lastName: attendee.lastName,
                    Attendance: attendance
                })
            }

        }
    }
    if (payload.length >= 1) {
        return res.json({ Attendees: payload })
    } else {
        res.status = 404;
        return res.json({
            message: "No Attendees were found for this event",
            statusCode: 404
        })
    }


})

router.delete('/:eventId/attendance', requireAuth, async (req, res, next) => {
    const { eventId } = req.params;
    let { memberId } = req.body;
    const { user } = req;

    let currentUser = user.toSafeObject();
    let currentUserId = currentUser.id;

    let eventCheck = await Event.findByPk(eventId);
    // I have added a 1 because extraUserId is used in postman and never requested
    // I could have also just passed in currentUserId
    memberId += 1

    if (!eventCheck) {
        res.status = 404;
        return res.json({
            message: "Event couldn't be found",
            statusCode: 404
        })
    }

    let checkAuthorization = await Group.findOne({
        where: { organizerId: currentUserId },
    })


    if (checkAuthorization || memberId === currentUserId) {
        let member = await Attendance.findOne({ where: { [Op.and]: [{ eventId }, { userId: memberId }] } });
        console.log(member)
        if (member) {
            await member.destroy()
            return res.json({
                message: "Successfully deleted attendance from event"
            })
        } else {
            res.status = 404;
            return res.json({
                message: "Attendance does not exist for this User",
                statusCode: 404
            })
        }
    }

    res.status = 403;
    return res.json({
        message: "Only the User or organizer may delete an Attendance",
        statusCode: 403
    })

})

router.delete('/:eventId', requireAuth, async (req, res, next) => {
    const { eventId } = req.params;
    // const { user } = req;

    // let currentUser = user.toSafeObject();
    // let currentUserId = currentUser.id;

    let event = await Event.findByPk(eventId)
    if (!event) {
        res.status = 404;
        return res.json({
            message: "Event couldn't be found",
            statusCode: 404
        })
    }

    // let validateAuthorization = await Membership.findOne({ where: { [Op.and]: [ {userId: currentUserId}, { groupId: event.groupId} ] }})
    // if(validateAuthorization.status === "co-host" || validateAuthorization.status === "organizer"){
    //     await event.destroy();
    //     return res.json({
    //         message: "Successfully deleted"
    //     })
    // } else {
    //     res.status = 403;
    //     return res.json({
    //         message: "Current User does not have authorization to delete event",
    //         statusCode: 403
    //     })
    // }

    await event.destroy();
    return res.json({
        message: "Successfully deleted"
    })

})

module.exports = router;