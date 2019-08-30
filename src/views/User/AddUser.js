import React,{Component} from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom'
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Table,
    Modal, 
    ModalBody,
      ModalHeader
,
ModalFooter  } from 'reactstrap';

class AddUser extends Component{
constructor(props){
    super(props);
    this.state={
        user:'',
        roles:[],
        companies:[],
            loginid:'',
            password:'',
            name:'',
            phone:'',
            email:'',
            status:'',
            userroleid:'',
            companyid:'',
            success:false,
            danger:false,
            flag:false
            
        }
    
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.toggleDanger = this.toggleDanger.bind(this);
}
toggleDanger() {
    this.setState({
      danger: !this.state.danger,
    });
  }
  toggleSuccess() {
    this.setState({
      success: !this.state.success,
      flag:true
      
    });
}
componentDidMount(){
    Axios.get('http://localhost:37329/Roles/getRoleNames')
    .then(response=> {
        this.setState({
            roles:response.data
        })
    })

    Axios.get('http://localhost:37329/Company/getall')
    .then(response=> {
        const temp = JSON.parse(response.data);
        this.setState({
            companies:temp
        })
    })
}
onSuccess(){
    this.setState({
        flag:true
    })
}
onSubmit=(event)=>{
    
    const user = {
        "CompanyUserLoginID":this.state.loginid,
        "CompanyUserPassword":this.state.password,
        "CompanyUserName":this.state.name,
        "CompanyUserPhone":this.state.phone,
        "CompanyUserEmail":this.state.email,
        "CompanyUserStatus":this.state.status,
        "UserRoleID":this.state.userroleid,
        "CompanyID":this.state.companyid
    }
    
    Axios.post("http://localhost:37329/User/Add",user)
.then(response=> {
    console.log(response);
if(response.status=='201'){
this.toggleSuccess();

}

})
.catch(error =>{
console.log(error);
this.toggleDanger();

})
   
    
}
handleChange(event){
    let nam = event.target.name;
    let val = event.target.value;
   console.log(nam);
   console.log(val);
     this.setState({
         [nam]:val
     })
}
render(){
    if(this.state.flag){
        return(
            <Redirect to="/Company"/>
        )
    }
    return (
        <>
        <Row>
            <Col md="2"></Col>
            <Col md="8">
                <Card>
                    <CardHeader>New User</CardHeader>
                    <CardBody>
                        <Form className="form-horizontal" >
                            <Row>
                                <Col md="6">
                                    <FormGroup row>
                                        <Col xs="3" md="3">
                                             <Label htmlFor="loginid">Login Id</Label>
                                        </Col>
                                        <Col xs="8" md="8">
                                            <Input type="text" name="loginid" id="loginid" onChange={this.handleChange}  required/>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col xs="3" md="3">
                                             <Label htmlFor="password">Password</Label>
                                        </Col>
                                        <Col xs="8" md="8">
                                            <Input type="password" name="password" id="password"  onChange={this.handleChange}  required/>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col xs="3" md="3">
                                             <Label htmlFor="name">Name</Label>
                                        </Col>
                                        <Col xs="8" md="8">
                                            <Input type="text" id="name" name="name"  onChange={this.handleChange}/>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col xs="3" md="3">
                                             <Label htmlFor="phone">Phone No</Label>
                                        </Col>
                                        <Col xs="8" md="8">
                                            <Input type="text" id="phone" name="phone"  onChange={this.handleChange} />
                                        </Col>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                <FormGroup row>
                                        <Col xs="3" md="3">
                                             <Label htmlFor="email">Email</Label>
                                        </Col>
                                        <Col xs="8" md="8">
                                            <Input type="email" id="email" name="email"  onChange={this.handleChange} required/>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="3">
                                            <Label>Status</Label>
                                        </Col>
                                        <Col md="9">
                                            <FormGroup check inline>
                                                <Input className="form-check-input" type="radio" id="active" name="status" value="1" onChange={this.handleChange}/>
                                                <Label className="form-check-label" check htmlFor="active">Active</Label>
                                            </FormGroup>
                                            <FormGroup check inline>
                                                <Input className="form-check-input" type="radio" id="inactive" name="status" value="0" onChange={this.handleChange}/>
                                                <Label className="form-check-label" check htmlFor="inactive">In Active</Label>
                                            </FormGroup>
                                        </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col xs="3" md="3">
                                                <Label htmlFor="role">Role</Label>
                                            </Col>
                                            <Col xs="8" md="8">
                                                <Input type="select" id="role" name="userroleid" onChange={this.handleChange}>
                                                {
                                                        this.state.roles.map((role)=>{
                                                            return(
                                                                <option value={role}>{role}</option>
                                                            )
                                                        })
                                                    }
                                                </Input>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup row>
                                            <Col xs="3" md="3">
                                                <Label htmlFor="company">Company</Label>
                                            </Col>
                                            <Col xs="8" md="8">
                                                <Input type="select" id="company" name="companyid" onChange={this.handleChange}>
                                                    {
                                                        this.state.companies.map((company)=>{
                                                            return(
                                                                <option value={company.CompanyID}>{company.CompanyName}</option>
                                                            )
                                                        })
                                                    }
                                                </Input>
                                            </Col>
                                        </FormGroup>
                                </Col>
                                <Col>
                                <Button type="button" onClick={this.onSubmit} color="primary" size="lg">Add User</Button>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>

        <Modal isOpen={this.state.success} toggle={this.toggleSuccess}
                       className={'modal-success ' + this.props.className}>
                  <ModalHeader toggle={this.toggleSuccess}>Success</ModalHeader>
                  <ModalBody>
                    Company has been added Successfully
                  </ModalBody>
                  <ModalFooter>
                      <Button type="button" color="success" onClick={this.onSuccess}>Ok</Button>
                  </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
                       className={'modal-danger ' + this.props.className}>
                  <ModalHeader toggle={this.toggleSuccess}>Error</ModalHeader>
                  <ModalBody>
                    Something went Wrong
                  </ModalBody>
                  <ModalFooter>
                  <Button type="button" color="danger" onClick={this.toggleDanger}>Ok</Button>
                  </ModalFooter>
                </Modal>

        </>
    )
}
}
export default AddUser;