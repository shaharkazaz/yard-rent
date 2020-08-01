const Message = require('../model/message');
const User = require('../model/user');


module.exports = {
    getUserMessages: (req, res) => {
        const userId = req.params.userId;
        User.findOne({_id:userId,isDeleted: false}, {_id: 0, message: 1}).populate({path: 'message', options: { sort: { 'date': -1 } } }).then((user) => {
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
                match: { isOpened: false, isArchived: false }
            }).then((user) => {
            res.status(200).json(user.message)
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    updateIsOpened: (req, res) => {
        const { isOpened } = req.body;
        Message.findByIdAndUpdate({_id: req.params.messageId}, { $set: { isOpened : isOpened }}).then((user) => {
            res.status(200).json(user.message)
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    updateIsArchived: (req, res) => {
        const { isArchived } = req.body;
        Message.findByIdAndUpdate({_id: req.params.messageId}, { $set: { isArchived : isArchived }}).then((user) => {
            res.status(200).json(user.message)
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    }
};
