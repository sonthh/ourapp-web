import React from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

export const getColumnSearchProps = (context, dataIndex, title = null) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={node => context.searchInput = node}
        placeholder={`Search by ${title ? title : dataIndex}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <Button
        type='primary'
        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
        icon={<SearchOutlined />}
        size='small'
        style={{ width: 90, marginRight: 8 }}
      >
        Search
      </Button>
      <Button onClick={() => handleReset(clearFilters)} size='small' style={{ width: 90 }}>
        Reset
      </Button>
    </div>
  ),
  filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  onFilterDropdownVisibleChange: visible => {
    if (visible) {
      setTimeout(() => context.searchInput.select());
    }
  },
  render: text =>
    context.state.searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[context.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ) : (text),
});

const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
};

const handleReset = clearFilters => {
  clearFilters();
};