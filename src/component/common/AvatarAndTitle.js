import React, { Component } from 'react';
import { Avatar } from 'antd';
import PropTypes from 'prop-types';
import { randomColor } from '../../constant/colors'

export default class AvatarAndTitle extends Component {

  render = () => {
    const { src, title } = this.props;

    if (src) {
      return (
        <>
          <Avatar src={src} />
          <span style={{ paddingLeft: '10px' }}>{title ? title : 'No'}</span>
        </>
      );
    }

    const color = randomColor();
    const backgroundColor = randomColor();
    let text = 'No';
    if (title && title.length > 0) {
      text = title[0].toUpperCase();
    }

    return (
      <>
        <Avatar style={{ color, backgroundColor }}>{text}</Avatar>
        <span style={{ paddingLeft: '10px' }}>{title ? title : 'No'}</span>
      </>
    );
  }
}

AvatarAndTitle.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
};
