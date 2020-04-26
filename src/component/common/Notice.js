import React, { Component } from 'react';
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import { Tag } from 'antd';
import { BellTwoTone } from '@ant-design/icons';

let data = [
  {
    id: '000000001',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: 'Thông báo 1',
    datetime: '2017-08-09',
    type: 'notification',
  },
  {
    id: '000000002',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
    title: 'Thông báo 2',
    datetime: '2017-08-08',
    type: 'notification',
  },
  {
    id: '000000003',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
    title: 'Thông báo 3',
    datetime: '2017-08-07',
    read: true,
    type: 'notification',
  },
  {
    id: '000000004',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
    title: 'Thông báo 4',
    datetime: '2017-08-07',
    type: 'notification',
  },
  {
    id: '000000005',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: 'Thông báo 5',
    datetime: '2017-08-07',
    type: 'notification',
  },
  {
    id: '000000006',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: 'message3',
    description: 'Thông báo 6',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true,
  },
  {
    id: '000000007',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: 'message2',
    description: 'Thông báo 7',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true,
  },
  {
    id: '000000008',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: 'message1',
    description: 'Thông báo 8',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true,
  },
  {
    id: '000000009',
    title: 'ABCD has been posted a ...',
    description: 'Thông báo 9',
    extra: 'TODO',
    status: 'todo',
    type: 'event',
  },
  {
    id: '000000010',
    title: 'ABCD has been posted a ...',
    description: 'Thông báo 10',
    extra: 'URGENT',
    status: 'urgent',
    type: 'event',
  },
  {
    id: '000000011',
    title: 'ABCD has been posted a ...',
    description: 'Thông báo 11',
    extra: 'DOING',
    status: 'doing',
    type: 'event',
  },
  {
    id: '000000012',
    title: 'ABCD has been posted a ...',
    description: 'Thông báo 12',
    extra: 'INPROGRESS',
    status: 'processing',
    type: 'event',
  },
];

const getNoticeData = (notices) => {
  if (notices.length === 0) {
    return {};
  }
  const newNotices = notices.map(notice => {
    const newNotice = { ...notice };
    // transform id to item key
    if (newNotice.id) {
      newNotice.key = newNotice.id;
    }
    if (newNotice.extra && newNotice.status) {
      const color = {
        todo: '',
        processing: 'blue',
        urgent: 'red',
        doing: 'gold',
      }[newNotice.status];
      newNotice.extra = (
        <Tag color={color} style={{ marginRight: 0 }}>
          {newNotice.extra}
        </Tag>
      );
    }
    return newNotice;
  });

  return newNotices.reduce((pre, data) => {
    if (!pre[data.type]) {
      pre[data.type] = [];
    }
    pre[data.type].push(data);
    return pre;
  }, {});
}

export default class Notice extends Component {

  onItemClick = (item, tabProps) => {
    console.log(item, tabProps);
  }

  onClear(tabTitle) {
    console.log(tabTitle);
  }

  render = () => {
    const noticeData = getNoticeData(data);
    return (
      <NoticeIcon
        className="notice-icon" count={5}
        bell={<BellTwoTone />}
        onItemClick={this.onItemClick}
        onClear={this.onClear}>
        <NoticeIcon.Tab
          list={noticeData.notification}
          title="notification"
          emptyText="Not thing"
          emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
        />
        <NoticeIcon.Tab
          list={noticeData.message}
          title="message"
          emptyText="Not thing"
          emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
        />
        <NoticeIcon.Tab
          list={noticeData.event}
          title="event"
          emptyText="Not thing"
          emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
        />
      </NoticeIcon>
    );
  }
}
