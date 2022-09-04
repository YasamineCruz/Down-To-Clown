const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Venue } = require('../../db/models');

const { Op } = require("sequelize");

const router = express.Router();


router.put('/:venueId', requireAuth, async(req, res, next) => {
    const { venueId } = req.params;
    const { address, city, state, lat, lng } = req.body;
    
    const venue = await Venue.findByPk(venueId)
    
    if(venue){
        venue.set({id: venueId})
        venue.update({address, city, state, lat, lng })
        .then(function(venue){
            return res.json({
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
            return checkErrors(res, err)
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