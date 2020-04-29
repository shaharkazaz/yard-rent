const Twitter = require('twitter');
const getUserId = require('../utils/getUserId');
const User = require('../model/user');
const config = require('../utils/config');

const Twitt = new Twitter(config);

module.exports = {
    getTwittsByHashTag: (req, res) => {
        const { hashtag } = req.body;
        const params = {
            q: '#' + hashtag,
            count: 10,
            result_type: 'recent',
            lang: 'en'
        }

        Twitt.get('search/tweets', params, function (err, data, response) {
            if (!err) {
                res.status(200).json({
                    twitts: data.statuses
                })
            } else {
                res.status(500).json({
                    err
                })
            }
        })
    },
    getTwittsByPageName: (req, res) => {
        const { name } = req.body;
        const params = {
            screen_name: name,
            count: 10,
            result_type: 'recent',
            lang: 'en'
        }
        Twitt.get('statuses/user_timeline', params, (err, data, response) => {
            if(!err){
                res.status(200).json({
                    twitts: data
                })
            } else {
                res.status(500).json({
                    err
                })
            }
        })
    },
    postTwitt: async (req, res) => {
        const rewardsPerTwitt = 100;
        const userId = await getUserId(req);
        const {message} = req.body;
        const params = {
            status: message
        }

        /*        Twitt.post('statuses/update', params).then(()=>{

                }).catch(error => {
                    return res.status(500).json({error})
                });*/
        Twitt.post('statuses/update', params, function (err, tweet, response) {
            if (!err) {
                User.findOneAndUpdate({_id: userId}, {$inc: {rewards: rewardsPerTwitt}}).then(() => {
                }).catch(error => {
                    return res.status(500).json({error})
                });
                res.status(200).json({
                    message: 'Posted Successfully'
                })
            } else {
                res.status(500).json({
                    err
                })
            }
        });
    }

};
