import React, { Component } from 'react';
import './index.scss';
import { Modal, Button, List, notification, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import * as timeKeepingAction from '../../../action/timeKeepingAction';
import { connect } from 'react-redux';
import { getDateFormatForTitle } from '../../../util/date';
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
    this.messageLoadingKey = '1111111';
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, isUpdating, isCreating } = this.props;

    if (error && error !== prevProps.error) {
      if (error) {
        notification.error({
          message: 'Lỗi',
          description: getErrorMessage(error) || 'Something went wrong',
          duration: 2.5,
        });
      }
    }

    if (isUpdating !== undefined && isUpdating !== prevProps.isUpdating) {
      if (isUpdating) {
        message.loading({ content: 'Đang chấm...', key: this.messageLoadingKey });
      }
      if (!isUpdating) {
        message.success({ content: 'Chấm xong', key: this.messageLoadingKey, duration: 0.4 });
      }
    }

    if (isCreating !== undefined && isCreating !== prevProps.isCreating) {
      if (isCreating) {
        message.loading({ content: 'Đang chấm...', key: this.messageLoadingKey });
      }
      if (!isCreating) {
        message.success({ content: 'Chấm xong', key: this.messageLoadingKey, duration: 0.4 });
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
    const { record = {}, date, indexRecord, indexDate } = this.props;

    if (!record || !record.timeKeepingList || !record.personnel) return;

    const currentTimeKeeping = record.timeKeepingList[indexDate];

    if (!currentTimeKeeping) {
      const dateFormat = moment(date).format('YYYY-MM-DD');
      const timeKeepingRequest = {
        date: dateFormat,
        status: value,
      }

      this.props.createTimeKeeping(indexRecord, indexDate, record.personnel.id, timeKeepingRequest);
    }

    if (currentTimeKeeping) {
      const timeKeepingRequest = {
        status: value,
      }
      this.props.updateTimeKeeping(indexRecord, indexDate, record.personnel.id, currentTimeKeeping.id, timeKeepingRequest);
    }

  }

  render() {
    const { visible, record, date, indexDate } = this.props;
    let title = '';
    if (record && record.personnel) {
      title = `${record.personnel.fullName} vào ${getDateFormatForTitle(date)}`;
    }
    let status = '';
    if (record && record.timeKeepingList) {
      status = record.timeKeepingList[indexDate]?.status;
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
            <List.Item onClick={() => this.onChooseDoKeeping(item)} className={status === item.value ? 'active' : ''}>
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
    createTimeKeeping: (indexRecord, indexDate, personnelId, timeKeepingRequest) => dispatch(timeKeepingAction.createTimeKeeping(indexRecord, indexDate, personnelId, timeKeepingRequest)),
    updateTimeKeeping: (indexRecord, indexDate, personnelId, timeKeepingId, timeKeepingRequest) => dispatch(timeKeepingAction.updateTimeKeeping(indexRecord, indexDate, personnelId, timeKeepingId, timeKeepingRequest)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoTimeKeepingModal);