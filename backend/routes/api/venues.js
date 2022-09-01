const express = require('express');

const { restoreUser, requireAuth } = require('../../utils/auth');
const { User, Group, Membership, sequelize, GroupImage, Venue, Attendance } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require("sequelize");
const groupimage = require('../../db/models/groupimage');

const router = express.Router();


router.put('/:venueId', requireAuth, async(req, res, next) => {
    const { venueId } = req.params;
    const { address, city, state, lat, lng } = req.body;
    
    const venue = await Venue.findByPk(venueId)
    
    if(venue){
        venue.set({id: venueId})
        venue.update({address, city, state, lat, lng })
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
          });
    } else {
        res.status = 404
        res.json({
            message: "Venue couldn't be found",
            statusCode: 404
        })
    }
})

module.exports = router;