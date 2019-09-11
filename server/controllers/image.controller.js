const Joi = require('joi');
const SearchHistory = require('../models/search-history.model');
const Like = require('../models/like.model');

const SearchStorySchema = Joi.object({
  query: Joi.string().required(),
  searchDate: Joi.date(),
  userId: Joi.string().required()
})
const LikedImageSchema = Joi.object({
  photoId: Joi.string().required(),
  userId: Joi.string().required()
})
module.exports = {
  async loadSearchHistory(userId) {
    return await SearchHistory.find({ userId });
  },

  async loadLikedPhotos(userId) {
    return await Like.find({ userId });
  },

  async addSearchHistory(query, userId) {
    let story = Joi.validate({ query, userId }, SearchStorySchema, { abortEarly: false });

    return await new SearchHistory(story.value).save();
  },

  async likeImage(photoId, userId) {
    let like = Joi.validate({ photoId, userId }, LikedImageSchema, { abortEarly: false });

    return await new Like(like.value).save();
  }
}