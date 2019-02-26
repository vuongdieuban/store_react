import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = props => {
  // component need to capitalize so react know its a Component
  const { path, component: Component, ...rest } = props;
  const user = auth.getCurrentUser();
  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        if (!user)
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
