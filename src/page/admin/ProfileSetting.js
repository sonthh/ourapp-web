import React, { Component } from 'react';
import { Breadcrumb, Tabs } from 'antd';
import MediaQuery from 'react-responsive'

const { TabPane } = Tabs;

export default class ProfileSetting extends Component {

  renderTabs = (position) => {
    return (
      <Tabs defaultActiveKey="1" tabPosition={position}>
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
    );
  }

  render() {
    return (
      <>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Profile</Breadcrumb.Item>
        </Breadcrumb>
        <MediaQuery maxWidth={767}>
          {this.renderTabs('top')}
        </MediaQuery>
        <MediaQuery minWidth={767}>
          {this.renderTabs('left')}
        </MediaQuery>
      </>
    );
  }
}
