const {Storage} = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');

const uploadImage = async (req) => {
    const bucketName = 'yard-rent.appspot.com';
    const encodedImage = req.body.image;
    // Decode the image
    const bitmap = new Buffer.from(encodedImage, 'base64');
    const generateId = uniqid();
    const imageUniqueName = generateId.concat('.', "jpg");
    const fullImagePath = "./".concat(imageUniqueName)
    fs.writeFileSync(fullImagePath, bitmap);

    // Imports the Google Cloud client library
    const projectId = 'yard-rent'
    const keyFilename = './YardRent-3e6b50e1be31.json'
    const storage = new Storage({projectId,keyFilename});

    // Uploads a local file to the bucket
    storage.bucket(bucketName).upload(imageUniqueName).then(data => {
        // Uploaded successfully + Delete local file from server
        fs.unlink(fullImagePath, (err) => {
            if (err) {
                console.error(err)
                return
            }
            //file removed
        });
        return "https://storage.googleapis.com/yard-rent.appspot.com/".concat(imageUniqueName)
    }).catch(err =>{
        // Failed to upload
        //console.log("ERR: failed to upload image to Google Cloud Storage")
        console.log(err);
    });
}


module.exports = uploadImage;