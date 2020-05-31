import { Button, Form, Select, Row, Col, Input, DatePicker, Checkbox, Divider, notification } from 'antd';
import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as departmentAction from '../../../../action/departmentAction';
import * as personnelAction from '../../../../action/personnelAction';
import { getErrorMessage } from '../../../../util/get';
import moment from 'moment';
import { getDateFormat } from '../../../../util/date';

class UpdateBasicInfoForm extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      displayIDForm: false,
      displayPassportForm: false,
      displayBankForm: false,
    }
  }

  componentDidMount() {
    const { personnelId } = this.props;

    this.props.findOnePersonnel(personnelId);
    this.props.findManyDepartments();
  }

  componentDidUpdate(prevProps, prevState) {

    const { departments, error, success, item } = this.props;

    if (item !== prevProps.item) {
      let { birthDay, department, identification, passport } = item;

      let updateForm = { ...item };

      if (birthDay) {
        birthDay = moment(birthDay);
        updateForm = { ...updateForm, birthDay };
      }

      let departmentId = -1;
      if (department) {
        departmentId = department.id;
        updateForm = { ...updateForm, departmentId };
      }

      if (identification) {
        this.setState({ displayIDForm: true });
        updateForm = {
          ...updateForm,
          identificationNumber: identification.number,
          identificationIssueDate: moment(identification.issueDate),
          identificationIssueAt: identification.issueAt,
        };
      }

      if (passport) {
        this.setState({ displayPassportForm: true });

        updateForm = {
          ...updateForm,
          passportNumber: passport.number,
          passportIssueDate: moment(passport.issueDate),
          passportIssueAt: passport.issueAt,
          passportExpiredDate: moment(passport.expiredDate),
        };
      }

      if (identification) {
        this.setState({ displayIDForm: true });
        updateForm = {
          ...updateForm,
          identificationNumber: identification.number,
          identificationIssueDate: moment(identification.issueDate),
          identificationIssueAt: identification.issueAt,
        };
      }

      this.formRef.current.setFieldsValue(updateForm);
    }

    if (departments !== prevProps.departments) {
      this.setState({ departments });
    }

    if (error && error !== prevProps.error) {
      notification.error({
        message: 'Có lỗi',
        description: getErrorMessage(error) || 'Something went wrong',
        duration: 2.5,
      });
    }

    if (success !== undefined && success !== prevProps.success) {
      notification.success({
        message: 'Thành công!',
        description: success,
        duration: 2.5,
      });
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
    const { item } = this.props;
    if (!item || !item.id) {
      return;
    }

    console.log(values);


    // add/update identification
    const { displayIDForm, displayPassportForm } = this.state;
    if (displayIDForm === true) {
      const {
        identificationNumber: number,
        identificationIssueDate: issueDate,
        identificationIssueAt: issueAt,
      } = values;

      const { identification, id } = item;

      const idRequest = {
        number,
        issueDate,
        issueAt,
      }

      if (!identification) {
        this.props.addIdentification(id, idRequest);
      }

      if (identification) {
        this.props.updateIdentification(id, idRequest);
      }
    }

    if (displayPassportForm === true) {
      const {
        passportNumber: number,
        passportIssueDate: issueDate,
        passportIssueAt: issueAt,
        passportExpiredDate: expiredDate,
      } = values;

      const { passport, id } = item;

      const passportRequest = {
        number,
        issueDate,
        issueAt,
        expiredDate
      }

      if (!passport) {
        this.props.addPassport(id, passportRequest);
      }

      if (passport) {
        this.props.updatePassport(id, passportRequest);
      }
    }


    // update basic info
    this.props.updateBasicInfo(item.id, values);
  }

  onFieldsChange = (changedFields, allFields) => {
    if (changedFields[0]) {
      const name = changedFields[0].name[0];
      let value = changedFields[0].value;

      if (name === 'birthDay') {
        value = getDateFormat(value);
      }

      this.props.onFieldsChange(name, value);
    }
  }

  render() {
    const { displayIDForm, displayPassportForm, displayBankForm } = this.state;
    const { departments = [], isUpdating } = this.props;

    return (
      <Form
        onFieldsChange={this.onFieldsChange}
        layout='vertical'
        initialValues={{ gender: 'MALE' }}
        ref={this.formRef}
        autoComplete='off'
        labelCol={{ xs: 24 }}
        wrapperCol={{ xs: 24 }}
        id='UpdateBasicInfoForm'
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
              <DatePicker format='DD/MM/YYYY' />
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
              <Checkbox checked={displayIDForm} onChange={this.onChangeDisplayIDForm}>Chứng minh thư</Checkbox>
              <Checkbox checked={displayPassportForm} onChange={this.onChangeDisplayPassportForm}>Hộ chiếu</Checkbox>
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
                <Form.Item name='identificationNumber' label='Số CMND'>
                  <Input />
                </Form.Item>
              </Col>
              <Col md={{ span: 8 }}>
                <Form.Item name='identificationIssueDate' label='Ngày cấp'>
                  <DatePicker format='DD/MM/YYYY' />
                </Form.Item>
              </Col>
              <Col md={{ span: 8 }}>
                <Form.Item name='identificationIssueAt' label='Nơi cấp'>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row className={`${!displayPassportForm ? 'd-none' : ''}`}>
              <Col md={{ span: 8 }}>
                <Form.Item name='passportNumber' label='Số hộ chiếu'>
                  <Input />
                </Form.Item>
              </Col>
              <Col md={{ span: 4 }}>
                <Form.Item name='passportIssueDate' label='Ngày cấp'>
                  <DatePicker format='DD/MM/YYYY' />
                </Form.Item>
              </Col>
              <Col md={{ span: 4 }}>
                <Form.Item name='passportExpiredDate' label='Ngày hết hạn'>
                  <DatePicker format='DD/MM/YYYY' />
                </Form.Item>
              </Col>
              <Col md={{ span: 8 }}>
                <Form.Item name='passportIssueAt' label='Nơi cấp'>
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
            <Button style={{ fontSize: 13 }} loading={isUpdating} type='primary' htmlType='submit'>Cập nhật</Button>
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
    updateBasicInfo: (personnelId, basicInfo) => dispatch(personnelAction.updateBasicInfo(personnelId, basicInfo)),
    addIdentification: (personnelId, idRequest) => dispatch(personnelAction.addIndentification(personnelId, idRequest)),
    updateIdentification: (personnelId, idRequest) => dispatch(personnelAction.updateIndentification(personnelId, idRequest)),
    addPassport: (personnelId, passportRequest) => dispatch(personnelAction.addPassport(personnelId, passportRequest)),
    updatePassport: (personnelId, passportRequest) => dispatch(personnelAction.updatePassport(personnelId, passportRequest)),
    findOnePersonnel: (id) => dispatch(personnelAction.findOnePersonnel(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBasicInfoForm);
