import React from 'react';
import { Resizable } from 'react-resizable';

export const ResizeableTitle = props => {
  const { onResize, width, minWidth = 100, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      minConstraints={[minWidth, 0]}
      width={width}
      height={0}
      handle={resizeHandle => (
        <span
          className={`react-resizable-handle react-resizable-handle-${resizeHandle}`}
          onClick={e => e.stopPropagation()}
        />
      )}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};
