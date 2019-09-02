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
class UserList extends Component{
    constructor(){
        super();
        this.state={
            companies:[],
            users:[],
            flag:false
        }
        this.redirect=this.redirect.bind(this);
    }
    redirect(event){
        this.setState({
            flag:true
        })
    }
    
 
    
    componentDidMount(){
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
render(){
if(this.state.flag == true){
    return(
        <Redirect to="AddUser"/>
    )
}
    return(
        <>
        <Row>
        <Col md="8"></Col>
               <Col md="2">
                   <Button type="button" size="lg" color="primary" onClick={this.redirect}>Add New User</Button><br/>
               </Col>
               </Row>
               <Row>
               <Col md="2"></Col>
               <Col md="8">
                   <br/>
                   <Card>
                       <CardHeader><h3>Users</h3></CardHeader>
                       <CardBody>
                
                   <Table striped>
                    <tr>
                        <th>S.No</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>Role</th>
                        <th>Company</th>
                        <th>Status</th>
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
                                </tr>
                            )
                        })
                    }
                   </Table>
                   </CardBody>
                   </Card>
               </Col>
               </Row>
               </>
    )
}
}export default UserList;