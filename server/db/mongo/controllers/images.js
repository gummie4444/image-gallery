import _ from 'lodash';
import path from 'path';

import Images from '../models/images';

/**
 * List
 */
export function all(req, res) {
  Images.find({}).exec((err, images) => {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }
    return res.json(images);
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
    const newImage = new Images();
    newImage.name = req.body.name;
    newImage.question = req.body.question;
    newImage.answer = req.body.answer;
    newImage.imageURL = req.file.filename;
    newImage.id = req.body.id;
    newImage.thumbnailURL = req.file.filename; // TODO BETTER

    newImage.save((err,image)=> {
      if (err)
        return res.stats(400).send(err);
      return res.status(200).json(newImage);
    });
   }
  else {
    res.status(400).send('Could not uppload image');
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
