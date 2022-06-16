// import '../App.css';
import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
var total;
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isActiveComponent : 'loginComponent',
            token : window.localStorage.getItem('jwt'),
            compnayListState : [], 
            dashboardListState : [],
            companyName : '',
            renameDashboardName:'',
            activeDashboardId:'',
            students : [
                {
                  id: "11",
                  marks: 31
                },
                {
                  id: "12",
                  marks: 80
                },
                {
                  id: "3",
                  marks: 98
                }
              ],
        };
        axios.defaults.baseURL = 'https://uat.onplanapp.com/api/';

      }

    handleSetEmail = (e) => {
        this.setState({
            email : e.target.value
        });
    }
    handleSetPassword = (e) => {
        this.setState({
            password : e.target.value
        });
    }
    handleLogOut = () => {
        window.localStorage.removeItem('jwt');
        this.setState({
            isActiveComponent : 'loginComponent'
        });
    }
    

    //login API
    handleLoginAPI = async () => {
        if (this.state.email != '' && this.state.password != ''){
            await axios({
                method: 'post',
                url: '/auth/signin',
                // baseURL :'https://uat.onplanapp.com/api/',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                  },
                data: {
                    usernameOrEmail: this.state.email,
                    password: this.state.password,
                },
            })
            .then(resData => {
                window.localStorage.setItem('jwt', resData.data.body.accessToken);
                this.setState({
                    token : resData.data.body.accessToken,
                });
                this.getCompanyList();
            })
            .catch(function (error) {
                throw error;
            });

            this.setState({
                isActiveComponent : 'companyListComponent'
            });
            
        }
    }

    //get Company list
    getCompanyList = async () => {
        var getAccessToken = `Bearer ${this.state.token }`;
        await axios({
            method: 'get',
            url: '/user/findUserCompanyList?userId=1&isImpersonate=false',
            headers:{
                'Accept': 'application/json',
                'Authorization' : getAccessToken,
              },
          })
          .then(resData => {
            this.setState({
                compnayListState : resData.data.body,
            })
        });
    }

    //get dashboard list
    handleDashboardAccess = async () => {
        var getAccessToken = `Bearer ${this.state.token }`;
        await axios({
            method: 'get',
            url: '/dashboard/getAllDashboards',
            headers:{
                'Accept': 'application/json',
                'Authorization' : getAccessToken,
              },
          })
          .then(resData => {
            this.setState({
                dashboardListState : resData.data.body,
                activeDashboardId : resData.data.body[0].id
            })
        });
        this.setState({
            isActiveComponent : 'dashboardComponent',
        })
    }
    //update company name
    handleUpdateDashboardName = async () => {
        var getAccessToken = `Bearer ${this.state.token }`;
        const dashboardObject = {
            id: this.state.activeDashboardId,
            dashboardName: this.state.renameDashboardName
        }
        await axios({
            method: 'post',
            url: ('/dashboard/renameDashboardName'),
            data:dashboardObject,
            headers:{
                // 'Accept': 'application/json',
                'Authorization' : getAccessToken,
              },
          })
          .then(resData => {
            // this.setState({
            //     companyName : resData.data.body,
            // })
        });
    }
    
    

    handleOnChangeSelectCompany = (e) => {
        this.setState({
            companyName: e.target.value,
        })
    }
    renamedashboardName = (e) => {
        this.setState({
            renameDashboardName: e.target.value,
        })
    }
    


    
    render() {
        const {isActiveComponent, compnayListState, dashboardListState, companyName, renameDashboardName} = this.state;

      return (
        <div>
            {
                isActiveComponent === 'loginComponent' ?
                <div style={{height: '100vh'}} className='d-flex align-items-center justify-content-center'>
                    <div style={{width: '500px', padding:'30px', borderRadius:'10px', boxShadow:'0px 0px 20px rgb(0 0 0 / 15%)'}}>
                        <h5 className='mb-3'>Login</h5>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control onChange={this.handleSetEmail} type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={this.handleSetPassword} type="password" placeholder="Password" />
                            </Form.Group>
                            <Button onClick={this.handleLoginAPI} variant="primary" type="button"> Login </Button>
                        </Form>
                    </div>
                </div>

                : isActiveComponent === 'companyListComponent' ? 

                <div style={{height: '100vh'}} className='d-flex align-items-center justify-content-center'>
                    <div style={{width: '500px', padding:'30px', borderRadius:'10px', boxShadow:'0px 0px 20px rgb(0 0 0 / 15%)'}}>
                        <h6>Select Company</h6>
                        <Form.Select onChange={this.handleOnChangeSelectCompany}>
                            <option disabled selected>Select Company</option>
                            {
                                compnayListState.map((companyName, index) => 
                                <option key={index}>
                                    {companyName.companyName}
                                </option>
                                )
                            }
                        </Form.Select>
                        <Button className='mt-4 mr-2' onClick={this.handleDashboardAccess} variant="primary" type="button"> Submit </Button> &nbsp;&nbsp;
                        {/* <Button className='mt-4' onClick={this.handleLogOut} variant="primary" type="button"> Log Out </Button> */}
                    </div>
                </div>
                : isActiveComponent === 'dashboardComponent' ? 

                <div style={{height: '100vh'}} className='d-flex align-items-center justify-content-center'>
                    <div style={{width: '500px', padding:'30px', borderRadius:'10px', boxShadow:'0px 0px 20px rgb(0 0 0 / 15%)'}}>
                        <h6>Company Name: <strong>{companyName}</strong> </h6>

                        <ul>
                            {
                                dashboardListState.map((dashboardName, index) => 
                                <li key={index}>
                                    {dashboardName.dashboardName}
                                </li>
                                ) 
                            }
                        </ul>

                        <div className='mt-2 mb-3'> 
                            <Form.Group>
                                <Form.Label>Update Dashboard Name</Form.Label>
                                <div className='d-flex align-items-center'>
                                    <Form.Control onChange={this.renamedashboardName} type="text" placeholder="Enter..." />
                                    <Button onClick={this.handleUpdateDashboardName} variant="primary" type="button"> Update </Button>
                                </div>
                            </Form.Group>
                        </div>

                        {/* <Button className='mt-4 mr-2' onClick={this.handleDashboardAccess} variant="primary" type="button"> Submit </Button> &nbsp;&nbsp; */}
                        <Button className='mt-4' onClick={this.handleLogOut} variant="primary" type="button"> Log Out </Button>
                    </div>
                </div> : null
            }
        </div>
      );
    }
  }
  export default Login;
