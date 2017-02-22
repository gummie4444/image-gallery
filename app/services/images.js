import axios from 'axios';

const service = {
  getImages: () => axios.get('/images')
};

export default service;
