import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, addUser,removeUser } from '../../actions/usersactions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UserRow(props) {
  const user = props.user
  const userLink = `#/user/${user.id}`
  let deleteStyle = {
    color: '#20a8d8',
    cursor: 'pointer'
  }
  return (
    
    <tr key={user.id.toString()}>
      <th scope="row">{user.id}</th>
      <td>{user.firstname} {user.lastname}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{user.userrole}</td>
      <td>
        <a href={userLink}>
          <i className="fa fa-edit fa-2x" aria-hidden="true"></i>
        </a> &nbsp;
        
      </td>
    </tr>
  )
}

class User extends Component {

  componentDidMount() {
    this.props.getUser();
  }
  onDelete = (e) => {
   // this.props.removeUser(e.target.id)
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">email</th>
                      <th scope="col">phone</th>
                      <th scope="col">role</th>
                      <th scope="col">actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.user.map((user, index) =>
                      <UserRow key={index} user={user} onDelete={this.onDelete} />
                    )}
                  </tbody>
                </Table>
              </CardBody>
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
    user: state.user.user,
    isLoading: state.user.isLoading
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getUser: bindActionCreators(getUser, dispatch),
    addUser: bindActionCreators(addUser, dispatch),
    removeUser:bindActionCreators(removeUser,dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);

