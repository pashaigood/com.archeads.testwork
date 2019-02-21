import React from 'react';
import Slider from 'react-rangeslider';
import Classes from './index.scss';

export default ({ onChange, zoom, ...props }) => (
  <div className={Classes.container} {...props}>
    <div className={Classes.percentage}>{zoom * 10}%</div>
    <div className={Classes.slider}>
      <button
        className={`${Classes.zoomButton} ${Classes.zoomButtonOut}`}
        onClick={() => onChange(zoom - 1)}
      />
      <Slider
        min={0}
        max={10}
        step={1}
        value={zoom}
        orientation={'vertical'}
        tooltip={false}
        reverse={true}
        onChange={onChange}
      />
      <button
        className={`${Classes.zoomButton} ${Classes.zoomButtonIn}`}
        onClick={() => onChange(zoom + 1)}
      />
    </div>
  </div>
)
