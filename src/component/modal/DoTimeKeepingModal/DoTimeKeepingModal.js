import React, { Component } from 'react';
import './index.scss';
import { Modal, Button, List, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import * as timeKeepingAction from '../../../action/timeKeepingAction';
import { connect } from 'react-redux';
import { getDateFormat } from '../../../util/date';
import TimeKeepingDot from '../../common/TimeKeepingDot/TimeKeepingDot';
import { timeKeepingColors } from '../../../constant/colors';
import { getErrorMessage } from '../../../util/get';
import moment from 'moment';

class DoTimeKeepingModal extends Component {

  componentDidMount() {
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { error } = this.props;

    if (error && error !== prevProps.error) {
      if (error) {
        notification.error({
          message: 'Lỗi',
          description: getErrorMessage(error) || 'Something went wrong',
          duration: 2.5,
        });
      }
    }
  }

  onCancel = () => {
    this.props.onCancel();
  }

  onOk = () => {
    this.props.onOk();
  }

  footer = (
    <div className='modal-footer-wrapper'>
      <Button
        size='small'
        onClick={this.onCancel}
      >
        Đóng
      </Button>
      <Button
        size='small'
        type='primary'
        onClick={this.onOk}
      >
        OK
      </Button >
    </div>
  );

  listTimeKeepingStatus = [
    {
      value: 'Đúng giờ',
      title: 'Đúng giờ',
    },
    {
      value: 'Vào trễ',
      title: 'Vào trễ',
    },
    {
      value: 'Vắng mặt',
      title: 'Vắng mặt',
    },
  ];

  onChooseDoKeeping = (keepingStatus) => {
    const { value } = keepingStatus;
    const { personnel = {}, day } = this.props;
    const date = moment(day).format('YYYY-MM-DD');

    const timeKeepingRequest = {
      date,
      status: value,
    }
    this.props.createTimeKeeping(personnel.id, timeKeepingRequest);
  }

  render() {
    const { visible, personnel = {}, day } = this.props;
    let title = '';
    if (personnel) {
      title = `${personnel?.fullName} vào ${getDateFormat(day)}`;
    }

    return (
      <Modal
        className={'DoTimeKeepingModal'}
        title={title}
        visible={visible}
        footer={this.footer}
        onCancel={this.onCancel}
      >
        <List
          className='time-keeping-status-list'
          loading={{
            spinning: false,
            indicator: (<LoadingOutlined />),
          }}
          locale={{
            emptyText: (
              <div style={{ padding: 0 }}>
                {false === true ? 'Đang tải dữ liệu' : 'Không tìm thấy dữ liệu'}
              </div>
            ),
          }}
          itemLayout="horizontal"
          dataSource={this.listTimeKeepingStatus}
          renderItem={item => (
            <List.Item onClick={() => this.onChooseDoKeeping(item)}>
              <List.Item.Meta
                title={
                  <div className='time-keeping-status-item'>
                    <TimeKeepingDot dotColor={timeKeepingColors[item.value]} />
                    <div>{item.value}</div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Modal>
    );
  }
}

const mapStateToProps = ({ timeKeeping }) => {
  const { timeKeepingItem } = timeKeeping;

  return {
    ...timeKeepingItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTimeKeeping: (personnelId, timeKeepingRequest) => dispatch(timeKeepingAction.createTimeKeeping(personnelId, timeKeepingRequest)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoTimeKeepingModal);