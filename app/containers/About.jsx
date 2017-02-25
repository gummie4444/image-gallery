import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/about';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const About = () => {
  return (
    <div className={cx('about')}>
      <h1 className={cx('header')}>About this</h1>
      <div style = {{textAlign:'center'}} className={cx('description')}>
        <p>Twenty something someone trying to do something, with nothing and everything.
          <br/>
          <br/>
          Rules:<br/>
          <span>1. Talk to a stranger</span><br/>
          <span>2. One shot on a disposable camera</span><br/>
          <span>3. One question that contains the word ''best''</span><br/>        
        </p>
        <br/>
        <p> bytheway my name is gudda loooovling</p>
      </div>
    </div>
  );
};

export default About;
