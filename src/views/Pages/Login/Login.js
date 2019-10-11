import React, { Component } from 'react';

import { Button,Modal,ModalHeader,ModalBody,ModalFooter, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Redirect } from 'react-router-dom'
import { AppSidebar } from '@coreui/react';
import Axios from 'axios';
class Login extends Component {
  
  constructor(props){
    super(props);
    this.state={
      username:"",
      password:"",
      flag:false,
      error:false,
      success:false
    
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(key) {
    return function (e) {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
    
  }
  handleSubmit(event) {
    var login={
      "Username":this.state.username,
      "Password":this.state.password
    }
    Axios.post("http://localhost:37329/USer/login",login).
    then(response =>{
      console.log(response);
      if(response.data){
        sessionStorage.setItem("username",this.state.username);
        this.setState({
          success:true

        })
        
      }
      else{
        this.setState({
          error:true
        })
      }
    })
    
  }
  render() {
    
    if(this.state.flag){
      return <Redirect to="Dashboard"/>
    }
    return (
      <div className="app flex-row align-items-center">
        
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" value="admin" value={this.state.username} onChange={this.handleChange('username')} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" value="admin" value={this.state.password} onChange={this.handleChange('password')} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                        <Button size="lg" color="primary" onClick={this.handleSubmit}> Submit</Button>
                        </Col>
                        
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <br/><br/><br/>
                      <h2>TRM Solutions</h2>
                     <p>Welcome to our Website</p>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
        <Modal isOpen={this.state.error} 
                       className={'modal-danger ' + this.props.className}>
                  <ModalHeader toggle={this.toggleDanger}>Login Unsuccessful</ModalHeader>
                  <ModalBody>
                   Something went Wrongs
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onClick={()=>this.setState({error:!this.state.error})}>Ok</Button>
                  </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.success} 
                       className={'modal-success ' + this.props.className}>
                  <ModalHeader toggle={this.toggleDanger}>Login Successful</ModalHeader>
                  <ModalBody>
                   Welcome back, {this.state.username} ! 
                  </ModalBody>
                  <ModalFooter>
                    <Button color="success" onClick={()=>this.setState({success:!this.state.success,flag:true})}>Continue</Button>
                  </ModalFooter>
                </Modal>
      </div>
    );
  }
}

export default Login;
