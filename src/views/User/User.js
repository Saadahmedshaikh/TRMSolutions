import React,{Component} from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
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

class User extends Component{
constructor(props){
    super(props);
    this.state={
        er:'201',
        user:'',
        roles:[],
        users:[],
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
    var icon =<i class="cui-magnifying-glass icons">Search</i>;
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.toggleDanger = this.toggleDanger.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.search = this.search.bind(this);
    this.delete = this.delete.bind(this);
    console.log(localStorage.getItem("name"));
}
toggleDanger() {
    this.setState({
      danger: !this.state.danger,
    });
  }
  toggleSuccess() {
    this.setState({
      success: !this.state.success
      
    });
  
}

search(event){
    var text = event.target.value;
    Axios.get('http://localhost:37329/User/search/'+text)
    .then(response=>{
       const temp = JSON.parse(response.data);
        this.setState({
            users:temp
        });
        
    })
    
}
componentDidMount(){
    
    Axios.get('http://localhost:37329/Roles/getRoleNames')
    .then(response=> {
        const temp = JSON.parse(response.data);
        this.setState({
            roles:temp
        })
        console.log(this.state.roles);
    })

    Axios.get('http://localhost:37329/Company/getall')
    .then(response=> {
        const temp = JSON.parse(response.data);
        this.setState({
            companies:temp
        })
    })
    Axios.get('http://localhost:37329/User/getall')
        .then(response=>{
           const temp = JSON.parse(response.data);
            this.setState({
                users:temp
            });
            
        })
}
onSuccess(event){
    this.setState({
        success:!this.state.success
    })
    this.componentDidMount();
    document.getElementById("form1").reset();
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
    this.setState({
        er:response.status
    })
    this.toggleSuccess();
    
}
// if(typeof response.data.InnerException != 'undefined'  ){
//     const error =  response.data.InnerException.InnerException.Message;
//     this.setState({
//         er:error
//     })
//     this.toggleDanger();
// }else{
   
//}
}).catch(error=>{
    this.toggleDanger();
})

   
    
}
delete(event){
Axios.delete('http://localhost:37329/User/delete/'+event)
.then(response=>{
    if(response.status=='200'){
        this.setState({
            er:response.status
        })
        this.toggleSuccess();
    }
    
})
}

edit(event){
    alert("are u sure ?"+event);
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
onClear(event){
   
    
    this.setState({
        danger:false
    })
    document.getElementById("form1").reset();
}

render(){
    if(this.state.flag){
        return(
            <Redirect to="/UserList"/>
        )
    }
    return (
        <>
        <Row>
            <Col md="2"></Col>
            <Col md="8">
            <Form className="form-horizontal" id="form1" >
                <Card>
                    <CardHeader>New User</CardHeader>
                    <CardBody>
                        
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
                                                <Label htmlFor="userroleid">Role</Label>
                                            </Col>
                                            <Col xs="8" md="8">
                                                <Input type="select" id="userroleid" name="userroleid" onChange={this.handleChange}>
                                                <option value="">Please select a role</option>
                                                {
                                                        this.state.roles.map((role)=>{
                                                            return(
                                                                <option value={role.UserRoleId}>{role.UserRoleName}</option>
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
                                                    <option value="">Please select a company</option>
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
                                                    
                                </Col>
                            </Row>
                        
                    </CardBody>
                    <CardFooter>
                    <Button type="button" color="primary" onClick={this.onSubmit} size="lg">Add User</Button>
                    </CardFooter>
                </Card>
                </Form>
            </Col>
        </Row>
       
               <Row>
               <Col md="12">
                   <br/>
                   <Card>
                       <CardHeader>
                           <Row>
                               <Col md="8">
                               <h3>Users</h3> 
                               </Col>
                               <Col md="4">
                               <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fa fa-search"></i></span>
                                    </div>
                                    <input id="input1-group1" name="input1-group1" placeholder="Search" type="text" onChange={this.search} class="form-control"/>

                                    </div>
                                
                               </Col>
                            </Row>
                           
                           </CardHeader>
                       <CardBody>
                
                   <Table striped id="example">
                    <tr>
                        <th>S.No</th>
                        <th>Login Id</th>
                        <th>User Name</th>
                        <th>Role</th>
                        <th>Company</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    {
                        
                        this.state.users.map((user,i)=>{
                            
                            
                            i++;
                            return(
                                <tr>
                                    <td>{i}</td>
                                    <td>{user.CompanyUserLoginID}</td>
                                    <td>{user.CompanyUserName}</td>
                                    <td>{user.UserRoleName}</td>
                                    <td>{user.CompanyName}</td>
                                    <td>{(user.CompanyUserStatus==="1")?<Badge color="success">Active</Badge>:<Badge color="danger">In Active</Badge>}</td>
                                    <td><Button type="button" size="sm" color="danger" onClick={  () => this.delete(user.CompanyUserLoginID)}><i class="icon-trash icon"></i></Button>
                                            {' '} <Button type="button" size="sm" color="info" onClick={  () => this.edit(user.CompanyUserLoginID)}><i class="icon-pencil icon"></i></Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                   </Table>
                   </CardBody>
                   </Card>
               </Col>
               </Row>                                                
        <Modal isOpen={this.state.success} toggle={this.toggleSuccess}
                       className={'modal-success ' + this.props.className}>
                  <ModalHeader toggle={this.toggleSuccess}>Success</ModalHeader>
                  <ModalBody>
                      {this.state.er=='201'?
                    <p>User has been added Successfully</p>:<p>User has been deleted Successfully</p>}
                  </ModalBody>
                  <ModalFooter>
                      <Button type="button" color="success" onClick={this.onSuccess}>Ok</Button>
                  </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
                       className={'modal-danger ' + this.props.className}>
                  <ModalHeader toggle={this.toggleDanger}>Error</ModalHeader>
                  <ModalBody>
                    Something Went Wrong
                  </ModalBody>
                  <ModalFooter>
                  <Button type="button" color="danger" onClick={this.onClear}>Ok</Button>
                  </ModalFooter>
                </Modal>

        </>
    )
}
}
export default User;