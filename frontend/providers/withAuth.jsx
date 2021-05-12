import React, { Component } from 'react';
import AuthContext from './context/authContext';

function withAuth(ComposedComponent) {
  const name = ComposedComponent.displayName || ComposedComponent.name;

  return class extends Component {
    static displayName = `withAuth(${name})`;

    render() {
      return (
        <AuthContext.Consumer>
          {manager => (
            <ComposedComponent
              cookies={manager.getAll()}
              {...this.props} />
            )}
        </AuthContext.Consumer>
      );
    }
  };
}

export default withAuth;
