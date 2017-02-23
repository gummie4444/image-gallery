import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
// import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';


const ImageAdminItem = ({ name, id, question, answer, imageURL, thumbnailURL, destroyImage }) => {

  const onDestroy = () => {
    destroyImage(id);
  };
  return (
    <ListItem
     key={id}
     secondaryText={
     <span>
       {question}<br />
       <span> {answer}</span>
     </span>}
     primaryText={name}
     secondaryTextLines={2}
     rightAvatar={<Avatar icon={<EditIcon />} />}
     leftAvatar={<Avatar size={50} src={'https://s3-eu-west-1.amazonaws.com/photo-app-gudda/' + thumbnailURL} />}
    />
  );
};

ImageAdminItem.propTypes = {
  name: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  destroyImage: PropTypes.func.isRequired,
  thumbnailURL: PropTypes.string,
  imageURL: PropTypes.string
};

export default ImageAdminItem;
