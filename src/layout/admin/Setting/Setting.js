import React, { Component } from 'react';
import './index.scss';
import { Button, Drawer, Radio, Avatar } from 'antd';
import * as appAction from '../../../action/appAction';
import { connect } from 'react-redux';
import responsive from '../../../constant/responsive';
import SettingsIcon from '@material-ui/icons/Settings';
import { Tooltip } from '@material-ui/core';

class Setting extends Component {

  state = {
    visible: false,
    isLargeScreen: true,
  };

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
  };

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
  };

  render() {
    return (
      <>
        <Drawer
          className='SettingDrawer'
          width={'auto'}
          placement='right'
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
          title='Cài đặt'
        >
          <div className={'SettingContainer'}>
            <div style={{ marginTop: 20, marginBottom: 14 }}>Kiểu menu</div>
            <Radio.Group onChange={this.onChangeNavigationMode} defaultValue={this.props.navigationMode}>
              <Radio value='horizontal'>
                Trên
            </Radio>
              <Radio value='vertical' disabled={!this.state.isLargeScreen}>
                Bên trái
            </Radio>
            </Radio.Group>
            <div style={{ marginTop: 20, marginBottom: 14 }}>Thành viên nhóm 1</div>
            <div>
              <Tooltip placement='bottom-start' title='Leader'>
                <Avatar className={'avatar'} src="https://res.cloudinary.com/ourapp-upload/image/upload/v1588564716/67403831_2356011294616988_4352344051870072832_o_uixydl.jpg" />
              </Tooltip>
              <Tooltip placement='bottom-start' title='Backend'>
                <Avatar className={'avatar'} src="https://res.cloudinary.com/ourapp-upload/image/upload/v1588564799/53899643_2012404435732649_5572488971549671424_n_whci1t.jpg" />
              </Tooltip>
              <Tooltip placement='bottom-start' title='Frontend'>
                <Avatar className={'avatar'} src="https://res.cloudinary.com/ourapp-upload/image/upload/v1588564892/58462971_1150803888432699_5280383882061938688_n_wpauci.jpg" />
              </Tooltip>
              <Tooltip placement='bottom-start' title='Backend'>
                <Avatar className={'avatar'} src="https://res.cloudinary.com/ourapp-upload/image/upload/v1588564892/60449197_1180051765507833_4261348095893176320_n_c7y7tm.jpg" />
              </Tooltip>
            </div>
          </div>
        </Drawer>
        <Button onClick={this.showDrawer} className='btn-setting' type='primary' icon={<SettingsIcon className='setting-icon' />} />
      </>
    );
  }
}

const mapStateToProps = ({ app }) => {
  const { navigationMode } = app;
  return {
    navigationMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeNavigationMode: (navigationMode) => dispatch(appAction.changeNavigationMode(navigationMode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
