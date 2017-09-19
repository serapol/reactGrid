import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import User from './User';

const mapStateToProps = (state, ownProps) => ({
  user: state.users.data.find((user) => user.id === ownProps.params.userId),
});

const mapDispatchToProps = (dispatch) => {
  let obj = {};

  Object.keys(Actions).map((actionsName) => {
    if (actionsName !== '__esModule') {
      obj[actionsName] = bindActionCreators(Actions[actionsName], dispatch);
    }
  });

  return obj;
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  redux: {
    state: stateProps,
    actions: dispatchProps
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(User);
