import React,{Component} from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom'
import {
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
      ModalHeader,
      ModalFooter
  } from 'reactstrap';
class Company extends Component{

    constructor(){
        super();
        this.state={
            company:[],
            companies:[],
            success:false,
            danger:false,
            redirect:false,
            i:1,
            name:'',
            location:'',
            description:'',
            phone:'',
            category:''
        
        }
        this.toggleSuccess = this.toggleSuccess.bind(this);
        this.toggleDanger = this.toggleDanger.bind(this);
        this.addCompany = this.addCompany.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
      toggleSuccess() {
        this.setState({
          success: !this.state.success,
          
        });

      }
      toggleDanger() {
        this.setState({
          danger: !this.state.danger,
          
        });

      }
    componentDidMount(){
        Axios.get('http://localhost:37329/Company/getall')
        .then(response=>{
           const temp = JSON.parse(response.data);
            this.setState({
                companies:temp
            });
        })
    }

    addCompany=(event)=>{
        event.preventDefault();
           const company = {
               "CompanyID":"",
               "CompanyName":this.state.name,
               "CompanyLocation":this.state.location,
               "CompanyDescription":this.state.description,
               "CompanyPhone":this.state.phone
           }
           
           Axios.post("http://localhost:37329/Country/Add",company)
  .then(response=> {
      if(response.status=='201'){
        this.toggleSuccess();
        document.getElementById("form1").reset();
      }
   
  })
  .catch(error =>{
      console.log(error);
      this.toggleDanger();
  })
     
 


    }
 
    refresh=(event)=>{
      this.toggleSuccess();
      this.componentDidMount();
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
        if(this.state.redirect){
            return(
                <Redirect to="/Company"/>
            )
        }

        return(
            <>
            
            <Row>
                <Col md="2">

                </Col>
                <Col md="8">
                <Form className="form-horizontal" id="form1" onSubmit={this.addCompany}>
                <Card>
                    <CardHeader>
                    <h3>New Company</h3>
                    </CardHeader>
                    <CardBody>
                  
                        <Row>
                            <Col md="6">
                            <FormGroup row>
                                    <Col md="3">
                                    <Label htmlFor="Name">Name :</Label>
                                    </Col>
                                    <Col md="8">
                                    <Input type="text" id="Name" name="name" required onChange={this.handleChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                    <Label htmlFor="loc">Location :</Label>
                                    </Col>
                                    <Col md="8">
                                    <Input type="text" id="loc" name="location" required onChange={this.handleChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                    <Label htmlFor="description">Description :</Label>
                                    </Col>
                                    <Col md="8">
                                    <Input type="textarea" id="description" name="description" onChange={this.handleChange}/>
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col md="6">
                            <FormGroup row>
                                    <Col md="3">
                                    <Label htmlFor="phone">Phone :</Label>
                                    </Col>
                                    <Col md="8">
                                    <Input type="text" id="phone" name="phone" onChange={this.handleChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                    <Label htmlFor="category">Category :</Label>
                                    </Col>
                                    <Col md="8">
                                    <Input type="select" id="category" name="category" onChange={this.handleChange}>
                                    <option>1</option>
                                    <option>2</option>
                                    </Input>
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Row>
                                    
                    </CardBody>
                    <CardFooter>
                        
                  <Button type="submit" size="md" color="primary" >Add</Button>{' '}
                    <Button color="danger" type="reset">Cancel</Button>
                    </CardFooter>
                </Card>
                </Form>
                </Col>
            </Row>
               <Row>
               <Col md="2"></Col>
               <Col md="8">
                   <br/>
                   <Card>
                       <CardHeader><h3>Companies</h3></CardHeader>
                       <CardBody>
                
                   <Table striped>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Location</th>
                        <th>Description</th>
                    </tr>
                    {
                        
                        this.state.companies.map((country,i)=>{
                            
                            
                            i++;
                            return(
                                <tr>
                                    <td>{i}</td>
                                    <td>{country.CompanyName}</td>
                                    <td>{country.CompanyPhone}</td>
                                    <td>{country.CompanyLocation}</td>
                                    <td>{country.CompanyDescription}</td>
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
                    Company has been added Successfully
                  </ModalBody>
                  <ModalFooter>
                      <Button type="button" color="success" onClick={this.refresh}>Ok</Button>
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
export default Company;