import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, FormGroup, Form, Input, FormText, Label, CardFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userRef, authRef } from '../../firebase/init';
import { addUser, editUser} from '../../actions/usersactions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PreviewPicture from '../Components/previewPicture';

class AddUser extends Component {
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
            picture: null,
            pictureUrl : null

        }
    }
    componentDidMount() {

        let user = this.props.user;
       
        let finduser = user.find(p => p.id == this.props.match.params.id);

        
        if(typeof finduser != 'undefined')
        {
            this.setState({
                firstname: finduser.firstname,
                lastname: finduser.lastname,
                phone: finduser.phone,
                userrole: finduser.userrole,
                key: finduser.key,
               
                pictureUrl: finduser.picture,
                isedit: true
            })
        }

    }
    handleChange = (e) => {
        const newState = this.state;
        newState[e.target.id] = e.target.value;
        this.setState(newState);
    }
    onSave = (e) => {
        let user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phone: this.state.phone,
            userrole: this.state.userrole,

            picture: this.state.picture,
            
        }
        if (this.state.isedit) {
            user.key = this.state.key;
            this.props.editUser(user);
           
          
        }
        else {
            user.email = this.state.email;
            this.props.addUser(user,this.state.password);
            this.onCancel();
        }

    }
    onCancel = (e) => {
        this.setState(this.setIntialData())
    }

    displayPicture(event){
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () =>{
            this.setState({
                picture: file,
                pictureUrl : reader.result
            });
        };
        reader.readAsDataURL(file);

    }

    render() {
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
                                            <Input type="text" name="select" id="userrole" value={this.state.userrole} readOnly = {true}/>
                                                
                                           
                                            <FormText className="help-block">Please enter your phone</FormText>
                                        </Col>
                                       
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="password-input">User Picture</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="file" name="picture" id="picture" onChange={(event) =>{this.displayPicture(event)}}/>
                                                
                                            <PreviewPicture pictureUrl={this.state.pictureUrl}/>
                                            <FormText className="help-block">Please upload your picture here.</FormText>
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
const mapStateToProps = (state) => {
    return {
        isLoading: state.user.isLoading,
        user: state.user.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addUser: bindActionCreators(addUser, dispatch),
        editUser: bindActionCreators(editUser, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
