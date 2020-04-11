import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Progress } from 'reactstrap';
import toastr from 'toastr';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authRef, userRef } from '../../../firebase/init';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      error: '',
      isSignedIn: false
    }
  }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
     
    })
  }
  // onLogin = () => {
  //   authRef
  //     .signInWithEmailAndPassword(this.state.username, this.state.password)
  //     .then((user) => {

  //       userRef.orderByChild('id').equalTo(user.user.uid).on("value", snapshot => {
  //         let key = Object.keys(snapshot.val());
  //         let finduser = snapshot.val()[key[0]];
  //         if (finduser.userrole == "super_admin" || finduser.userrole == "restaurant_admin") {
  //           this.props.history.push('/dashboard');
  //           userRef.orderByKey().off('child_added', null);
  //         }
  //         else {
  //           toast.error('you are not authorized');
  //         }
  //         //console.log(snapshot.val());
  //       });


  //       //
  //     })
  //     .catch((error) => {
  //       toast.error(error.message)
  //     });
  // }
  handleChange = (e) => {
    const newState = this.state;
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  }

  render() {

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                 
                   
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      {this.state.isSignedIn ? (
                       this.props.history.push('/dashboard')
                      ) : (
                          <StyledFirebaseAuth
                            uiConfig={this.uiConfig}
                            firebaseAuth={firebase.auth()}
                          />
                        )}
                     
                  </CardBody>
                </Card>
               
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
