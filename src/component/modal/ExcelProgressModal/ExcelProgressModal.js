import React, { Component } from 'react';
import './index.scss';
import { Modal, Progress, Card, Button, Spin } from 'antd';
import { DownloadOutlined, CheckOutlined } from '@ant-design/icons';

export default class ExcelProgress extends Component {

  state = {
    percent: 1,
  }

  componentDidMount() {
  }

  onCloseModal = () => {
    this.props.onClose();
  }

  handleDownloadFile = () => {
    this.props.onOk();
  }

  componentDidUpdate(prevProps, prevState) {
    const { isExporting, visible } = this.props;
    let interval = null;

    if (isExporting === false && prevProps.isExporting === true) {
      this.setState({ percent: 100 });
      if (interval) {
        clearInterval(interval);
      }
    }

    if (visible === true && prevProps.visible === false) {
      this.setState({ percent: 1 });
      const padding = Math.floor(Math.random() * 15);

      interval = setInterval(() => {
        const { percent } = this.state;

        if (percent > 80 + padding) {
          if (interval) {
            clearInterval(interval);
          }
          return;
        }

        this.setState({ percent: percent + 1 });
      }, 40);
    }
  }

  render() {
    const { visible, isExporting } = this.props;
    const { percent } = this.state;

    return (
      <Modal
        className='ExcelProgressModal'
        closable={false}
        visible={visible}
        footer={null}
      >
        <Card
          title={
            <div className='title'>Bạn đang xuất dữ liệu nhân sự từ hệ thống</div>
          }
          bordered={false}
        >
          <Progress
            type="circle"
            percent={percent}
            format={percent => {
              if (isExporting === true)
                return <Spin />;
              return <CheckOutlined />;
            }}
          />
          <div className='message'>
            {
              isExporting === true ? 'Đang xử lý dữ liệu' : 'Hoàn tất xử lý dữ liệu. Chọn Tải về để lưu tệp dữ liệu xuống máy'
            }
          </div>
          <div className='actions'>
            <Button onClick={this.onCloseModal}>Đóng</Button>
            <Button disabled={isExporting} onClick={this.handleDownloadFile} icon={<DownloadOutlined />} type='primary'>Tải về</Button>
          </div>
        </Card>
      </Modal >
    );
  }
}