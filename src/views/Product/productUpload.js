import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, FormGroup, Form, Input, FormText, Label, CardFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userRef, authRef } from '../../firebase/init';
import { addUser, editUser} from '../../actions/usersactions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { classnames } from './helpers';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

  
class productUpload extends Component {
  constructor(props) {
    super(props)
    this.state = this.setIntialData();
}
setIntialData = () => {
    return {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        cpassword: '',
        phone: '',
        userrole: '',
        isedit: false,
        key: 0,
        picture : null,
        pictureUrl : null,
        address: '',
        errorMessage: '',
        latitude: null,
        longitude: null,
        isGeocoding: false,
    }
}
// componentDidMount() {

//     let user = this.props.user;
//     let finduser = user.find(p => p.id == this.props.match.params.id);
//     if(typeof finduser != 'undefined')
//     {
//         this.setState({
//             firstname: finduser.firstname,
//             lastname: finduser.lastname,
//             phone: finduser.phone,
//             userrole: finduser.userrole,
//             key: finduser.key,
//             isedit: true
//         })
//     }

// }
// handleChange = (e) => {
//     const newState = this.state;
//     newState[e.target.id] = e.target.value;
//     this.setState(newState);
// }
// onSave = (e) => {
//     let user = {
//         firstname: this.state.firstname,
//         lastname: this.state.lastname,
//         phone: this.state.phone,
//         userrole: this.state.userrole,
//     }
//     if (this.state.isedit) {
//         user.key = this.state.key;
//         this.props.editUser(user);
//         this.props.history.push('/users');
//     }
//     else {
//         user.email = this.state.email;
//         this.props.addUser(user,this.state.password);
//         this.onCancel();
//     }

// }
// onCancel = (e) => {
//     this.setState(this.setIntialData())
// }

// displayPicture(event){
//   let reader = new FileReader();
//   let file = event.target.files[0];
//   reader.onload = () =>{
//       this.setState({
//           picture: file,
//           pictureUrl : reader.result
//       });
//   };
//   reader.readAsDataURL(file);

// }
handleChange = address => {
    this.setState({
      address,
      latitude: null,
      longitude: null,
      errorMessage: '',
    });
  };

  handleSelect = selected => {
    this.setState({ isGeocoding: true, address: selected });
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        this.setState({
          latitude: lat,
          longitude: lng,
          isGeocoding: false,
        });
      })
      .catch(error => {
        this.setState({ isGeocoding: false });
        console.log('error', error); // eslint-disable-line no-console
      });
  };

  handleCloseClick = () => {
    this.setState({
      address: '',
      latitude: null,
      longitude: null,
    });
  };
  handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };


render() {
    const {
        address,
        errorMessage,
        latitude,
        longitude,
        isGeocoding,
      } = this.state;
    return (
        <div className="animated fadeIn">
         
     
            <Row>
                <Col xs="12" md="6">
                    <Card>
                        <CardHeader>
                            <strong>User information</strong>
                        </CardHeader>
                        <CardBody>
                            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">

                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="name-input">First Name</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="firstname" value={this.state.firstname} onChange={this.handleChange} placeholder="Enter Firstname" autoComplete="name" />
                                        <FormText className="help-block">Please enter yourfirstname</FormText>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="name-input">Last Name</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="lastname" value={this.state.lastname} onChange={this.handleChange} placeholder="Enter Listname" autoComplete="name" />
                                        <FormText className="help-block">Please enter your lastname</FormText>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="email-input">Email</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        {this.state.isedit ? <Input type="email" id="email"
                                            value={this.state.email} disabled /> :
                                            <Input type="email" id="email"
                                                value={this.state.email} onChange={this.handleChange}
                                                placeholder="Enter Email" autoComplete="email" />}
                                        <FormText className="help-block">Please enter your email</FormText>
                                    </Col>
                                </FormGroup>
                                
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="password-input">Phone Number</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="email" placeholder="Enter Phone" id="phone" value={this.state.phone} onChange={this.handleChange} autoComplete="phone" />
                                        <FormText className="help-block">Please enter your phone</FormText>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="password-input">User Role</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                    <PlacesAutocomplete
          onChange={this.handleChange}
          value={address}
          onSelect={this.handleSelect}
          onError={this.handleError}
          shouldFetchSuggestions={address.length > 2}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            return (
              <div className="Demo__search-bar-container">
                <div className="Demo__search-input-container">
                  <input
                    {...getInputProps({
                      placeholder: 'Search Places...',
                      className: 'Demo__search-input',
                    })}
                  />
                  {this.state.address.length > 0 && (
                    <button
                      className="Demo__clear-button"
                      onClick={this.handleCloseClick}
                    >
                      x
                    </button>
                  )}
                </div>
                {suggestions.length > 0 && (
                  <div className="Demo__autocomplete-container">
                    {suggestions.map(suggestion => {
                      const className = classnames('Demo__suggestion-item', {
                        'Demo__suggestion-item--active': suggestion.active,
                      });

                      return (
                        /* eslint-disable react/jsx-key */
                        <div
                          {...getSuggestionItemProps(suggestion, { className })}
                        >
                          <strong>
                            {suggestion.formattedSuggestion.mainText}
                          </strong>{' '}
                          <small>
                            {suggestion.formattedSuggestion.secondaryText}
                          </small>
                        </div>
                      );
                      /* eslint-enable react/jsx-key */
                    })}
                    <div className="Demo__dropdown-footer">
                      
                    </div>
                  </div>
                )}
              </div>
            );
          }}
        </PlacesAutocomplete>
        {errorMessage.length > 0 && (
          <div className="Demo__error-message">{this.state.errorMessage}</div>
        )}

        {((latitude && longitude) || isGeocoding) && (
          <div>
            <h3 className="Demo__geocode-result-header">Geocode result</h3>
            {isGeocoding ? (
              <div>
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
              </div>
            ) : (
              <div>
                <div className="Demo__geocode-result-item--lat">
                  <label>Latitude:</label>
                  <span>{latitude}</span>
                </div>
                <div className="Demo__geocode-result-item--lng">
                  <label>Longitude:</label>
                  <span>{longitude}</span>
                </div>
              </div>
            )}
          </div>
        )}
                                            
                                       
                                        <FormText className="help-block">Please enter your phone</FormText>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="password-input">User Role</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="file" name="select" id="userrole" value={this.state.userrole} readOnly = {true}/>
                                            
                                       
                                        <FormText className="help-block">Please enter your phone</FormText>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                        <CardFooter>
                            <Button type="submit" size="sm" color="primary" onClick={this.onSave}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                            &nbsp;
                            <Button type="reset" size="sm" color="danger" onClick={this.props.history.goBack}><i className="fa fa-ban"></i> Back</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
                />
{/* Same as */}
<ToastContainer />
        </div>
    )
}
}

export default productUpload;
