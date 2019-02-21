import React from 'react';
import { connect } from 'react-redux';
import { read } from '../ducks/scene';
import Button from '../components/Button';

const LoadButton = ({ read }) => (
    <Button
        icon={require('../assets/images/circle.png')}
        onClick={() => read('/test-model/model.dae')}
    >
      Load model
    </Button>
);

export default connect(null, { read })(React.memo(LoadButton));
