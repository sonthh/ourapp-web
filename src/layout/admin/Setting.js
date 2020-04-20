import React, { Component } from 'react';
import { Button, Drawer, Radio } from 'antd';
import {
  SettingTwoTone,
} from '@ant-design/icons';
import * as appAction from '../../action/appAction';
import { connect } from 'react-redux';
import responsive from '../../constant/responsive';

class Setting extends Component {

  state = {
    visible: false,
    isLargeScreen: true,
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  resize = () => {
    const { innerWidth } = window;
    const isLargeScreen = innerWidth >= responsive.md;

    if (isLargeScreen !== this.state.isLargeScreen) {
      this.setState({ isLargeScreen });
    }
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChangeNavigationMode = (e) => {
    const mode = e.target.value;
    this.props.changeNavigationMode(mode);
  }

  render() {
    return (
      <>
        <Drawer
          width={'auto'}
          placement='right'
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
          title='Setting'
        >
          <div>Navigation mode</div>
          <Radio.Group onChange={this.onChangeNavigationMode} defaultValue={this.props.navigationMode}>
            <Radio.Button value='horizontal'>
              Horizontal
            </Radio.Button>
            <Radio.Button value='vertical' disabled={!this.state.isLargeScreen}>
              Vertical
            </Radio.Button>
          </Radio.Group>
        </Drawer>
        <Button onClick={this.showDrawer} className='btn-setting' type='primary' icon={<SettingTwoTone />} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    navigationMode: state.app.navigationMode,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeNavigationMode: (navigationMode) => {
      dispatch(appAction.changeNavigationMode(navigationMode));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
