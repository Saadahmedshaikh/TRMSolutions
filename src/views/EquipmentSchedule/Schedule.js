import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import * as moment from 'moment';
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
import '../EquipmentManagement/style.css';

class Schedule extends Component{

    constructor(props){
        super(props);
       // console.log(this.props.location.state.id);
       
const NewDate = moment().format('YYYY-MM-DD');
        this.state={
            schedules:[],
            date:NewDate,
            equipmentid:'',
            flag:false,
            failed:false
        }
        console.log(this.state.date);
        this.activate=this.activate.bind(this);
    }
    activate(id,interval){
console.log(interval);
 
 var nextdate = moment().add(interval,'days').format('YYYY-MM-DD');
 var dates={
     "EquipmentScheduleID":id,
     "LastInspectionDate":this.state.date,
     "NextInspectionDate":nextdate
 }
Axios.post('http://localhost:37329/Equipment/activateschedule',dates)
.then(response=>{
    console.log(response);
  })    
this.setState({
    flag:true
})
this.componentDidMount();
}
    componentDidMount(){
        var a =sessionStorage.getItem("username");
    
        if(a == null){
          this.setState({failed:true})
        }
        if(typeof this.props.location.state  == 'undefined' || this.props.location.state  == null){
        
        }
        else{
            Axios.get("http://localhost:37329/Equipment/scheduleEquipment/"+this.props.location.state.id)
            //Axios.get("http://localhost:37329/Equipment/scheduleEquipment/af673d0b-acfd-4ba0-8be2-60de81a4a21d")
            .then(response =>{
                const temp = JSON.parse(response.data);
                this.setState({
                    schedules:temp,
                    equipmentid:this.props.location.state.id

                })
            console.log(response);
            })
        }
    }
    render(){
        if(this.state.failed){
            return(
              <Redirect to="/"/>
            )
          }
        return(
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                           <h3>Activate Schedule</h3> 
                        </CardHeader>
                        <CardBody>
                            <Col md="12">
                                <Table striped hover>
                                    <tr>
                                        <th>Schedule Name</th>
                                        <th>Schedule Type</th>
                                        <th>Schedule Basis</th>
                                        <th>Parameters</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Action</th>
                                    </tr>
                                    {
    this.state.schedules.map((schedule) =>{
      return(
        <tr id="hoverrow">
          <td>{schedule.EquipmentScheduleName}</td>
          <td>{schedule.EquipmentScheduleType}</td>
          <td>{schedule.EquipmentScheduleBasis}</td>
          
           
          <td>Interval : {schedule.Interval} , AlertMargin: {schedule.Margin} , Leverage : {schedule.Leverage}</td>
           
          
          <td id="sd">{(schedule.LastInspectionDate!=null)?moment(schedule.LastInspectionDate).format('DD-MMM-YYYY'):""}</td>
          <td id="ed">{(schedule.NextInspectionDate!=null)?moment(schedule.NextInspectionDate).format('DD-MMM-YYYY'):""}</td>
          <td>
          {(schedule.NextInspectionDate===null)?
          <Button type="button" color="primary" onClick={()=>this.activate(schedule.EquipmentScheduleID,schedule.Interval)} >Activate</Button>:
          <Button type="button" color="primary" disabled >Activate</Button>}
          </td>
        </tr>
      )
    })
  }
                                </Table>
                            </Col>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}export default Schedule;