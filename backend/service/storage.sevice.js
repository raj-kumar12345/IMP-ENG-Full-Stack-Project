const ImageKit = require("imagekit");

const storageInstance = new ImageKit({

    publicKey: process.env.IMG_KIT_PUB_KEY,
    privateKey: process.env.IMG_KIT_PRI_KEY,
    urlEndpoint: process.env.IMG_KIT_URL_END,

})


let sendToImgKit = async (file,fileName) =>{

    let res = await storageInstance.upload({
        file,
        fileName,
        folder: "imp-english"
    })
    return res;
}


module.exports = sendToImgKit