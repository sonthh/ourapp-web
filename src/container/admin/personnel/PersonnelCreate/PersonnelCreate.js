import { Button, Form, Modal, notification, Select, Spin, Tabs, Row, Col, Upload, Avatar } from 'antd';
import './index.scss';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoadingOutlined, PlusOutlined, PhoneTwoTone, MailTwoTone } from '@ant-design/icons';
import { Typography } from 'antd';
import { FaBirthdayCake } from "react-icons/fa";
import { GiPositionMarker } from "react-icons/gi";

const { TabPane } = Tabs;

const { Option } = Select;


const { Title } = Typography;

class PersonnelCreate extends Component {

  constructor(props) {
    super(props);
    //
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {

  }


  render() {
    return (
      <>
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
            <Title className='fullname' level={3}>Trần Hữu Hồng Sơn</Title>
            <div>
              <PhoneTwoTone /> <span>0327053245</span>
            </div>
            <div>
              <MailTwoTone /> <span>tranhuuhongson@gmail.com</span>
            </div>
          </Col>
          <Col span={24} lg={{ span: 9 }} className='personnel-info-right'>
            <div>
              <FaBirthdayCake className='custom-icon' /> <span>20/10/1998</span>
            </div>
            <div>
              <GiPositionMarker className='custom-icon' /> <span>Quang Nam</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Tabs defaultActiveKey="1" className='personnel-tabs'>
            <TabPane tab="Hồ sơ" key="1">

              <Tabs tabPosition='left' className='personnel-files-tabs'>
                <TabPane tab="Thông tin cơ bản" key="ttcb">
                  Content of Tab Pane 1
                </TabPane>
                <TabPane tab="Thời gian làm việc" key="ttlv">
                  Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Trình độ chuyên môn" key="tdcm">
                  Content of Tab Pane 3
                </TabPane>
                <TabPane tab="Chứng chỉ chuyên nghành" key="cccn">
                  Content of Tab Pane 3
                </TabPane>
                <TabPane tab="Lịch sử công tác" key="lsct">
                  Content of Tab Pane 3
                </TabPane>
                <TabPane tab="Thông tin liên hệ" key="ttlh">
                  Content of Tab Pane 3
                </TabPane>
                <TabPane tab="Tình trạng sức khỏe" key="ttsk">
                  Content of Tab Pane 3
                </TabPane>
                <TabPane tab="Thông tin khác" key="ttk">
                  Content of Tab Pane 3
                </TabPane>
              </Tabs>

            </TabPane>
            <TabPane tab="Hợp đồng" key="2">
              Hợp đồng
            </TabPane>
            <TabPane tab="Lương - phụ cấp" key="3">
              Lượng và phụ cấp
             </TabPane>
          </Tabs>
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonnelCreate);
