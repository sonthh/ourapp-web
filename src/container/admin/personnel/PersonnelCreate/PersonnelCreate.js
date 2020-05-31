import { Spin, Tabs, Row, Col, Upload, Avatar } from 'antd';
import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoadingOutlined, PlusOutlined, PhoneTwoTone, MailTwoTone } from '@ant-design/icons';
import { Typography } from 'antd';
import { FaBirthdayCake } from "react-icons/fa";
import { GiPositionMarker } from "react-icons/gi";
import BasicInfoForm from '../BasicInfoForm/BasicInfoForm';
import { Helmet } from 'react-helmet';

const { TabPane } = Tabs;
const { Title } = Typography;
class PersonnelCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullName: 'Tên nhân viên',
      phoneNumber: 'Số điện thoại',
      email: 'Email',
      birthDay: 'Ngày sinh',
      address: 'Địa chỉ',
    }
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
  }

  onChangeFields = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { fullName, phoneNumber, email, birthDay, address } = this.state;

    return (
      <>
        <Helmet>
          <title>Nhân viên</title>
        </Helmet>
        <Row style={{ padding: '0 35px' }} className="personnel-header">
          <Col span={24} lg={{ span: 6 }}>
            <Upload
              name='avatar'
              listType='picture-card'
              className='avatar-uploader'
              showUploadList={false}
              onPreview={this.handlePreview}
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
            >
              {'' ?
                (
                  <Spin
                    spinning={true}
                    indicator={<LoadingOutlined />}
                    size='large'>
                    <Avatar shape='circle' size={160} src={''} />
                  </Spin>
                )
                : (
                  <div>
                    <PlusOutlined />
                    <div className='ant-upload-text'>Upload</div>
                  </div>
                )}
            </Upload>
          </Col>
          <Col span={24} lg={{ span: 9 }} className='personnel-info-left'>
            <Title className='fullname' level={3}>{fullName}</Title>
            <div>
              <PhoneTwoTone /> <span>{phoneNumber}</span>
            </div>
            <div>
              <MailTwoTone /> <span>{email}</span>
            </div>
          </Col>
          <Col span={24} lg={{ span: 9 }} className='personnel-info-right'>
            <div>
              <FaBirthdayCake className='custom-icon' /> <span>{birthDay}</span>
            </div>
            <div>
              <GiPositionMarker className='custom-icon' /> <span>{address}</span>
            </div>
          </Col>
        </Row>
        <Row style={{ marginBottom: '30px' }}>
          <Tabs defaultActiveKey="1" className='personnel-tabs'>
            <TabPane tab="Hồ sơ" key="1">

              <Tabs tabPosition='left' className='personnel-files-tabs'>
                <TabPane tab="Thông tin cơ bản" key="ttcb">
                  <BasicInfoForm history={this.props.history} onChangeFields={this.onChangeFields} />
                </TabPane>
                <TabPane tab="Thời gian làm việc" key="ttlv">
                  Bạn cần tạo thông tin cơ bản của nhân viên trước.
                </TabPane>
                <TabPane tab="Trình độ chuyên môn" key="tdcm">
                  Bạn cần tạo thông tin cơ bản của nhân viên trước.
                </TabPane>
                <TabPane tab="Chứng chỉ chuyên nghành" key="cccn">
                  Bạn cần tạo thông tin cơ bản của nhân viên trước.
                </TabPane>
                <TabPane tab="Lịch sử công tác" key="lsct">
                  Bạn cần tạo thông tin cơ bản của nhân viên trước.
                </TabPane>
                <TabPane tab="Thông tin liên hệ" key="ttlh">
                  Bạn cần tạo thông tin cơ bản của nhân viên trước.
                </TabPane>
                <TabPane tab="Tình trạng sức khỏe" key="ttsk">
                  Bạn cần tạo thông tin cơ bản của nhân viên trước.
                     </TabPane>
                <TabPane tab="Thông tin khác" key="ttk">
                  Bạn cần tạo thông tin cơ bản của nhân viên trước.
                </TabPane>
              </Tabs>
            </TabPane>
            <TabPane tab="Hợp đồng" key="2">
              Bạn cần tạo thông tin cơ bản của nhân viên trước.
            </TabPane>
            <TabPane tab="Lương - phụ cấp" key="3">
              Bạn cần tạo thông tin cơ bản của nhân viên trước.
            </TabPane>
          </Tabs>
        </Row>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonnelCreate);
