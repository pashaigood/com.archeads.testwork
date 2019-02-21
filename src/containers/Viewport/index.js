import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { setZoom, toggleCamera } from '../../ducks/scene';
import Classes from './index.scss';

const ZazyViewPort = React.lazy(() => import('./Viewport'));
const Placeholder = <div className={`${Classes.container} ${Classes.desk}`}/>;

const Viewport = (props) => (
    props.path ? (
        <Suspense
            fallback={Placeholder}
        >
          <ZazyViewPort {...props} />
        </Suspense>

    ) : (
        Placeholder
    )
);

export default connect(
    state => state.scene.toObject(),
    { setZoom, toggleCamera }
)(Viewport);
