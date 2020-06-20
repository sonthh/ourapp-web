import React, { Component } from 'react';
import './index.scss';

export default class TimeKeepingDot extends Component {

  render = () => {
    const { dotColor } = this.props;

    return (
      <div className='TimeKeepingDot' style={{ backgroundColor: dotColor }} />
    );
  }
}
