import React, { Component } from 'react';
import './index.scss';
import { Modal, Button, Input, Avatar, List } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import * as personnelAction from '../../../action/personnelAction';
import { connect } from 'react-redux';

const { Search } = Input;

class SelectPersonnelModal extends Component {

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

  onSearchPersonnel = (fullName) => {
    this.props.findManyPersonnel({
      // currentPage: current,
      // limit: pageSize,
      fullName,
    });
  }

  onClickPersonnelItem = (item) => {
    this.props.onSelectPersonnel(item);
  }

  render() {
    const { visible, personnelList, isLoading } = this.props;

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
        title={<div style={{ fontSize: 14 }}>Danh sách nhân viên</div>}
        visible={visible}
        footer={footer}
        closable={false}
        onCancel={this.handleCancelModal}
      >
        <Search
          placeholder='Tìm kiếm'
          onSearch={this.onSearchPersonnel}
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
          dataSource={personnelList}
          renderItem={item => (
            <List.Item onClick={() => this.onClickPersonnelItem(item)}>
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

const mapStateToProps = ({ personnel }) => {
  const { personnelList } = personnel;

  return {
    isLoading: personnelList.isLoading,
    personnelList: personnelList.dataList.content,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    findManyPersonnel: (params = {}) => dispatch(personnelAction.findManyPersonnel(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectPersonnelModal);