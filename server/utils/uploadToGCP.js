const {Storage} = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');
const base64Img = require('base64-img');

const configGCP = require('../utils/configGCP');


const uploadToGCP = async (req) => {
    const bucketName = 'yard-rent.appspot.com';
    const encodedImage = req.body.image;
    //console.log(req);
    // Decode the image - new
    const generateId = uniqid();
    const filepath = base64Img.imgSync(encodedImage, '', generateId);
    var fullImagePath = "./".concat(filepath)

    // Imports the Google Cloud client library
    const projectId = 'yard-rent'
    //const keyFilename = './YardRent-3e6b50e1be31.json'
    const storage = new Storage({credentials: configGCP});

    // Uploads a local file to the bucket
    await storage.bucket(bucketName).upload(fullImagePath).then(data => {
        // Uploaded successfully + Delete local file from server
        console.log("inside Data scope");
        fs.unlink(fullImagePath, (err) => {
            if (err) {console.error(err)}
            //file removed
        });
        //return "https://storage.googleapis.com/yard-rent.appspot.com/".concat(filepath)
        return "blabla";
    }).catch(err =>{
        // Failed to upload
        //console.log("ERR: failed to upload image to Google Cloud Storage")
        console.log(err);
        fs.unlink(fullImagePath, (err) => {
            if (err) {console.error(err)}
            //file removed
        });
    });
}

async function uploadImage(req){
    return new Promise(resolve => {
        const bucketName2 = 'yard-rent.appspot.com';
        const encodedImage = req.body.image;
        //console.log(req);
        // Decode the image - new
        const generateId = uniqid();
        const filepath = base64Img.imgSync(encodedImage, '', generateId);
        const fullImagePath = "./".concat(filepath)

        // Imports the Google Cloud client library
        const projectId = 'yard-rent'
        //const keyFilename = './YardRent-3e6b50e1be31.json'
        const storage = new Storage({credentials: configGCP});

        // Uploads a local file to the bucket
        storage.bucket(bucketName2).upload(fullImagePath).then(data => {
            // Uploaded successfully + Delete local file from server
            console.log("inside Data scope");
            fs.unlink(fullImagePath, (err) => {
                if (err) {console.error(err)}
                //file removed
            });
            resolve("https://storage.googleapis.com/yard-rent.appspot.com/".concat(filepath));
        }).catch(err =>{
            // Failed to upload
            //console.log("ERR: failed to upload image to Google Cloud Storage")
            console.log(err);
            fs.unlink(fullImagePath, (err) => {
                if (err) {console.error(err)}
                //file removed
            });
        });
    });
}


module.exports = uploadImage;