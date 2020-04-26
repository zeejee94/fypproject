import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, FormGroup, Form, Input, FormText, Label, CardFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUser, editUser,currentUserRef} from '../../actions/usersactions';
import { addBrochure} from '../../actions/productactions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PreviewPicture from '../Components/previewPicture';

class BrochureUpload extends Component {
    constructor(props) {
        super(props)
        this.state = this.setIntialData();
    }
    setIntialData = () => {
        return {
            company:'',
            date: '',
            picture: null,
            pictureUrl : null,
            key: 0

        }
    }
    // componentDidMount() {
    //     let users = this.props.users;
    //     let finduser = users.find(p => p.id == this.props.match.params.id);
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
    handleChange = (e) => {
        const newState = this.state;
        newState[e.target.id] = e.target.value;
        this.setState(newState);
    }
    onSave = (e) => {
        let brochure = {
            company: this.state.company,
            date: this.state.date,
            picture: this.state.picture,
            
        }
       
    
            this.props.addBrochure(brochure);
         

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
                                <strong>Brochure Upload</strong>
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">

                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="name-input">Company Name</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                      
                                            <Input type="select"  name="select" id="company" value={this.state.company} onChange={this.handleChange} placeholder="Enter Company" autoComplete="company" >
                                            <option value="0">Please select</option>
                                                <option value="TESCO">TESCO</option>
                                            
                                                <option value="ECONSAVE">ECONSAVE</option>
                                                </Input>
                                            <FormText className="help-block">Please enter the company name</FormText>
                                        </Col>
                                    </FormGroup>

                                    
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="name-input">Date range</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" placeholder="date" id="date" value={this.state.date} onChange={this.handleChange} autoComplete="date" />
                                            <FormText className="help-block">Please enter the date range</FormText>
                                        </Col>
                                    </FormGroup>
                                   

                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="password-input">Brochure</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="file" name="picture" id="picture" onChange={(event) =>{this.displayPicture(event)}}/>
                                                
                                            <PreviewPicture pictureUrl={this.state.pictureUrl}/>
                                            <FormText className="help-block">Please upload the brochure here.</FormText>
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

const mapDispatchToProps = (dispatch) => {
    return {
        
        addBrochure: bindActionCreators(addBrochure, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(BrochureUpload);
