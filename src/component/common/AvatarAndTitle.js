import React, { Component } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

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

    return (
      <>
        <Avatar icon={<UserOutlined />} />
        <span style={{ paddingLeft: '10px' }}>{title ? title : 'No'}</span>
      </>
    );
  }
}
