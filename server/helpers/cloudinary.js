const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'proje-image',
    api_key: '463361924319593',
    api_secret: 'I0wl73bmpgD5QNKmVZprgUqqv3A'
});
module.exports = async (file) => {
    try {
        const imageFile = await cloudinary.uploader.upload(file);
        return imageFile.secure_url;
    } catch (error) {
        return error
    }
    
}