const multer = require('multer');
const firebase = require('firebase/app');
const {getStorage,ref,getDownloadURL,uploadBytesResumable} = require('firebase/storage');
const firebaseConfigs = require('../firebase/firebase.config.json');
const router = require('express').Router();
const upload = multer({
    storage:multer.memoryStorage()
});
firebase.initializeApp(firebaseConfigs);
const storage = getStorage();
router.post('/image',upload.single('file') , async (req, res) => {
    try {
     const folder = 'medicines';
     const fileName = `${folder}/${req.file.originalname}`;
     const storageRef = ref(storage,fileName);
     const metadata = {
     contentType:req.file.mimetype
     } 
     const snapshot = uploadBytesResumable(storageRef,req.file.buffer, metadata)  ;
     const downloadURL = await getDownloadURL((await snapshot).ref);

     return res.status(201).json({url:downloadURL})
    } catch (error) {
     return res.status(500).json({message:error.message})   
    }
});

module.exports = router