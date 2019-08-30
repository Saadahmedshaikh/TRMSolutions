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
      ModalHeader,
      ModalFooter
  } from 'reactstrap';
class Company extends Component{

    constructor(){
        super();
        this.state={
            company:[],
            companies:[],
            modal: false,
            success:false,
            danger:false,
            redirect:false,
            i:1
        
        }
        this.toggle = this.toggle.bind(this);
        this.toggleSuccess = this.toggleSuccess.bind(this);
        this.toggleDanger = this.toggleDanger.bind(this);
    }
    toggle() {
        this.setState({
          modal: !this.state.modal,
        });
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
        this.toggle();    
        var name = document.getElementById("Name").value;
        var loc = document.getElementById("loc").value;
           const company = {
               "CompanyID":"",
               "CompanyName":name,
               "CompanyAddress":loc
           }
           
           Axios.post("http://localhost:37329/Country/Add",company)
  .then(response=> {
      if(response.status=='201'){
        this.toggleSuccess();
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

    render(){
        if(this.state.redirect){
            return(
                <Redirect to="/Company"/>
            )
        }

        return(
            <>
            <Row>
               <Col md="8"></Col>
               <Col md="2">
                   <Button type="button" size="lg" color="primary" onClick={this.toggle}>Add New Company</Button><br/>
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
                        <th>Company Name</th>
                        <th>Company Location</th>
                    </tr>
                    {
                        
                        this.state.companies.map((country,i)=>{
                            
                            
                            i++;
                            return(
                                <tr>
                                    <td>{i}</td>
                                    <td>{country.CompanyName}</td>
                                    <td>{country.CompanyAddress}</td>
                                </tr>
                            )
                        })
                    }
                   </Table>
                   </CardBody>
                   </Card>
               </Col>
               </Row>

               <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                  <ModalHeader toggle={this.toggle}>New Company</ModalHeader>
                  <ModalBody>
                  <Form className="form-horizontal" id="form1">
                                <FormGroup row>
                                    <Col md="3">
                                    <Label htmlFor="Name">Name :</Label>
                                    </Col>
                                    <Col md="8">
                                    <Input type="text" id="Name" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                    <Label htmlFor="loc">Location :</Label>
                                    </Col>
                                    <Col md="8">
                                    <Input type="text" id="loc"/>
                                    </Col>
                                </FormGroup>
                                <Row>
                                    <Col md="10"></Col>
                                <Col md="2">
                                    
                                    </Col>
                                </Row>
                                    </Form>
                            
                  </ModalBody>
                  <ModalFooter>
                  <Button type="button" size="md" color="primary"  onClick={this.addCompany} >Add</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>
                  
                </Modal>
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