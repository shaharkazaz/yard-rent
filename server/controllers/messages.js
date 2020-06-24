const Message = require('../model/message');
const User = require('../model/user');


module.exports = {
    getUserMessages: (req, res) => {
        const userId = req.params.userId;
        User.findOne({_id:userId,isDeleted: false}, {_id: 0, message: 1}).sort({date: 'desc'}).populate('message').then((user) => {
            res.status(200).json(user.message)
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    getUserNewMessages: (req, res) => {
        const userId = req.params.userId;
        User.findOne({_id:userId,isDeleted: false}).sort({date: 'desc'}).populate(
            {
                path:'message',
                match: { isOpened: false }
            }).then((user) => {
            res.status(200).json(user.message)
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    updateIsOpened: (req, res) => {
        const { flag } = req.body;
        Message.findByIdAndUpdate({_id: req.params.messageId}, { $set: { isOpened : flag }}).then((user) => {
            res.status(200).json(user.message)
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    updateIsArchived: (req, res) => {
        const { flag } = req.body;
        Message.findByIdAndUpdate({_id: req.params.messageId}, { $set: { isArchived : flag }}).then((user) => {
            res.status(200).json(user.message)
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    }
};
