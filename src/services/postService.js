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

module.exports.getAvgWordCount = async (id) => {
    const key = `post::id::${id}::wordLengthCount`;
    if (cacheService.has(key)) {
        return cacheService.get(key)
    }
    const averageWordLength = await sequelize.query(`
    SELECT
        (LENGTH(REPLACE(trim(caption, ' '), ' ', ''))/AVG(LENGTH(trim(caption, ' ')) - LENGTH(REPLACE(trim(caption, ' '), ' ', '')) + 1)) AS avg_length
    FROM
    posts p
    WHERE
    id = ? ;
    `, { replacements: [id], plain: true });
    cacheService.set(key, averageWordLength);
    return averageWordLength;
}