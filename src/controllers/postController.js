const postService = require('../services/postService')

module.exports.createPost = async (req, res, next) => {
    const uuid = req.body.uuid;
    const caption = req.body.caption;

    const post = await postService.createPost(uuid, caption);

    res.json({
        post,
        message: 'success',
    });
}

module.exports.getAnalysis = async (req, res, next) => {
    const id = req.params.id;

    const wordCountData = await postService.getCaptionWordCount(id);

    const averageWordCountData = await postService.getAvgWordCount(id);

    res.json({
        message: 'success',
        wordCount: wordCountData.count,
        averageWordLengthCount: averageWordCountData.avg_length
    });
}