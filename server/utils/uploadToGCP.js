const {Storage} = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');
const base64Img = require('base64-img');

const configGCP = require('../utils/configGCP');

async function uploadImage(req,res){
    return new Promise(resolve => {
        const bucketName = 'yard-rent.appspot.com';
        const encodedImage = req.body.image;

        // Decode the image
        const generateId = uniqid();
        const filepath = base64Img.imgSync(encodedImage, '', generateId);
        const fullImagePath = "./".concat(filepath);

        configGCP.project_id;
        // Init the Google Cloud client library
        const storage = new Storage({credentials: configGCP});

        // Uploads a local file to the bucket
        storage.bucket(bucketName).upload(fullImagePath).then(data => {
            // Uploaded successfully + Delete local file from server
            fs.unlink(fullImagePath, (err) => {
                if (err) {console.error(err)}
                //file removed
            });
            resolve("https://storage.googleapis.com/yard-rent.appspot.com/".concat(filepath));
        }).catch(err =>{
            // Failed to upload
            console.log(err);
            fs.unlink(fullImagePath, (err) => {
                if (err) {console.error(err)}
                //file removed
            });
            return res.status(500).json({
                message: 'Failed to upload image' + err
            });
        });
    });
}

module.exports = uploadImage;