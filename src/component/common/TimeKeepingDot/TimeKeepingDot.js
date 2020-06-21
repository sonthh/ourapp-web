import React, { Component } from 'react';
import './index.scss';

export default class TimeKeepingDot extends Component {

  render = () => {
    const { dotColor, style } = this.props;    

    return (
      <div className='TimeKeepingDot' style={{ ...style, backgroundColor: dotColor }} />
    );
  }
}
