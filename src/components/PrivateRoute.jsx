
import React from 'react';
import { connect } from 'react-redux';
import { isAuthenticated } from '../redux/modules/user'
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends React.PureComponent {
  render() {
    const Component = this.props.component 
    return (
      <Route
        path={this.props.path}
        exact={this.props.exact}
        render={props =>
          this.props.isAuthenticated ? (
            <Component />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  }
}

export default connect((state) => {
  return {
    user: state.user,
    isAuthenticated: isAuthenticated(state.user)
  }
})(PrivateRoute);