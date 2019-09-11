const express = require('express');
const asyncHandler = require('express-async-handler');
const Flickr = require('flickr-sdk');
const ImageCtrl = require('../controllers/image.controller');
const flickr = new Flickr(process.env.FLICKR_KEY);
const router = express.Router();
const _ = require('underscore');

router.use((req, res, next) => {
    if (req.isAuthenticated) {
        next();
    }
    else {
        res.status(401);
        res.send({ status: 'error', data: 'Not authenticated' });
    }
})

router.route('/search').get(asyncHandler(search));
router.route('/history').get(asyncHandler(history));
router.route('/like').post(asyncHandler(likePhoto));

async function search(req, res) {
    const query = req.query.q;
    const userId = req.user.id;
    var page = 1;

    if (Number.isInteger(req.query.p) && req.query.p > 0)
        page = req.query.p;

    await ImageCtrl.addSearchHistory(query, userId);

    flickr.photos.search({ text: query, page })
        .then(response => {
            let photos = response.body.photos.photo

            likedPhotos(userId, (ids) => {
                photos = _.chain(photos).map(p => {
                    let liked = _.contains(ids, p.id);
                    return _.extend(p, { liked: liked })
                }).value();

                res.send({ status: 'ok', data: photos });
            });
        })
        .catch(error => {
            res.status(500);
            res.send({ status: 'error', data: error });
        });
}

function likedPhotos(userId, callback) {
    ImageCtrl.loadLikedPhotos(userId).then(photos => {
        callback(_.pluck(photos, 'photoId'))
    }).catch(error => {
        console.log(error)
    })
}

async function history(req, res) {
    const userId = req.user.id;

    ImageCtrl.loadSearchHistory(userId)
        .then(history => {
            res.send({ status: 'ok', data: history })
        })
        .catch(error => {
            res.status(500);
            res.send({ status: 'error', data: error });
        });
}

async function likePhoto(req, res) {
    const photoId = req.body.photoId;
    const userId = req.user.id;

    ImageCtrl.likeImage(photoId, userId).then(result => {
        res.send({ status: 'ok' });
    })
        .catch(error => {
            res.status(500);
            res.send({ status: 'error', data: error });
        });
}

module.exports = router;