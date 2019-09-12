import React,{ Component } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
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
import './style.css';
class EquipmentDetails extends Component{

constructor(props){
  super(props);
  this.state={
    Schedule:[],
    equipmentid:'',
    equipment:[],
    details:[],
    categories:[],
    updateflag:false,
    EquipmentName :'',
    Accuracy   :'',   
    EquipmentType  :'',          
		AssetID         :'',
    Custodian        :'', 
    Model         :'',
    Make         :'',
    FamilyName       :'',  
    EquipmentRange       :'',  
    Category         :'',
    Location         :'',
    Others         :'',
    redirect:'',
    SBasis:'',
    SType:'',
    InpectionDuration:'',
    Interval:'',
    Margin:'',
    Alert:'',
    SName:'',
    SuccessFlag:false,
    equipmentscheduleid:''
  }
  this.handleChange=this.handleChange.bind(this);
  this.btnAdd=this.btnAdd.bind(this);
  this.btnUpdate=this.btnUpdate.bind(this);
  this.Calculate=this.Calculate.bind(this);
  this.addSchedule=this.addSchedule.bind(this);
  this.viewDetails=this.viewDetails.bind(this);
}
viewDetails(id){
  this.setState({
      SuccessFlag:true
  })
}
enableCalender(){
  document.getElementById("CInterval").disabled=false;
  document.getElementById("CPredefined").disabled=false;
  document.getElementById("CPredefined").focus();
  document.getElementById("CAlertMargin").disabled=false;
  document.getElementById("CLeverage").disabled=false;
  document.getElementById("MPredefined").disabled=true;
  document.getElementById("MAlertMargin").disabled=true;
  document.getElementById("MLeverage").disabled=true;
   document.getElementById("MPredefined").value="";
  // document.getElementById("MAlertMargin").value="";
  // document.getElementById("MLeverage").value="";
}
enableMeter(){

  document.getElementById("MPredefined").disabled=false;
  document.getElementById("MPredefined").focus();
  document.getElementById("MAlertMargin").disabled=false;
  document.getElementById("MLeverage").disabled=false;
  document.getElementById("CInterval").disabled=true;
  document.getElementById("CPredefined").disabled=true;
  document.getElementById("CAlertMargin").disabled=true;
  document.getElementById("CLeverage").disabled=true;
  // document.getElementById("CPredefined").value="";
  // document.getElementById("CAlertMargin").value="";
  // document.getElementById("CLeverage").value="";
  // document.getElementById("CInterval").value="";
}
addSchedule(event){
 if(this.state.equipmentid==""){
alert("cant add schedule");
 }else{
var newschedule={
  "EquipmentScheduleID":"",
  "EquipmentScheduleName":this.state.SName,
  "EquipmentScheduleBasis":this.state.SBasis,
  "EquipmentScheduleType":this.state.SType,
  "InspectionDuration":this.state.InpectionDuration,
  "LastInspectionDate":"",
  "NextInspectionDate":"",
  "Margin":this.state.Margin,
  "Interval":this.state.Interval,
  "Leverage":this.state.Leverage,
  "EquipmentID":this.state.equipmentid
}
Axios.post('http://localhost:37329/Schedule/AddNew',newschedule)
.then(response=> {
  console.log(response);
  if(response.status=="201"){
   alert("success");
   this.setState({
     equipmentscheduleid:response.data.EquipmentScheduleID,
     SuccessFlag:true
   })
}
})
 }
}
componentDidMount(){
  Axios.get('http://localhost:37329/Equipment/getAllCategories')
       .then(response =>{
           const parsed = JSON.parse(response.data);
           this.setState({
               categories:parsed
           });
          })
 if(typeof this.props.location.state  == 'undefined' || this.props.location.state == null){
  }
 else{
  Axios.get("http://localhost:37329/Equipment/scheduleEquipment/"+this.props.location.state.id)
  .then(response =>{
    const temp = JSON.parse(response.data);
    this.setState({
      Schedule:temp
    })
    console.log(this.state.Schedule);
  })
   // console.log(this.props.location.state.id);
    this.setState({
      equipmentid:this.props.location.state.id,
      updateflag:true
    })
    console.log(this.state.equipmentid);
    Axios.get('http://localhost:37329/Equipment/getequipment/'+this.props.location.state.id)
 //  Axios.get('http://localhost:37329/Equipment/getequipment/AF673D0B-ACFD-4BA0-8BE2-60DE81A4A21D')
     .then(response =>{
         const parsed = JSON.parse(response.data);
         this.setState({
             details:parsed,
             EquipmentName:parsed[0].EquipmentName,
            Accuracy:parsed[0].EquipmentAccuracy,         
           EquipmentType:parsed[0].EquipmentType ,               
		   AssetID:parsed[0].AssetID ,   
            Custodian:parsed[0].EquipmentCustodian,            
            Model:parsed[0].EquipmentModel,   
           Make:parsed[0].EquipmentMake ,   
            FamilyName:parsed[0].EquipmentFamilyName,            
           EquipmentRange:parsed[0].EquipmentRange ,            
           Category:parsed[0].EquipmentCategoryID ,   
           Location:parsed[0].EquipmentLocation ,   
           Others:parsed[0].EquipmentOthers ,   
		    });
         console.log(parsed[0].EquipmentName);
         console.log(this.state.equipmentid);
          document.getElementById("EquipmentName").value=this.state.details[0].EquipmentName;
          document.getElementById("Accuracy").value=this.state.details[0].EquipmentAccuracy;
          document.getElementById("EquipmentType").value=this.state.details[0].EquipmentType;   
			    document.getElementById("AssetID").value=this.state.details[0].AssetID;
          document.getElementById("Custodian").value=this.state.details[0].EquipmentCustodian;
          document.getElementById("Model").value=this.state.details[0].EquipmentModel;
          document.getElementById("Make").value=this.state.details[0].EquipmentMake;
          document.getElementById("FamilyName").value=this.state.details[0].EquipmentFamilyName;
          document.getElementById("EquipmentRange").value=this.state.details[0].EquipmentRange;
          document.getElementById("Category").value=this.state.details[0].EquipmentCategoryID;
         document.getElementById("Location").value=this.state.details[0].EquipmentLocation;
          
          document.getElementById("Others").value=this.state.details[0].EquipmentOthers;
  })
}



}
handleChange(event){
  let nam = event.target.id;
  let val = event.target.value;
  this.setState({
    [nam]:val
  })
 console.log(nam);
 console.log(val);
}
btnAdd(event){
  var today = new Date();
var newequipment={
      "EquipmentID":""
      ,"EquipmentName":this.state.EquipmentName    
      ,"EquipmentAccuracy":this.state.Accuracy         
      ,"EquipmentType":this.state.EquipmentType               
      ,"AssetID":this.state.AssetID   
      ,"EquipmentCustodian":this.state.Custodian            
      ,"EquipmentModel":this.state.Model   
      ,"EquipmentMake":this.state.Make   
      ,"EquipmentFamilyName":this.state.FamilyName            
      ,"EquipmentRange":this.state.EquipmentRange            
      ,"EquipmentCategoryID":this.state.Category   
      ,"EquipmentLocation":this.state.Location   
      ,"EquipmentOthers":this.state.Others   
      ,"CreatedOn":today
      ,"CreatedBy":"System"
      ,"CompanyID":"58391212-CE6B-4356-BD8C-AE7BFC746FCF"
}
Axios.post('http://localhost:37329/Equipment/AddNew',newequipment)
.then(response=> {
  console.log(response);
  if(response.status=="201"){
   this.setState({
    redirect:true
  })
}
})
}
Calculate(event){
  var leverage=0,alert=0,interval=0;
if(event.target.value=="7"){
  document.getElementById("CLeverage").value=1;
  document.getElementById("CAlertMargin").value=1;
  document.getElementById("CInterval").value=7;
  leverage=1;
  alert=1;
  interval=7;
}
if(event.target.value=="30"){
  document.getElementById("CLeverage").value=7;
  document.getElementById("CAlertMargin").value=7;
  document.getElementById("CInterval").value=30;
  leverage=7;
  alert=7;
  interval=30;
}
if(event.target.value=="90"){
  document.getElementById("CLeverage").value=15;
  document.getElementById("CAlertMargin").value=15;
  document.getElementById("CInterval").value=90;
  leverage=15;
  alert=15;
  interval=90;
}
if(event.target.value=="180"){
  document.getElementById("CLeverage").value=30;
  document.getElementById("CAlertMargin").value=30;
  document.getElementById("CInterval").value=180;
  leverage=30;
  alert=30;
  interval=180;

}
if(event.target.value=="365"){
  document.getElementById("CLeverage").value=45;
  document.getElementById("CAlertMargin").value=45;
  document.getElementById("CInterval").value=365;
  leverage=45;
  alert=45;
  interval=365;
}
if(event.target.value=="1"){
  document.getElementById("CLeverage").value=0;
  document.getElementById("CAlertMargin").value=0;
  document.getElementById("CInterval").value=1;
  leverage=0;
  alert=0;
  interval=1;
}
this.setState({
  InpectionDuration:event.target.value,
  Interval:interval,
  Margin:alert,
  Leverage:leverage
})
console.log(this.state.Interval);
}
btnUpdate(event){
  
  var updateequipment={
    "EquipmentID":this.state.equipmentid
    ,"EquipmentName":this.state.EquipmentName    
    ,"EquipmentAccuracy":this.state.Accuracy         
    ,"EquipmentType":this.state.EquipmentType               
    ,"AssetID":this.state.AssetID   
    ,"EquipmentCustodian":this.state.Custodian            
    ,"EquipmentModel":this.state.Model   
    ,"EquipmentMake":this.state.Make   
    ,"EquipmentFamilyName":this.state.FamilyName            
    ,"EquipmentRange":this.state.EquipmentRange            
    ,"EquipmentCategoryID":this.state.Category   
    ,"EquipmentLocation":this.state.Location   
    ,"EquipmentOthers":this.state.Others   

  }
  Axios.post('http://localhost:37329/Equipment/UpdateEquipment',updateequipment)
  .then(response=>{
    console.log(response);
  })
}
onChange(){
  
}
render(){
  if(this.state.SuccessFlag){
    return( 
           
      <Redirect
      to={{
         pathname: "/EquipmentManagement/Schedule/",
         state: { id: this.state.equipmentid }
     }}
      />
    
     )
     
  }
  if(this.state.redirect){
    return(
      <Redirect to="Equipment"/>
    )
  }
  return(
    <>
    <Row>
    <Col md="12" >
    <Form className="form-horizontal" id="form1" onChange={this.handleChange}>
         <Card>
             <CardHeader> Equipment </CardHeader>
             <CardBody>
             <Row>
       <Col md="6">
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
               <Input type="text" id="EquipmentType" size="sm"/>
               </Col>
           </FormGroup>
           <FormGroup row>
               <Col xs="3" md="3">
               <Label htmlFor="AssetID">Asset ID</Label>
               </Col>
               <Col xs="8" md="8">
               <Input type="text" id="AssetID" size="sm"/>
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
               <Label htmlFor="FamilyName">Family Name</Label>
               </Col>
               <Col xs="8" md="8">
               <Input type="text" id="FamilyName" size="sm"/>
               </Col>
           </FormGroup>
           <Row>
             <Col md="3">Criticality :</Col>
             <Col md="8">
           <FormGroup row>
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
                </FormGroup>
                </Col>
           </Row>
         </Col>
         <Col md="6">
         <FormGroup row>
               <Col xs="3" md="3">
               <Label htmlFor="Location">Location</Label>
               </Col>
               <Col xs="8" md="8">
               <Input  id="Location" size="sm" type="text"  />
               </Col>
           </FormGroup>
           
              <FormGroup row>
                  <Col xs="3" md="3">
                  <Label htmlsFor="Category">Category</Label>
                  </Col>
                  <Col xs="8" md="8">
                  <Input type="select" id="Category" size="sm" value={this.state.Category}>
                  <option value="">Select a Category</option>
                  {
                   this.state.categories.map(cat =>{
                     return(
                       <option value={cat.EquipmentCategoryID}>{cat.EquipmentCategoryName}</option>
                     )
                   })
                  }
                    </Input>
                  
                  </Col>
              </FormGroup>
              <FormGroup row >
               <Col xs="3" md="3">
               <Label htmlFor="Model">Model</Label>
               </Col>
               <Col xs="3" md="3">
               <Input type="text" className="w-75" id="Model" size="sm"/>
               </Col>
               <Col xs="3" md="3">
               <Label htmlFor="Make">Make</Label>
               </Col>
               <Col xs="3" md="3">
               <Input type="text" className="w-75" id="Make" size="sm"/>
               </Col>
           </FormGroup>
           <FormGroup row>
               <Col xs="3" md="3">
               <Label htmlFor="Accuracy">Accuracy</Label>
               </Col>
               <Col xs="3" md="3">
               <Input type="text" className="w-75" id="Accuracy" size="sm"/>
               </Col>
               <Col xs="3" md="3">
               <Label htmlFor="EquipmentRange">Range</Label>
               </Col>
               <Col xs="3" md="3">
               <Input type="text" className="w-75" id="EquipmentRange" size="sm"/>
               </Col>
           </FormGroup>
           <FormGroup row>
               <Col xs="3" md="3">
               <Label htmlFor="Others">Others</Label>
               </Col>
               <Col xs="3" md="3">
               <Input type="text" className="w-75" id="Others" size="sm"/>
               </Col>
           </FormGroup>
         </Col>
           </Row>
      </CardBody>
                  <CardFooter>
                    {(this.state.updateflag)?<Button type="button" onClick={this.btnUpdate} color="warning">Update</Button>:<Button type="button" onClick={this.btnAdd} color="success">Add</Button>}
                    {' '}<Button type="button" color="primary">Cancel</Button>
                  </CardFooter>
             </Card>
             </Form>
     </Col>
    </Row>

{//Seconddddddd}
                }
<Card>
                      <CardHeader>Schedule</CardHeader>
                      <CardBody>
                  <Row>
                  <Col md="12">
                    <Row>
                    <Col md="6">
                    
                  <FormGroup row>
                          <Col xs="3" md="3">
                          <Label htmlFor="SName">Name</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="text" id="SName" size="sm" onChange={this.handleChange}/>
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col xs="3" md="3">Schedule Type</Col>
                      <Col xs="8" md="8">
                      <FormGroup check inline>
                          <Input className="form-check-input" type="radio" id="SType" value="PM" name="SType" onChange={this.handleChange}/>
                          <Label className="form-check-label" check htmlFor="PM">PM</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input className="form-check-input" type="radio" id="SType" value="Service" name="SType" onChange={this.handleChange}/>
                          <Label className="form-check-label" check htmlFor="Service">Service</Label>
                        </FormGroup>
                        
                        </Col>
                        </FormGroup>
  
                        <FormGroup row>
                          <Col xs="3" md="3">Inspection Type</Col>
                        <Col xs="8" md="8">
                      <FormGroup check inline>
                          <Input className="form-check-input" type="radio" id="SBasis" name="SBasis" value="calender" onChange={this.handleChange}/>
                          <Label className="form-check-label" check htmlFor="Calender">Calender</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input className="form-check-input" type="radio" id="SBasis"  name="SBasis" value="meter" onChange={this.handleChange}/>
                          <Label className="form-check-label" check htmlFor="MeterHour">MeterHour</Label>
                        </FormGroup>
                        </Col>
                        </FormGroup>
                      <br/>
                      </Col>
                      </Row>
                  </Col>
                  </Row>
                  <Row>
                  <Col md="6">
                    <div id="calenderform">
                      <Card>
                        <CardHeader>Calender Based</CardHeader>
                        <CardBody>
                      <FormGroup row>
                      <Col xs="4" md="4">
                          <Label htmlFor="CPredefined">Predefined Schedule</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="select" id="CPredefined" size="sm" onChange={this.Calculate}>
                          <option value="">select schedule</option>
                          <option value="1">Daily</option>
                          <option value="7">Weekly</option>
                          <option value="30">Monthly</option>
                          <option value="90">Quarterly</option>
                          <option value="180">BiAnnually</option>
                          <option value="365">Annually</option>
                          </Input>
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                      <Col xs="4" md="4">
                          <Label htmlFor="CInterval">Interval(Calender)</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="text" id="CInterval" size="sm" name="interval" onChange={this.handleChange} />
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                      <Col xs="4" md="4">
                          <Label htmlFor="CAlertMargin">Alert Margin</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="text" id="CAlertMargin" size="sm" name="alert" onChange={this.handleChange} />
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                      <Col xs="4" md="4">
                          <Label htmlFor="CLeverage">Leverage</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="text" id="CLeverage" size="sm" name="leverage" onChange={this.handleChange} />
                          </Col>
                      </FormGroup>
                      <Row>
                      <Col md="9"></Col>
                      <Col md="3">
                      <Button type="button" size="sm" color="primary" onClick={this.addSchedule}>Add Schedule</Button>
                      </Col>
                      </Row>
                      </CardBody>
                      </Card>
                    </div>
                  </Col>
  
                  <Col md="6">
                    <div id="MeterForm">
                    <Card>
                        <CardHeader>Meter Based</CardHeader>
                        <CardBody>
                      <FormGroup row>

                      <Col xs="3" md="3">
                          <Label htmlFor="MPredefined">Predefined Schedule</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="text" id="MPredefined" size="sm" disabled/>
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                      <Col xs="3" md="3">
                          <Label htmlFor="MAlertMargin">Alert Margin</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="text" id="MAlertMargin" size="sm" disabled/>
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                      <Col xs="3" md="3">
                          <Label htmlFor="MLeverage">Leverage</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="text" id="MLeverage" size="sm" disabled/>
                          </Col>
                      </FormGroup>
                      <Row>
                      <Col md="9"></Col>
                      <Col md="3">
                      <Button type="button" size="sm" color="primary">Add Schedule</Button>
                      </Col>
                      </Row>
                      <br/>
                      <br/>
                      </CardBody>
                      </Card>
                    </div>
                  </Col>
  
                  </Row>
                  </CardBody>
                  </Card>
                {/*Thirdddddddd*/}
                <Col md="12">
                <Card>
                  <CardHeader>Schedules</CardHeader>
                  <CardBody>
                <Table striped hover>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Basis</th>
                    <th>Parameters</th>
                  </tr>
                  {
                  this.state.Schedule.map((schedule) =>{
                    return(
                      <tr id="hoverrow" onClick={()=>this.viewDetails()}>
                        <td>{schedule.EquipmentScheduleName}</td>
                        <td>{schedule.EquipmentScheduleType}</td>
                        <td>{schedule.EquipmentScheduleBasis}</td>
                        {
                         
                        <td>Interval : {schedule.Interval} , AlertMargin: {schedule.Margin} , Leverage : {schedule.Leverage}</td>
                         
                        }
                      </tr>
                    )
                  })
                } 
               
                </Table>
                  
                </CardBody>
                </Card>
  
           </Col>
    </>
  )
}
}export default EquipmentDetails