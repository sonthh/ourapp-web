import React, { Component } from 'react';
import HeaderSearch from 'ant-design-pro/lib/HeaderSearch';

export default class SearchOnHeader extends Component {
  render = () => {
    return (
      <HeaderSearch
        placeholder="站内搜索"
        dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
        onSearch={value => {
          console.log('input', value);
        }}
        onPressEnter={value => {
          console.log('enter', value);
        }}
        defaultOpen={true}
      />
    );
  }
}
