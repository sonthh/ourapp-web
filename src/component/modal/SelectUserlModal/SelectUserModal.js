import React, { Component } from 'react';
import './index.scss';
import { Modal, Button, Input, Avatar, List } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import * as userAction from '../../../action/userAction';
import { connect } from 'react-redux';

const { Search } = Input;

class SelectUserModal extends Component {

  componentDidMount() {
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleCancelModal = () => {
    this.props.onClose();
  }

  handleOk = () => {
    this.props.onOk();
  }

  onSearchUser = (fullName) => {
    this.props.findManyUsers({
      // currentPage: current,
      // limit: pageSize,
      fullName,
    });
  }

  onClickUserItem = (item) => {
    this.props.onSelectUser(item);
  }

  render() {
    const { visible, userList, isLoading } = this.props;

    const footer = (
      <div className='modal-footer-wrapper'>
        <Button
          size='small'
          onClick={this.handleCancelModal}
        >
          Đóng
        </Button>
        <Button
          size='small'
          type='primary'
          onClick={this.handleOk}
        >
          OK
        </Button >
      </div>
    );

    return (
      <Modal
        className='SelectPersonnalModal'
        title={<div style={{ fontSize: 14 }}>{this.props.title || 'Danh sách nhân viên'}</div>}
        visible={visible}
        footer={footer}
        closable={false}
        onCancel={this.handleCancelModal}
      >
        <Search
          placeholder='Tìm kiếm'
          onSearch={this.onSearchUser}
        />
        <List
          className='personnel-list'
          loading={{
            spinning: isLoading,
            indicator: (<LoadingOutlined />),
          }}
          locale={{
            emptyText: (
              <div style={{ padding: 0 }}>
                {isLoading === true ? 'Đang tải dữ liệu' : 'Không tìm thấy dữ liệu'}
              </div>
            ),
          }}
          itemLayout="horizontal"
          dataSource={userList}
          renderItem={item => (
            <List.Item onClick={() => this.onClickUserItem(item)}>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={item.fullName}
                description={item.phoneNumber}
              />
            </List.Item>
          )}
        />
      </Modal >
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { userList } = user;

  return {
    isLoading: userList.isLoading,
    userList: userList.dataList.content,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    findManyUsers: (params = {}) => dispatch(userAction.findManyUsers(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectUserModal);