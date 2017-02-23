import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import LinearProgress from 'material-ui/LinearProgress';
import Dropzone from 'react-dropzone';
import classNames from 'classnames/bind';
import styles from '../css/components/addImageModal';

const cx = classNames.bind(styles);

// cx('header')

class AddImageModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      files: [],
      loading:false
    };
  }

  onDrop(acceptedFiles) {
    this.setState({
      files: acceptedFiles
    });
  }

  submit() {

    const nameRef = this.refs.nameRef.getValue();
    const questionRef = this.refs.questionRef.getValue();
    const answerRef = this.refs.answerRef.getValue();

    if (this.state.files.length !== 0 && nameRef !== '' && questionRef !== '' && answerRef !== '') {
      this.setState({
        loading:true
      });

      this.props.createImage(this.state.files, nameRef, questionRef, answerRef).then(()=>{
        this.setState({
          files: [],
          loading:false
        })
      }); // this should close the imageModal if succesfull
    } else {
      console.log("ÞAÐ ER ERROR HÖNDLE IT BRUTHER")
    }
  }

  back() {
    this.setState({
      files: []
    })

    this.props.close();

  }

  removeThisImage() {
    this.setState({
      files: []
    });

  }

  render() {
    //TODO PUT INTO COMPONENTS
    const { isOpen, close } = this.props;

    const actions = [<FlatButton
        label="Cancel"
        primary={true}
        onClick={this.back.bind(this)}
        disabled = {this.state.loading}
      />,
      <FlatButton
        label="Add image"
        primary={true}
        keyboardFocused={true}
        onClick={this.submit.bind(this)}
        disabled = {this.state.loading}
      />
    ]

    const dropzone = () => (
      <Dropzone className ={cx("imageDropzone")} onDrop={this.onDrop.bind(this)}>
        <div className = {cx("imageDropzoneText")} >Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
    );

    const imagePreview = () => (
      <div className = {cx("imageWrapper")}>
            <div>{this.state.files.map((file,index) =>
             <img key = {index} className = {cx("imageDropzoneImage")} src={file.preview}/> )}
            </div> 
            <RaisedButton
              onClick ={this.removeThisImage.bind(this)}
              label = "Chose another image"
              secondary={true}
              disabled = {this.state.loading}
            />
        </div>
    )

    const imageTextFields = () => (
     <div className = {cx("addImageModalTextFields")}>
      <TextField
        ref = "nameRef"
        hintText="Nafn"
        floatingLabelText="Nafn"
        type ="text"
        disabled = {this.state.loading}
      />
      <br/>
      <TextField
        ref = "questionRef"
        hintText="Question"
        floatingLabelText="Question"
        type ="text"
        disabled = {this.state.loading}
      />
      <br/>
      <TextField
        ref = "answerRef"
        hintText="Answer"
        floatingLabelText="Answer"
        type ="text"
        disabled = {this.state.loading}
      />
     </div>      
    )

    return (
      <Dialog
        actions={actions}
        modal={false}
        open={isOpen}
        onRequestClose={this.back.bind(this)}
        >
        {this.state.loading && <div style ={{width:'100%'}}>UPPLOADING IMAGE WAIT <LinearProgress mode="indeterminate" /></div> }
        <div className = {cx("addImageModalWrapper")}>
          {this.state.files.length !== 0 ?
            imagePreview()
            :
            dropzone()
          }
          {imageTextFields()}
        </div>
      </Dialog>
    );
  }
}

AddImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  createImage: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
}

export default AddImageModal;
