import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import firebase from 'firebase';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import { userRef,authRef } from '../../firebase/init';
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};
const profileLink = `#/user/`

class DefaultHeader extends Component {

  constructor() {
    super()
    this.state = {
     picture:null
    }
  }
  
  componentDidMount() {
  
    let checkUser = authRef.currentUser;
    let  uid = "";
    if (checkUser) {
       uid = authRef.currentUser.uid;
       
       userRef.orderByChild('id').equalTo(uid).on("value", snapshot => {
        let key = Object.keys(snapshot.val());
        let finduser = snapshot.val()[key[0]];
        if (finduser.picture !=null ){this.setState({
          
          picture: finduser.picture
        });}
    
        
       });
    
    

     
    
  }
}

signOut(e) {
  e.preventDefault()
  authRef.signOut()
  window.location.reload()
  
}
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="#/dashboard">Dashboard</NavLink>
          </NavItem>
        
         
        </Nav>
        <Nav className="ml-auto" navbar>
          {/* <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-location-pin"></i></NavLink>
          </NavItem> */}
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={this.state.picture} className="img-avatar" alt="no picture" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              {/* <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem> */}
              <DropdownItem href={profileLink}><i className="fa fa-user"></i> Profile</DropdownItem>
              {/* <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem> */}
              <DropdownItem  onClick={e=>this.signOut(e)} ><i className="fa fa-lock"></i> Logout</DropdownItem>

              {/* <DropdownItem onClick={() => firebase.auth().signOut()} ><i className="fa fa-lock"></i> Logout</DropdownItem> */}
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
