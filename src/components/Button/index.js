import React from 'react';
import Classes from './index.scss';

export default ({ icon, children, ...props }) => (
    <button className={Classes.button} {...props}>
        <span className={Classes.content}>
          <span className={Classes.icon}>
            <img src={icon} alt="button icon"/>
          </span>
         <span className={Classes.label}>{children}</span>
        </span>
    </button>
)
