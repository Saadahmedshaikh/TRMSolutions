import React, { Component } from "react";
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
import '../EquipmentManagement/style.css';

class Schedule extends Component{

    constructor(){
        super();
        this.state={
            schedules:[]
        }
        this.activate=this.activate.bind(this);
    }
    activate(id,interval){
console.log(id+' '+interval);
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
document.getElementById("sd").innerHTML=date;

    }
    componentDidMount(){
        if(typeof this.props.location.state  == 'undefined' || this.props.location.state  == null){
        
        }
        else{
            Axios.get("http://localhost:37329/Equipment/scheduleEquipment/"+this.props.location.state.id)
            //Axios.get("http://localhost:37329/Equipment/scheduleEquipment/af673d0b-acfd-4ba0-8be2-60de81a4a21d")
            .then(response =>{
                const temp = JSON.parse(response.data);
                this.setState({
                    schedules:temp
                })
            console.log(response);
            })
        }
    }
    render(){

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
          {
           
          <td>Interval : {schedule.Interval} , AlertMargin: {schedule.Margin} , Leverage : {schedule.Leverage}</td>
           
          }
          <td id="sd"></td>
          <td id="ed"></td>
          <td><Button type="button" color="primary" onClick={()=>this.activate(schedule.EquipmentScheduleID,schedule.Interval)} >Activate</Button></td>
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