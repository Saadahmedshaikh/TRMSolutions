import React,{Component} from 'react';
import Axios from 'axios';
import { Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
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

    constructor(){
        super();
        this.toggle = this.toggle.bind(this);
       this.state={
           equipmentid:'',
           details:'',
           Specification:[],
           Schedule:[],
           AssetGroupName:'',
           Assets:[],
           categories:[],
           activeTab: new Array(4).fill('1')
       }
    }
    toggle(tabPane, tab) {
      const newArray = this.state.activeTab.slice()
      newArray[tabPane] = tab
      this.setState({
        activeTab: newArray,
      });
    }
    componentDidMount(){
      Axios.get('http://localhost:37329/Equipment/getAllAssetGroupName')
       .then(response =>{
           const parsed = JSON.parse(response.data);
           this.setState({
               Assets:parsed
               
           });
          })
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
//console.log(this.props.location.state.id);
        //var equipid =this.props.location.state.id;
       Axios.get('http://localhost:37329/Equipment/getequipment/'+this.props.location.state.id)
       // Axios.get('http://localhost:37329/Equipment/getequipment/0EFC4904-DC51-48B6-B704-81FD460208FD')
        .then(response =>{
            const parsed = JSON.parse(response.data);
            this.setState({
                details:parsed
                
            });
           {/* for card one */}
           if(typeof this.state.details[0].EquipmentName !== null)
            document.getElementById("name").value=this.state.details[0].EquipmentName;

            document.getElementById("Description").value=this.state.details[0].Description;
            
            document.getElementById("ParentEquipment").value=this.state.details[0].ParentEquipment;
            document.getElementById("Category").value=this.state.details[0].EquipmentCategoryName;
            document.getElementById("SpecsCategory").value=this.state.details[0].EquipmentCategoryName;
            document.getElementById("IsValve").value=this.state.details[0].HasValveType;   
            document.getElementById("WBSSequence").value=this.state.details[0].WBSSequence;
            document.getElementById("WBSSequencetxt").value=this.state.details[0].WBSSequencetext;
            document.getElementById("Model").value=this.state.details[0].Model;
            document.getElementById("Make").value=this.state.details[0].Make;
            document.getElementById("FamilyName").value=this.state.details[0].FamilyName;
            document.getElementById("SequenceNo").value=this.state.details[0].SequenceNo;
            document.getElementById("tagLocation").value=this.state.details[0].TagNStampingLocation;
            document.getElementById("it").checked=this.state.details[0].IsTagable;
            document.getElementById("hhm").checked=this.state.details[0].HasHourMeter;
            document.getElementById("ia").checked=this.state.details[0].IsAsset;
            document.getElementById("COC").checked=this.state.details[0].COC;
            document.getElementById("COCNo").checked=this.state.details[0].COCNo;
            document.getElementById("Calibration").checked=this.state.details[0].Calibration;
            document.getElementById("CalibrationNo").checked=this.state.details[0].CalibrationNo;
            document.getElementById("Inspect").checked=this.state.details[0].INSPECT;
            document.getElementById("InspectNo").checked=this.state.details[0].INSPECTNo;
            document.getElementById("Pressure").checked=this.state.details[0].PRESSURE;
            document.getElementById("PressureNo").checked=this.state.details[0].PRESSURENo;
            document.getElementById("LoadTest").checked=this.state.details[0].LOADTEST;
            document.getElementById("LoadTestNo").checked=this.state.details[0].LOADTESTNo;
            document.getElementById("KeyEquipment").checked=this.state.details[0].IsKeyEquipment;
            
            var radio="";
            if(this.state.details[0].EquipmentCriticalityName == "Operation Critical")
            var radio = "OperationCritical";
            if(this.state.details[0].EquipmentCriticalityName == "Safety Critical")
            var radio = "SafetyCritical";
            if(this.state.details[0].EquipmentCriticalityName == "Non Critical")
            var radio = "NonCritical";
            document.getElementById(radio).checked=radio;
        });

        Axios.get('http://localhost:37329/Equipment/AssetGroup/'+this.props.location.state.id)
        .then(response => {
          this.setState({
            AssetGroupName:response.data
          })
          document.getElementById("AssetGroup").value=this.state.AssetGroupName;
        })

        {/* for card two */}
        Axios.get("http://localhost:37329/Equipment/scheduleEquipment/"+this.props.location.state.id)
        .then(response =>{
          const temp = JSON.parse(response.data);
          this.setState({
            Schedule:temp
          })
          console.log(this.state.Schedule);
        })
        Axios.get("http://localhost:37329/Equipment/Specification/"+this.props.location.state.id)
        .then(response =>{
          const temp = JSON.parse(response.data);
          this.setState({
            Specification:temp
          })
          console.log(this.state.Specification);
        })
      }  
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
    tabPane() {
      return (
        <>
          <TabPane tabId="1">
            
          <Row>
              <Col md="12">
              <Form className="form-horizontal" id="form1">
                  <Card>
                      <CardHeader>Equipment Details</CardHeader>
                      <CardBody>    
                  <Row>
                  <Col md="4">
                      <FormGroup row>
                          <Col xs="3" md="3">
                          <Label htmlFor="name">Name</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="text" id="name" size="sm"/>
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                          <Col xs="3" md="3">
                          <Label htmlFor="Description">Description</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="text" id="Description" size="sm"/>
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                          <Col xs="3" md="3">
                          <Label htmlFor="AssetGroup">AssetGroup</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="select" id="AssetGroup" size="sm">
                          {
                            this.state.Assets.map((asset)=>{
                              return(
                              <option value={asset}>{asset}</option>
                              )
                            })
                          }
                            </Input>
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                          <Col xs="3" md="3">
                          <Label htmlFor="ParentEquipment">ParentEquipment</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="text" id="ParentEquipment" size="sm"/>
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                          <Col xs="3" md="3">
                          <Label htmlFor="Category">Category</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="select" id="Category" size="sm">
                          {
                            this.state.categories.map((cat)=>{
                              return(
                              <option value={cat}>{cat}</option>
                              )
                            })
                          }
                            </Input>
                          
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                          <Col xs="3" md="3">
                          <Label htmlFor="SpecsCategory">SpecsCategory</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="select" id="SpecsCategory" size="sm">
                          {
                            this.state.categories.map((cat)=>{
                              return(
                              <option value={cat}>{cat}</option>
                              )
                            })
                          }
                            </Input>
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                          <Col xs="3" md="3">
                          <Label htmlFor="IsValve">IsValve</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="text" id="IsValve" size="sm"/>
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                          <Col xs="3" md="3">
                          <Label htmlFor="WBSSequence">WBSSequence</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="text" id="WBSSequence" size="sm"/>
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                          <Col xs="3" md="3">
                          <Label htmlFor="WBSSequencetxt">WBSSequencetxt</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="text" id="WBSSequencetxt" size="sm"/>
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                      <Col md="3">
                        
                      </Col>
                      <Col md="9">
                        <FormGroup check inline>
                          <Input className="form-check-input" type="checkbox" id="hhm"/>
                          <Label className="form-check-label" check htmlFor="hhm">Has Hour Meter?</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input className="form-check-input" type="checkbox" id="it"/>
                          <Label className="form-check-label" check htmlFor="it">Is Tagable?</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input className="form-check-input" type="checkbox" id="ia"/>
                          <Label className="form-check-label" check htmlFor="ia">Is Asset?</Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                  </Col>
  
  
  
                  <Col md="4">
                      <FormGroup row>
                          <Col xs="3" md="3">
                          <Label htmlFor="Model">Model :</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="text" id="Model" size="sm"/>
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                          <Col xs="3" md="3">
                          <Label htmlFor="Make">Make :</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="text" id="Make" size="sm"/>
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                          <Col xs="3" md="3">
                          <Label htmlFor="FamilyName">FamilyName :</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="text" id="FamilyName" size="sm" />
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                          <Col xs="3" md="3">
                          <Label htmlFor="SequenceNo">SequenceNo :</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="text" id="SequenceNo" size="sm"/>
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                      <Col md="3">
                        
                      </Col>
                      <Col md="9">
                        <FormGroup check inline>
                          <Input className="form-check-input" type="checkbox" id="COC"/>
                          <Label className="form-check-label" check htmlFor="COC">COC</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input className="form-check-input" type="checkbox" id="COCNo"/>
                          <Label className="form-check-label" check htmlFor="COCNo">COCNo</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input className="form-check-input" type="checkbox" id="KeyEquipment"/>
                          <Label className="form-check-label" check htmlFor="KeyEquipment">KeyEquipment</Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        
                      </Col>
                      <Col md="9">
                        <FormGroup check inline>
                          <Input className="form-check-input" type="checkbox" id="Calibration"/>
                          <Label className="form-check-label" check htmlFor="Calibration">Calibration</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input className="form-check-input" type="checkbox" id="CalibrationNo"/>
                          <Label className="form-check-label" check htmlFor="CalibrationNo">CalibrationNo</Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        
                      </Col>
                      <Col md="9">
                        <FormGroup check inline>
                          <Input className="form-check-input" type="checkbox" id="Inspect"/>
                          <Label className="form-check-label" check htmlFor="Inspect">Inspect</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input className="form-check-input" type="checkbox" id="InspectNo"/>
                          <Label className="form-check-label" check htmlFor="InspectNo">InspectNo</Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        
                      </Col>
                      <Col md="9">
                        <FormGroup check inline>
                          <Input className="form-check-input" type="checkbox" id="Pressure"/>
                          <Label className="form-check-label" check htmlFor="Pressure">Pressure</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input className="form-check-input" type="checkbox" id="PressureNo"/>
                          <Label className="form-check-label" check htmlFor="PressureNo">PressureNo</Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        
                      </Col>
                      <Col md="9">
                        <FormGroup check inline>
                          <Input className="form-check-input" type="checkbox" id="CATIII"/>
                          <Label className="form-check-label" check htmlFor="CATIII">CAT III</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input className="form-check-input" type="checkbox" id="CATIIINo"/>
                          <Label className="form-check-label" check htmlFor="CATIIINo">CAT III No</Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        
                      </Col>
                      <Col md="9">
                        <FormGroup check inline>
                          <Input className="form-check-input" type="checkbox" id="CATIV"/>
                          <Label className="form-check-label" check htmlFor="CATIV">CAT IV</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input className="form-check-input" type="checkbox" id="CATIVNo"/>
                          <Label className="form-check-label" check htmlFor="CATIVNo">CAT IV No</Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        
                      </Col>
                      <Col md="9">
                        <FormGroup check inline>
                          <Input className="form-check-input" type="checkbox" id="LoadTest"/>
                          <Label className="form-check-label" check htmlFor="LoadTest">LoadTest</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input className="form-check-input" type="checkbox" id="LoadTestNo"/>
                          <Label className="form-check-label" check htmlFor="LoadTestNo">LoadTest No</Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        
                      </Col>
                      <Col md="9">
                        <FormGroup check inline>
                          <Input className="form-check-input" type="radio" id="SafetyCritical" name="Criticality"/>
                          <Label className="form-check-label" check htmlFor="SafetyCritical">SafetyCritical</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input className="form-check-input" type="radio" id="NonCritical" name="Criticality"/>
                          <Label className="form-check-label" check htmlFor="NonCritical">NonCritical</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input className="form-check-input" type="radio" id="OperationCritical" name="Criticality"  />
                          <Label className="form-check-label" check htmlFor="OperationCritical">OperationCritical</Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                  </Col>
  
  
                  <Col md="4">
                  <Label htmlFor="tagLocation">Textarea</Label>
                  <FormGroup row>
                     
                      <Col xs="9" md="9">
                        <Input type="textarea" name="textarea-input" id="tagLocation" rows="9"
                               placeholder="Content..." />
                      </Col>
                    </FormGroup>
  
                  </Col>
  
                  </Row>
                  <Row>
                      <hr/>
                      <Col md="12">
                      <Button type="submit" size="lg" color="primary" ><i className="fa fa-dot-circle-o"></i> Save</Button>{'   '}
                  <Button type="reset" size="lg" color="danger"><i className="fa fa-ban"></i> Cancel</Button>
                      </Col>
                  </Row>
                  </CardBody>
                  </Card>
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
                          <Input type="text" id="SName" size="sm"/>
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                      <Col xs="12" md="12">
                      <FormGroup check inline>
                          <Input className="form-check-input" type="radio" id="PM" name="SType"/>
                          <Label className="form-check-label" check htmlFor="PM">PM</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input className="form-check-input" type="radio" id="Service" name="SType"/>
                          <Label className="form-check-label" check htmlFor="Service">Service</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input className="form-check-input" type="radio" id="Inspection" name="SType"  />
                          <Label className="form-check-label" check htmlFor="Inspection">Inspection</Label>
                        </FormGroup>
                        </Col>
                        </FormGroup>
  
                        <FormGroup row>
                        <Col xs="12" md="12">
                      <FormGroup check inline>
                          <Input className="form-check-input" type="radio" id="Calender" name="SBasis" onChange={this.enableCalender}/>
                          <Label className="form-check-label" check htmlFor="Calender">Calender</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input className="form-check-input" type="radio" id="MeterHour" name="SBasis" onChange={this.enableMeter}/>
                          <Label className="form-check-label" check htmlFor="MeterHour">MeterHour</Label>
                        </FormGroup>
                        </Col>
                        </FormGroup>
  
                      </Col>
                      <Col md="6">
                        <FormGroup row>
                        <Col xs="3" md="3">
                          <Label htmlFor="SAT">Schedule Activation Type</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="text" id="SAT" size="sm"/>
                          </Col>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input className="form-check-input" type="checkbox" id="Certificate"/>
                          <Label className="form-check-label" check htmlFor="Certificate">Certificate Required</Label>
                        </FormGroup>{'    '}
                        <Button type="button" size="md" color="primary" >Clone Schedule</Button>
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
                      <FormGroup Row>
                      <Col xs="3" md="3">
                          <Label htmlFor="CPredefined">Predefined Schedule</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="text" id="CPredefined" size="sm" disabled/>
                          </Col>
                      </FormGroup>
                      <FormGroup Row>
                      <Col xs="3" md="3">
                          <Label htmlFor="CInterval">Interval(Calender)</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="text" id="CInterval" size="sm" disabled/>
                          </Col>
                      </FormGroup>
                      <FormGroup Row>
                      <Col xs="3" md="3">
                          <Label htmlFor="CAlertMargin">Alert Margin</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="text" id="CAlertMargin" size="sm" disabled/>
                          </Col>
                      </FormGroup>
                      <FormGroup Row>
                      <Col xs="3" md="3">
                          <Label htmlFor="CLeverage">Leverage</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="text" id="CLeverage" size="sm" disabled/>
                          </Col>
                      </FormGroup>
                      <Col md="2"></Col>
                      <Col md="10">
                      <Button type="button" size="sm" color="primary">Add Schedule</Button>
                      </Col>
                      </CardBody>
                      </Card>
                    </div>
                  </Col>
  
                  <Col md="6">
                    <div id="MeterForm">
                    <Card>
                        <CardHeader>Calender Based</CardHeader>
                        <CardBody>
                      <FormGroup Row>
                      <Col xs="3" md="3">
                          <Label htmlFor="MPredefined">Predefined Schedule</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="text" id="MPredefined" size="sm" disabled/>
                          </Col>
                      </FormGroup>
                      <FormGroup Row>
                      <Col xs="3" md="3">
                          <Label htmlFor="MAlertMargin">Alert Margin</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="text" id="MAlertMargin" size="sm" disabled/>
                          </Col>
                      </FormGroup>
                      <FormGroup Row>
                      <Col xs="3" md="3">
                          <Label htmlFor="MLeverage">Leverage</Label>
                          </Col>
                          <Col xs="8" md="8">
                          <Input type="text" id="MLeverage" size="sm" disabled/>
                          </Col>
                      </FormGroup>
                      <Col md="2"></Col>
                      <Col md="10">
                      <Button type="button" size="sm" color="primary">Add Schedule</Button>
                      </Col>
                      <br/>
                      <br/>
                      </CardBody>
                      </Card>
                    </div>
                  </Col>
  
                  </Row>
                  </CardBody>
                  </Card>
              </Form>
                  
              </Col>
              <Col md="12">
                <Card>
                  <CardHeader>Schedules</CardHeader>
                  <CardBody>
                <Table striped hover bordered>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Basis</th>
                    <th>Parameters</th>
                  </tr>
                
                {
                  this.state.Schedule.map((schedule) =>{
                    return(
                      <tr>
                        <td>{schedule.Name}</td>
                        <td>{schedule.Type}</td>
                        <td>{schedule.Basis}</td>
                        {
                          (schedule.RecurranceCalendarValue != 0 && schedule.RecurranceCalendarValue != null)?
                        <td>Interval : {schedule.RecurranceCalendarValue} , AlertMargin: {schedule.CalendarAlertMargin} , Leverage : {schedule.CalendarEscalationMargin}</td>
                          :<td>Interval : {schedule.RecurranceMeterHours} , AlertMargin : {schedule.MeterAlertMargin} , Leverage : {schedule.MeterEscalationMargin}</td>
                        }
                      </tr>
                    )
                  })
                }
                </Table>
                  
                </CardBody>
                </Card>
  
           </Col>
          </Row>   
  
  
          </TabPane>
          <TabPane tabId="2">
          <Card>
                  <CardHeader>Equipment Specification</CardHeader>
                  <CardBody>
                    <Table>
                      <tr>
                        <th>Specification Name</th>
                        <th>Value</th>
                      </tr>
                      {
                        this.state.Specification.map((specs)=>{
                          return(
                            <tr>
                              <td>{specs.SpecificationName}</td>
                              <td>{specs.EquipmentSpecificationValue}</td>
                            </tr>
                          )
                        })
                      }
                    </Table>
                  </CardBody>
                </Card>
          </TabPane>
          
        </>
      );
    }
    render() {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" md="12" className="mb-4">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[0] === '1'}
                    onClick={() => { this.toggle(0, '1'); }}
                  >
                    Equipment Details
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[0] === '2'}
                    onClick={() => { this.toggle(0, '2'); }}
                  >
                    Equipment Specifications
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab[0]}>
                {this.tabPane()}
              </TabContent>
            </Col>
          </Row>
        </div>
      );
    }
}
export default EquipmentDetails;


