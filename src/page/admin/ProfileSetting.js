import React, { Component } from 'react';
import { Breadcrumb, Tabs } from 'antd';
import responsive from '../../constant/responsive'

const { TabPane } = Tabs;

export default class ProfileSetting extends Component {

  state = {
    position: 'left',
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  resize = () => {
    const { innerWidth } = window;
    const isLargeScreen = innerWidth >= responsive.md;
    const position = isLargeScreen ? 'left' : 'top';

    if (position !== this.state.position) {
      this.setState({ position });
    }
  }

  render() {
    return (
      <>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Profile</Breadcrumb.Item>
        </Breadcrumb>
        <Tabs defaultActiveKey="1" tabPosition={this.state.position}>
          <TabPane tab="Basic Settings" key="1">
            Content of Tab Pane 1
        </TabPane>
          <TabPane tab="Security Settings" key="2">
            Content of Tab Pane 2
        </TabPane>
          <TabPane tab="Account Binding" key="3">
            Content of Tab Pane 3
        </TabPane>
          <TabPane tab="Message Notification" key="4">
            Content of Tab Pane 4
        </TabPane>
        </Tabs>
      </>
    );
  }
}
