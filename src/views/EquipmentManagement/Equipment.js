import React,{ Component } from "react";
import  axios from "axios";
import { Link } from 'react-router-dom';
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
import EquipmentDetails from "./EquipmentDetails";
import { Redirect } from 'react-router-dom'
import './style.css';
class Equipment extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            equipments : [],
            id:'',
            flag:false,
            newflag:false,
            Equipmentid:''
        }
    }
    componentDidMount(){

        axios.get('http://localhost:37329/Equipment/getequipment')
        .then(response => {
            const parsed = JSON.parse(response.data)
            this.setState({
                equipments : parsed
            });
        });

    }
    pass(event){
        
      this.setState({
          flag:true,
          Equipmentid:event
      })
      
        //  return <EquipmentDetails equipmentid={event} />
        

    }
    addNew=()=>{
        this.setState({
            newflag:true
        })
    }
    render(){
        if(this.state.flag){
            return( 
           
             <Redirect
             to={{
                pathname: "/EquipmentManagement/EquipmentDetails",
                state: { id: this.state.Equipmentid }
            }}
             />
           
            )
        }
        if(this.state.newflag){
            return( 
           
             <Redirect
             to={{
                pathname: "/EquipmentManagement/EquipmentDetails"
            }}
             />
           
            )
        }
        return(
            <Row>
                <Col md="12">
                    <Button type="button" color="primary" size="lg" onClick={this.addNew}>Add New Equipment</Button>
                    
                <Card>
              <CardHeader>
                <h5> Rig Status History </h5>
              </CardHeader>
              <CardBody>
                <Table hover striped responsive>
                    <tr>
                        <th>Name</th>
                        <th>Family Name</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Sequence</th>
                        <th>No.Of Schedules</th>
                    </tr>
                    {
                        this.state.equipments.map((equipment) => {
                            return(
                            <tr className="tblrow" onDoubleClick={()=> this.pass(equipment.EquipmentID)}>
                               <td>{equipment.EquipmentName}</td> 
                                <td>{equipment.FamilyName}</td>
                                <td>{equipment.Make}</td>
                                <td>{equipment.Model}</td>
                                <td>{equipment.SequenceNo}</td>
                                <td>{equipment.NoofSchedules}</td>
                            </tr>
                            )
                        })
                    }
                    </Table>
                    </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}
export default Equipment;