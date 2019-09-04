import React,{ Component } from "react";
import { Axios } from "axios";
import { Redirect } from "react-router-dom";
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
} from 'reactstrap';
class EquipmentDetails extends Component{

constructor(){
  super();
}
onChange(){
  
}
render(){
  return(
    <Row>
    <Col md="12" >
    <Form className="form-horizontal" id="form1">
         <Card>
             <CardHeader> Add new equipment/Instrument </CardHeader>
             <CardBody>
             <Row>
       <Col md="4">
           <FormGroup row>
               <Col xs="3" md="3">
               <Label htmlFor="EquipmentName">Equipment Name</Label>
               </Col>
               <Col xs="8" md="8">
               <Input type="text" id="EquipmentName" size="sm"/>
               </Col>
           </FormGroup> 
    
           <FormGroup row>
               <Col xs="3" md="3">
               <Label htmlFor="EquipmentType">Equipment Type</Label>
               </Col>
               <Col xs="8" md="8">
               <Input type="select" id="EquipmentType" size="sm">
                  {
                   
                  } </Input>
               </Col>
           </FormGroup>
   
           <FormGroup row>
               <Col xs="3" md="3">
               <Label htmlFor="EquipmentSpecs">Equipment specs</Label>
               </Col>
               <Col xs="8" md="8">
               <Input type="text" id="EquipmentSpec" size="sm"/>
               </Col>
           </FormGroup>
           <FormGroup row>
               <Col xs="3" md="3">
               <Label htmlFor="Custodian">Custodian</Label>
               </Col>
               <Col xs="8" md="8">
               <Input type="text" id="Custodian" size="sm"/>
               </Col>
           </FormGroup>
           <FormGroup row>
               <Col xs="3" md="3">
               <Label htmlFor="Location">Location</Label>
               </Col>
               <Col xs="8" md="8">
               <Input type="text" id="Location" size="sm"/>
               </Col>
           </FormGroup>
           <FormGroup row>
               <Col xs="3" md="3">
               <Label htmlFor="Model">Model</Label>
               </Col>
               <Col xs="8" md="8">
               <Input type="text" id="Model" size="sm"/>
               </Col>
           </FormGroup>
           <FormGroup row>
               <Col xs="3" md="3">
               <Label htmlFor="Make">Make</Label>
               </Col>
               <Col xs="8" md="8">
               <Input type="text" id="Make" size="sm"/>
               </Col>
           </FormGroup>
           <FormGroup row>
               <Col xs="3" md="3">
               <Label htmlFor="FamilyName">FamilyName</Label>
               </Col>
               <Col xs="8" md="8">
               <Input type="text" id="FamilyName" size="sm"/>
               </Col>
           </FormGroup>
           <FormGroup row>
               <Col xs="3" md="3">
               <Label htmlFor="SequenceNo">SequenceNo</Label>
               </Col>
               <Col xs="8" md="8">
               <Input type="text" id="SequenceNo" size="sm"/>
               </Col>
           </FormGroup>
         </Col>
         <Col md="4">
         <FormGroup row>
               <Col xs="3" md="3">
               <Label htmlFor="Description">Description</Label>
               </Col>
               <Col xs="8" md="8">
               <Input  id="Description" size="sm" type="textarea" name="textarea-input" rows="9"
                       placeholder="Description" />
               </Col>
           </FormGroup>
           <FormGroup row>
                  <Col xs="3" md="3">
                  <Label htmlsFor="InspectionDuration">InspectionDuration</Label>
                  </Col>
                  <Col xs="8" md="8">
                  <Input type="select" id="InspectionDuration" size="sm">
                  {
                   
                  }
                    </Input>
                  
                  </Col>
              </FormGroup>
              <FormGroup row>
                  <Col xs="3" md="3">
                  <Label htmlsFor="Category">Category</Label>
                  </Col>
                  <Col xs="8" md="8">
                  <Input type="select" id="Category" size="sm">
                  {
                   
                  }
                    </Input>
                  
                  </Col>
              </FormGroup>
              <FormGroup row>
                  <Col xs="3" md="3">
                  <Label htmlsFor="ParentEquipment">ParentEquipment</Label>
                  </Col>
                  <Col xs="8" md="8">
                      
                  <Input type="select" id="ParentEquipment" size="sm">
                  { 
                  } </Input>
                   

                   </Col>
              </FormGroup>
       
         </Col>
         <Col md="4">
         <FormGroup check inline>
                  <Input  type="checkbox" id="HasHourMeter"/>
                  <Label >Has Hour Meter?</Label>
                </FormGroup>
                <FormGroup check inline>
                  <Input  type="checkbox" id="IsTagable"/>
                  <Label >Is Tagable?</Label>
                </FormGroup>
                <FormGroup check inline>
                  <Input  type="checkbox" id="IsAsset"/>
                  <Label >Is Asset?</Label>
                </FormGroup>
                
         <FormGroup check inline>
                  <Input  type="radio" id="SafetyCritical" name="Criticality"/>
                  <Label  >SafetyCritical</Label>
                </FormGroup>
                <FormGroup check inline>
                  <Input  type="radio" id="NonCritical" name="Criticality"/>
                  <Label  >NonCritical</Label>
                </FormGroup>
                <FormGroup check inline>
                  <Input  type="radio" id="OperationCritical" name="Criticality"  />
                  <Label  >OperationCritical</Label>
                </FormGroup>
         </Col>
           </Row>
      </CardBody>

             </Card>
             </Form>
     </Col>
 </Row>
  )
}
}export default EquipmentDetails