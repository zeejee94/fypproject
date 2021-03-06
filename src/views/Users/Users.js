import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUsers, addUser,removeUser } from '../../actions/usersactions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UserRow(props) {
  const user = props.user
  const userLink = `#/users/${user.id}`
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

class Users extends Component {

  componentDidMount() {
    this.props.getUsers();
   
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
                   
                    {
                    this.props.users.map((user, index) =>
                      <UserRow key={index} user={user} />
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
    users: state.user.users,
    isLoading: state.user.isLoading
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: bindActionCreators(getUsers, dispatch),
    addUser: bindActionCreators(addUser, dispatch),
    removeUser:bindActionCreators(removeUser,dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);

