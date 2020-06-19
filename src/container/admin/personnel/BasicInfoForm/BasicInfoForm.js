import { Button, Form, Select, Row, Col, Input, DatePicker, Checkbox, Divider, notification } from 'antd';
import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as departmentAction from '../../../../action/departmentAction';
import * as personnelAction from '../../../../action/personnelAction';
import { getErrorMessage } from '../../../../util/get';
import { getDateFormat } from '../../../../util/date';


class BasicInfoForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayIDForm: false,
      displayPassportForm: false,
      displayBankForm: false,
    }
  }

  componentDidMount() {
    this.props.findManyDepartments();
  }

  componentDidUpdate(prevProps, prevState) {
    const { departments, error, success, item } = this.props;

    if (departments !== prevProps.departments) {
      this.setState({ departments });
    }

    if (error && error !== prevProps.error) {
      notification.error({
        message: 'Lỗi',
        description: getErrorMessage(error) || 'Something went wrong',
        duration: 2.5,
      });
    }

    if (success !== undefined && success !== prevProps.success) {
      notification.success({
        message: 'Thành công',
        description: success,
        duration: 2.5,
      });
    }

    if (item && item !== prevProps.item) {
      this.props.handleCreateSucess(item);
    }
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

  onSubmitBasicInfoForm = (values) => {
    this.props.createOneBasicInfo(values);
  }

  onFieldsChange = (changedFields, allFields) => {
    if (changedFields[0]) {
      const name = changedFields[0].name[0];
      let value = changedFields[0].value;

      if (name === 'birthDay') {
        value = getDateFormat(value);
      }

      this.props.onChangeFields(name, value);
    }
  }

  render() {
    const { displayIDForm, displayPassportForm, displayBankForm } = this.state;
    const { departments = [], isCreating } = this.props;

    return (
      <Form
        onFieldsChange={this.onFieldsChange}
        layout='vertical'
        initialValues={{ gender: 'MALE' }}
        // ref={this.formRef}
        autoComplete='off'
        labelCol={{ xs: 18 }}
        wrapperCol={{ xs: 18 }}
        id='basicInfoForm'
        onFinish={this.onSubmitBasicInfoForm}
      >
        <Row>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              name='fullName'
              label='Tên nhân viên'
              rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              name='phoneNumber'
              label='Số điện thoại'
              rules={[
                { required: true, message: 'Vui lòng nhập SĐT' },
                { pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g, message: 'Vui lòng nhập định dạng SĐT' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              name='email'
              label='Email'
              rules={[
                { type: 'email', message: 'Vui lòng nhập định dạng email' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='birthDay' label='Ngày sinh'>
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='gender' label='Giới tính' >
              <Select>
                <Select.Option value='MALE'>Nam</Select.Option>
                <Select.Option value='FEMALE'>Nữ</Select.Option>
                <Select.Option value='OTHER'>Khác</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 24 }}>
            <Form.Item label='Chứng minh / Hộ chiếu' >
              <Checkbox onChange={this.onChangeDisplayIDForm}>Chứng minh thư</Checkbox>
              <Checkbox onChange={this.onChangeDisplayPassportForm}>Hộ chiếu</Checkbox>
            </Form.Item>
          </Col>
          <Col
            className={`${(!displayIDForm && !displayPassportForm) ? 'd-none' : ''}`}
            span={24} md={{ span: 24 }}
            style={{
              border: '1px solid #dee2e6',
              padding: '24px',
            }}>
            <Row className={`${!displayIDForm ? 'd-none' : ''}`}>
              <Col md={{ span: 8 }}>
                <Form.Item label='Số CMND'>
                  <Input />
                </Form.Item>
              </Col>
              <Col md={{ span: 8 }}>
                <Form.Item label='Ngày cấp'>
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col md={{ span: 8 }}>
                <Form.Item label='Nơi cấp'>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row className={`${!displayPassportForm ? 'd-none' : ''}`}>
              <Col md={{ span: 8 }}>
                <Form.Item label='Số hộ chiếu'>
                  <Input />
                </Form.Item>
              </Col>
              <Col md={{ span: 4 }}>
                <Form.Item label='Ngày cấp'>
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col md={{ span: 4 }}>
                <Form.Item label='Ngày hết hạn'>
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col md={{ span: 8 }}>
                <Form.Item label='Nơi cấp'>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              name='departmentId'
              label='Phòng ban'
              rules={[
                { required: true, message: 'Vui lòng chọn phòng ban' },
              ]}
            >
              <Select>
                {departments.map(department => (
                  <Select.Option key={department.id} value={department.id}>{department.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='position' label='Vị trí' >
              <Select>
                <Select.Option value='Developer'>Dev</Select.Option>
                <Select.Option value='Fresher'>Fresher</Select.Option>
                <Select.Option value='Intern'>Intern</Select.Option>
                <Select.Option value='HR'>HR</Select.Option>
                <Select.Option value='Quản lý'>Quản lý</Select.Option>
                <Select.Option value='Tester'>Tester</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 24 }}>
            <Checkbox onChange={this.onChangeDisplayBankForm}>Thông tin ngân hàng</Checkbox>
          </Col>
          <Col
            className={`${!displayBankForm ? 'd-none' : ''}`}
            span={24} md={{ span: 24 }}
            style={{
              marginTop: '12px',
              border: '1px solid #dee2e6',
              padding: '24px',
            }}>
            <Row>
              <Col md={{ span: 12 }}>
                <Form.Item label='Chủ tài khoản'>
                  <Input />
                </Form.Item>
              </Col>
              <Col md={{ span: 12 }}>
                <Form.Item label='Số tài khoản'>
                  <Input />
                </Form.Item>
              </Col>
              <Col md={{ span: 12 }}>
                <Form.Item label='Tên ngân hàng'>
                  <Input />
                </Form.Item>
              </Col>
              <Col md={{ span: 12 }}>
                <Form.Item label='Chi nhánh'>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Divider />
          <Col md={{ span: 24 }} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button loading={isCreating} type='primary' htmlType='submit'>Thêm mới</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

const mapStateToProps = ({ department, personnel }) => {
  const { departmentList, } = department;
  const { personnelItem } = personnel;
  return {
    departments: departmentList.dataList.content,
    ...personnelItem,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    findManyDepartments: () => dispatch(departmentAction.findManyDepartments()),
    createOneBasicInfo: (personnelRequest) => dispatch(personnelAction.createOneBasicInfo(personnelRequest)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfoForm);
