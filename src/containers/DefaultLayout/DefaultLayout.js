import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
import Usernavigation from '../../_userNav';
// routes config
import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import { userRef,authRef } from '../../firebase/init';
class DefaultLayout extends Component {

  constructor() {
    super()
    this.state = {
     admin:false
    }
  }
  componentDidMount() {
  
    let checkUser = authRef.currentUser;
    if (checkUser) {

    }
    else {
      this.props.history.push('/login');
     }

     //let uid = authRef.currentUser.uid;
     userRef.orderByChild('userrole').equalTo('admin').on("value", snapshot => {
     
      this.setState({
        
        admin: true
      });
     });
  }

  render() {
    const {admin} = this.state;
    if (admin == true)
    {
      return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigation} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} />
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                    <route.component {...props} />
                  )} />)
                    : (null);
                },
                )}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
          <AppAside fixed>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );

    }
    else
    {
      return (
        <div className="app">
          <AppHeader fixed>
            <DefaultHeader />
          </AppHeader>
          <div className="app-body">
            <AppSidebar fixed display="lg">
              <AppSidebarHeader />
              <AppSidebarForm />
              <AppSidebarNav navConfig={Usernavigation} {...this.props} />
              <AppSidebarFooter />
              <AppSidebarMinimizer />
            </AppSidebar>
            <main className="main">
              <AppBreadcrumb appRoutes={routes} />
              <Container fluid>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                      <route.component {...props} />
                    )} />)
                      : (null);
                  },
                  )}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Container>
            </main>
            <AppAside fixed>
              <DefaultAside />
            </AppAside>
          </div>
          <AppFooter>
            <DefaultFooter />
          </AppFooter>
        </div>
      );
    }
    
  }
}

export default DefaultLayout;
