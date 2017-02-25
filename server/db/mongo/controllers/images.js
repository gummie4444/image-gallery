import _ from 'lodash';
import path from 'path';
import AWS from 'aws-sdk'; // MOVE SOMEWHERE
import { AWS_SECRET_ACCESS_ID, AWS_SECRET_ACCESS_SECRET } from '../../../../config/secrets';

import Images from '../models/images';

// MOVE SOMEWHERE
AWS.config.update(
{
  accessKeyId: AWS_SECRET_ACCESS_ID,
  secretAccessKey: AWS_SECRET_ACCESS_SECRET,
  subregion: 'eu-west-1',
});

const s3 = new AWS.S3();

/**
 * List
 */
export function all(req, res) {
  Images.find({}).exec((err, images) => {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }
    return res.json(images.reverse());
  });
}

/**
 * Get single image from server
 */
export function image(req, res) {
  const TARGET_PATH = path.resolve(__dirname,'../server/publics/uploads'); // TODO BETTERUIFEHRIFH
  const targetPath = path.join(TARGET_PATH, req.params.image);

  res.sendFile(targetPath);
}

export function multerMiddleware(req, res, next) {
  return next();
}

/**
 * Add a Topic
 */

export function add(req, res) {


  if (req.file) {
      const imagePath = req.body.id + '-' + req.file.originalname;
     return s3.putObject({
      Bucket: 'photo-app-gudda',
      Key: imagePath,
      Body: req.file.buffer,
      ACL: 'public-read' // ypur permission
    })
     .on('httpUploadProgress', (progress) => { console.log(progress,"progress")})
     .send((err, result) => {
      if (err){
        console.log("errorUpploading");
        return res.status(400).send(err);
      }

      console.log(result,"s3 result");

      const newImage = new Images();
      newImage.name = req.body.name;
      newImage.question = req.body.question;
      newImage.answer = req.body.answer;
      newImage.imageURL = imagePath;
      newImage.id = req.body.id;
      newImage.thumbnailURL = imagePath; // TODO BETTER

       return newImage.save((mongoError,image) => {
        if(mongoError)
           res.status(400).send(mongoError);

         return res.status(200).json(newImage);
      });
    });
  }
  else {
    return res.status(400).send('Could not uppload image');
  }
}

/**
 * Update a topic
 */
export function update(req, res) {
  //TODO
  const query = { id: req.params.id };
  const isIncrement = req.body.isIncrement;
  const isFull = req.body.isFull;
  const omitKeys = ['id', '_id', '_v', 'isIncrement', 'isFull'];
  const data = _.omit(req.body, omitKeys);

  if (isFull) {
    Images.findOneAndUpdate(query, data, (err) => {
      if (err) {
        console.log('Error on save!');
        return res.status(500).send('We failed to save for some reason');
      }

      return res.status(200).send('Updated successfully');
    });
  } else {
    Images.findOneAndUpdate(query, { $inc: { count: isIncrement ? 1 : -1 } }, (err) => {
      if (err) {
        console.log('Error on save!');
        return res.status(500).send('We failed to save for some reason');
      }

      return res.status(200).send('Updated successfully');
    });
  }
}

/**
 * Remove a topic
 */
export function remove(req, res) {
  //TODO
  const query = { id: req.params.id };
  Images.findOneAndRemove(query, (err) => {
    if (err) {
      console.log('Error on delete');
      return res.status(500).send('We failed to delete for some reason');
    }

    return res.status(200).send('Removed Successfully');
  });
}

export default {
  all,
  add,
  update,
  remove,
  image,
  multerMiddleware
};
