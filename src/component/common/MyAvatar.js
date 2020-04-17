import React, { Component } from 'react';
import { Avatar } from 'antd';
import PropTypes from 'prop-types';

export default class MyAvatar extends Component {

  render = () => {
    const { src, title } = this.props;

    if (src) {
      return (
        <Avatar src={src} />
      );
    }

    const color = '#cccccc';
    const backgroundColor = '#e6f7fe';
    let text = 'N';

    if (title && title.length > 0) {
      text = title[0].toUpperCase();
    }

    return (
      <Avatar style={{ color, backgroundColor }}>{text}</Avatar>
    );
  }
}

MyAvatar.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
};
