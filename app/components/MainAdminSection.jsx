import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { List } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import ImageAdminItem from './ImageAdminItem';
import AddImageModal from './AddImageModal';

import styles from '../css/components/main-section';


const MainAdminSection = ({ images,openCreateImageModal,closeCreateImageModal,isCreateImageModalOpen,createImage,destroyImage }) => {
  const imageItems = images.map((image) => {
    return (
      <ImageAdminItem
        id={image.id}
        key={image.id}
        name={image.name}
        question={image.question}
        answer={image.answer}
        imageURL={image.imageURL}
        thumbnailURL={image.thumbnailURL}
        destroyImage={destroyImage} />);
  });

  return (
    <div >
      <RaisedButton onClick={openCreateImageModal} label="New image" />
      <List>
        {imageItems}
      </List>

      <AddImageModal
        isOpen = {isCreateImageModalOpen}
        close = {closeCreateImageModal}
        createImage = {createImage}
      />
    </div>
  );
};

MainAdminSection.propTypes = {
  images: PropTypes.array.isRequired,
  openCreateImageModal: PropTypes.func.isRequired,
  closeCreateImageModal: PropTypes.func.isRequired,
  isCreateImageModalOpen: PropTypes.bool.isRequired,
  createImage: PropTypes.func.isRequired,
  destroyImage: PropTypes.func.isRequired,
};

export default MainAdminSection;
