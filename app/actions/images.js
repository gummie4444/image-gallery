/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from '../types';

polyfill();

export function makeImageRequest(method, id, data, api = '/image') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}


export function destroy(id) {
  return { type: types.DESTROY_IMAGE, id };
}


export function typing(text) {
  return {
    type: types.TYPING,
    newImage: text
  };
}

export function openCreateImageModal() {
  return {
    type: types.OPEN_CREATE_IMAGE_MODAL
  };
}

export function closeCreateImageModal() {
    return {
    type: types.CLOSE_CREATE_IMAGE_MODAL
  };
}

/*
 * @param data
 * @return a simple JS object
 */
export function createImageRequest(data) {
  return {
    type: types.CREATE_IMAGE_REQUEST,
    id: data.id,
    name: data.name,
    question: data.question,
    answer: data.answer,
    imageURL: data.imageURL || '',
    thumbnailURL: data.thumbnailURL || ''
  };
}

export function createImageSuccess(data) {
  return {
    type: types.CREATE_IMAGE_SUCCESS,
    data: data
  };
}

export function createImageFailure(data) {
  return {
    type: types.CREATE_IMAGE_FAILURE,
    id: data.id,
    error: data.error
  };
}

export function createImageDuplicate() {
  return {
    type: types.CREATE_IMAGE_DUPLICATE
  };
}

// This action creator returns a function,
// which will get executed by Redux-Thunk middleware
// This function does not need to be pure, and thus allowed
// to have side effects, including executing asynchronous API calls.
export function createImage(files, name, question, answer) {
  return (dispatch, getState) => {
    // TODO mabyValidation
    // If the text box is empty
    if (name.trim().length <= 0) return;

    const file = files[0];
    const id = md5.hash(name);
    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters
    const { images } = getState();
    const data = {
      id,
      name,
      question,
      answer,
    };

    // Conditional dispatch
    // If the topic already exists, make sure we emit a dispatch event
    if (images.filter(imageItem => imageItem.id === id).length > 0) {
      // Currently there is no reducer that changes state for this
      // For production you would ideally have a message reducer that
      // notifies the user of a duplicate topic
      return dispatch(createImageDuplicate());
    }

    // First dispatch an optimistic update //maby do not do dis because of file
    //dispatch(createImageRequest(data));

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('question', question);
    formData.append('answer', answer);
    formData.append('id', id);

    return makeImageRequest('post', id, formData)
      .then(res => {
        if (res.status === 200) {
          // We can actually dispatch a CREATE_TOPIC_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          //return res.json();
          // TODO HERE WE ADD THE THUMBNAIL AND IMAGE URL AND ALL THE DATE STUFF

          dispatch(closeCreateImageModal());
          dispatch(createImageSuccess(res.data));
          return res.data;
        }else{
          console.log("should dispatch error");
        }
      })
      .catch((dot) => {
        return dispatch(createImageFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your image'}));
      });
  };
}


export function destroyImage(id) {
  return dispatch => {
    return makeImageRequest('delete', id)
      .then(() => dispatch(destroy(id)))
      .catch(() => dispatch(createImageFailure({id,
        error: 'Oops! Something went wrong and we couldn\'t add your vote'})));
  };
}
