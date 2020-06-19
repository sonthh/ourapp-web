import React, { Component } from 'react';
import './index.scss';
import {
  Button, notification, Checkbox, Col, Row, Form,
} from 'antd';
    import { connect } from 'react-redux';
import { Select } from 'antd';
import { Helmet } from 'react-helmet';
import * as roleAction from '../../../../action/roleAction'
import { getPermissionGroup, getPermisionInVietnamees, domains } from '../../../../util/get';

class PermissionSetting extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      roleId: null
    };
  }

  componentDidMount() {
    this.props.findManyRoles();
    this.props.findManyPermissions();
  }

  componentDidUpdate(prevProps, prevState) {
    const { success } = this.props;
    if (success !== undefined && success !== prevProps.success) {
      notification.success({
        message: 'Thành công',
        description: success,
        duration: 2.5,
      });
    }
  }

  onChangeRole = (roleId) => {
    this.setState({ roleId });
    const { roles } = this.props;
    const role = roles.find(({ id }) => id === roleId);

    if (!role) return;

    const { scopes } = role;
    const perGroupOfCurrentRole = getPermissionGroup(scopes);

    this.formRef.current.setFieldsValue(perGroupOfCurrentRole);
  }

  onSubmitForm = (values) => {
    const { roleId } = this.state;

    if (!roleId) {
      notification.success({
        message: 'Thông báo',
        description: 'Vui lòng chọn nhóm quyền',
        duration: 2.5,
      });
      return;
    }

    let scopes = [];
    Object.keys(values).forEach(key => scopes = [...scopes, ...values[key]]);

    this.props.updateRoleScopes(roleId, { scopes });
    this.props.findManyRoles();
  }

  render() {

    const { roles = [], permissions = [], isUpdating } = this.props;
    const roleOptions = roles.map(each => ({ label: each.name, value: each.id }));
    const perGroup = getPermissionGroup(permissions);

    const renderPer = Object.keys(perGroup).map(key => {
      const pers = perGroup[key];
      const options = pers.map(each => ({ label: getPermisionInVietnamees(each), value: each }));

      return (
        <Col key={key} span={24} md={{ span: 8 }} lg={{ span: 6 }}>
          <Form.Item name={key} label={domains[key]} >
            <Checkbox.Group options={options} />
          </Form.Item>
        </Col>
      );
    });

    return (
      <>
        <Helmet>
          <title>Cài đặt phân quyền</title>
        </Helmet>
        <div id='PermissionSetting'>
          <Row>
            <Col sm={{ span: 4 }}>
              <Form
                labelCol={{ xs: 24 }}
                wrapperCol={{ xs: 24 }}
                layout='vertical'>
                <Form.Item name='roleId' label='Chọn nhóm quyền' >
                  <Select onChange={this.onChangeRole} options={roleOptions} />
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <Form
            ref={this.formRef}
            onFinish={this.onSubmitForm}
            labelCol={{ xs: 24 }}
            wrapperCol={{ xs: 24 }}
            layout='vertical'
          >
            <Row>
              {renderPer}
            </Row>
            <Row>
              <Col md={{ span: 24 }} style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                <Button style={{ fontSize: 13 }} loading={isUpdating} type='primary' htmlType='submit'>Cập nhật</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ role }) => {
  const { roles, permissions, isUpdating, success } = role;
  return { roles, permissions, isUpdating, success };
};

const mapDispatchToProps = (dispatch) => {
  return {
    findManyRoles: () => dispatch(roleAction.findManyRoles()),
    findManyPermissions: () => dispatch(roleAction.findManyPermissions()),
    updateRoleScopes: (roleId, scopeRequest) => dispatch(roleAction.updateRoleScopes(roleId, scopeRequest)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PermissionSetting);
