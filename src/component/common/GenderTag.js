import React, { Component } from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';

export default class GenderTag extends Component {

  render = () => {
    const { gender } = this.props;

    if (!gender) return 'No';

    let color = 'green';
    let text = ''

    switch (gender) {
      case 'MALE': {
        color = 'red';
        text = 'Male'
        break;
      }
      case 'FEMALE': {
        color = 'green';
        text = 'Female'
        break;
      }
      default:
        break;
    }

    return (
      <Tag color={color}>{text}</Tag>
    );

  }
}

GenderTag.propTypes = {
  gender: PropTypes.string,
};