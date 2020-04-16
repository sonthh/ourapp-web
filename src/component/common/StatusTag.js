import React, { Component } from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';

export default class StatusTag extends Component {

  render = () => {
    const { status } = this.props;

    if (!status) return 'No';

    let color = 'green';
    let text = ''

    if (status === 'INACTIVE') {
      color = 'red';
      text = 'Inactive';
    }
    if (status === 'ACTIVE') {
      color = 'green';
      text = 'Active'
    }

    return (<Tag color={color}>{text}</Tag>);
  }
}

StatusTag.propTypes = {
  status: PropTypes.string,
};
