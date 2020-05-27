import { Button, Form, Modal, notification, Select, Spin, Tabs, Row, Col, Upload, Avatar, Input, DatePicker, Checkbox, Divider } from 'antd';
import './index.scss';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoadingOutlined, PlusOutlined, PhoneTwoTone, MailTwoTone } from '@ant-design/icons';
import { Typography } from 'antd';
import { FaBirthdayCake } from "react-icons/fa";
import { GiPositionMarker } from "react-icons/gi";
import TextArea from 'antd/lib/input/TextArea';

const { TabPane } = Tabs;

const { Option } = Select;


const { Title } = Typography;

class ContractCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayIDForm: false,
      displayPassportForm: false,
      displayBankForm: false,
    }
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {

  }

  onChangeDisplayIDForm = (e) => {
    const checked = e.target.checked;
    this.setState({ displayIDForm: checked })
  };

  onChangeDisplayPassportForm = (e) => {
    const checked = e.target.checked;
    this.setState({ displayPassportForm: checked })
  };

  onChangeDisplayBankForm = (e) => {
    const checked = e.target.checked;
    this.setState({ displayBankForm: checked })
  };


  render() {
    const { displayIDForm, displayPassportForm, displayBankForm } = this.state;

    return (
      <>
        <Row className={'ContractCreate'} style={{ marginBottom: '30px', padding: '24px' }}>
          <Form
            layout='vertical'
            defaultValue={{}}
            // ref={this.formRef}
            autoComplete='off'
            labelCol={{ xs: 24 }}
            wrapperCol={{ xs: 24 }}
            id='basicInfoForm'
            onFinish={this.onSubmitBasicInfoForm}
          >
            <Row>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item label="Họ và tên">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item label="Số hợp đồng">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item label="Loại hợp đồng" >
                  <Select defaultValue='1'>
                    <Select.Option value='1'>Hợp đồng chính thức</Select.Option>
                    <Select.Option value='2'>Hợp đồng thời vụ</Select.Option>
                    <Select.Option value='3'>Hợp đồng thử việc</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item label="Loại thuế thu nhập cá nhân" >
                  <Select defaultValue='1'>
                    <Select.Option value='1'>Không tính thuế</Select.Option>
                    <Select.Option value='2'>Hợp đồng lao động dưới 3 tháng</Select.Option>
                    <Select.Option value='3'>Hợp đồng lao động 3 tháng trở lên</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item label="Người ký">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 6 }}>
                <Form.Item label="Ngày ký">
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 6 }}>
                <Form.Item label="Ngày hết hạn">
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item label="Mức lương">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item label="Thời gian thử việc">
                  <Input placeholder='Đơn vị tháng' />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item label="Địa điểm làm việc">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item label="Ngày bắt đầu làm">
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 24 }}>
                <Form.Item wrapperCol={{ span: 24 }} label="Ghi chú">
                  <TextArea rows={4} />
                </Form.Item>
              </Col>
              <Divider />
              <Col span={24}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                <Button style={{ marginRight: 20 }}>Hủy</Button>
                <Button type='primary'>Update</Button>
              </Col>

            </Row>
          </Form>

        </Row>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractCreate);
