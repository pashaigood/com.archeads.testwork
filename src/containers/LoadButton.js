import React from 'react';
import { connect } from 'react-redux';
import { read } from '../ducks/scene';

const LoadButton = ({ read }) => (
    <button onClick={() => read('/test-model/model.dae')}>Load</button>
);

export default connect(null, { read })(React.memo(LoadButton));
