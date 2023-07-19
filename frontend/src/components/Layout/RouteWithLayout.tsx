import * as React from 'react';
import { Route } from "react-router";
import Layout from './Layout';

export interface RouteWithLayout {
  component: React.ReactNode;
  path: string;
};

function RouteWithLayout({ component, path }: RouteWithLayout): React.ReactElement {
  return (<Route
    path={path} element={<Layout children={component} />}
  />);
}

export default RouteWithLayout;