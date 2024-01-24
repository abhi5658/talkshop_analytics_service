const { Post, sequelize } = require('../models');
const cacheService = require('./cacheService');
const avgWordCountkey = `post::global::avgWordCount`;

module.exports.createPost = async (uuid, caption) => {
    const post = await Post.create({
        uuid,
        caption,
    });
    cacheService.del(avgWordCountkey);
    return post;
}

module.exports.getCaptionWordCount = async (id) => {
    const key = `post::id::${id}::wordCount`;
    if (cacheService.has(key)) {
        return cacheService.get(key)
    }

    const wordCountData = await sequelize.query(`
        SELECT
            LENGTH(trim(caption, ' ')) - LENGTH(REPLACE(trim(caption, ' '), ' ', '')) + 1 AS count
        FROM posts p where id = ?;
        `, { replacements: [id], plain: true });

    cacheService.set(key, wordCountData);
    return wordCountData;
}

module.exports.getAvgWordCount = async () => {
    if (cacheService.has(avgWordCountkey)) {
        return cacheService.get(avgWordCountkey)
    }
    const averageWordCountData = await sequelize.query(`
        SELECT
            AVG(LENGTH(trim(caption, ' ')) - LENGTH(REPLACE(trim(caption, ' '), ' ', '')) + 1) AS count
        FROM posts p ;
    `, { plain: true });
    cacheService.set(avgWordCountkey, averageWordCountData);
    return averageWordCountData;
}