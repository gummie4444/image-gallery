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
      <h1 className={cx('header')}>Um verkefni guddu</h1>
      <div className={cx('description')}>
        <p>gudda er prumpusvin sem langar ekki í vín<br />
          bólgrafin api á minni möguleika að verða ólimpíumeistari í kúluvarpi...
        </p>
      </div>
      <div className={cx('contribute')}>
        <p>her kemur mögulega eh email dot
          emailemail &nbsp;
        </p>
      </div>
    </div>
  );
};

export default About;
