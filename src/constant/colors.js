export const colors = [
  '#fff1f0', '#ffccc7', '#ffa39e', '#ff7875', '#ff4d4f', '#f5222d', '#cf1322', '#a8071a', '#820014', '#5c0011',

  '#fcffe6', '#f4ffb8', '#eaff8f', '#d3f261', '#bae637', '#a0d911', '#7cb305', '#5b8c00', '#3f6600', '#254000',

  '#e6f7ff', '#bae7ff', '#91d5ff', '#69c0ff', '#40a9ff', '#1890ff', '#096dd9', '#0050b3', '#003a8c', '#002766',

  '#e6fffb', '#b5f5ec', '#87e8de', '#5cdbd3', '#36cfc9', '#13c2c2', '#08979c', '#006d75', '#00474f', '#002329',
];

export const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
}

export const timeKeepingColors = {
  'Đúng giờ':             'rgb(126, 211, 33)',
  'Chưa đến ca':          'rgb(196, 196, 196)',
  'Không chấm công':      'rgb(102, 102, 102)',
  'Vào trễ':              'rgb(255, 203, 118)',
  'Vắng mặt':             'rgb(255, 0, 0)',
  'Nghỉ phép':            'rgb(102, 0, 255)',
  'Chờ chấp nhận nghỉ phép': 'rgb(128, 32, 0)',
};