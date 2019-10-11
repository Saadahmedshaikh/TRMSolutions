import React,{ Component } from "react";
import Axios from "axios";
import './style.css';
import { Scrollbars } from 'react-custom-scrollbars';

import { Redirect } from 'react-router-dom';
import { Row,Col,Table,Card,CardBody,CardHeader,Badge,Button } from "reactstrap";
class Equipment extends Component{
    constructor(props){
        super(props);
        this.state={
            equipments:[],
            equipmentid:'',
            flag:false,
            newflag:false
            ,failed:false
        }
        this.viewDetails=this.viewDetails.bind(this);
        this.onAddNew = this.onAddNew.bind(this);
    }
    componentDidMount(){
        var a =sessionStorage.getItem("username");
    
        if(a == null){
          this.setState({failed:true})
        }
        Axios.get('http://localhost:37329/Equipment/getequipment')
        .then(response => {
            const parsed = JSON.parse(response.data)
            this.setState({
                equipments : parsed
            });
        });
    }
  

    viewDetails(id){
        this.setState({
            flag:true,
            Equipmentid:id
        })
    }

    onAddNew(event){
        this.setState({
            newflag:true
        })
    }
    render(){
        if(this.state.failed){
            return(
              <Redirect to="/"/>
            )
          }
        if(this.state.newflag){
            return( 
           
             <Redirect
             to="/EquipmentManagement/EquipmentDetails"
             />
           
            )
        }
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
        return(
            <>
            <Row>
           
            </Row>

            <Row>
                <Col md="1"></Col>
                <Col md="10">
                    <Card>
                        <CardHeader>
                            <Row>
                        <Col md="10"><h3>Equipments</h3></Col>
                <Col md="2"><Button color="primary" size="lg" onClick={this.onAddNew} >Add New</Button></Col>
                </Row>
                        </CardHeader>
                        <CardBody>
                        <Scrollbars style={{ height: 500 }}>
                <Table striped hover>
                    <tr id="tableth">
                        <th rowSpan="2">Category</th>
                        <th rowSpan="2">Equipment Name</th>
                        <th colSpan="5">Specification</th>
                        <th rowSpan="2">Location</th>
                        <th rowSpan="2">Description</th>
                    </tr>
                    <tr id="tableth">
                        <th>Make</th>
                        <th>Model</th>
                        <th>Range</th>
                        <th>Accuracy</th>
                        <th>Other</th>
                    </tr>
                    {
                        this.state.equipments.map(eq =>{
                            return(
                    <tr id="hoverrow" onClick={()=>this.viewDetails(eq.EquipmentID)}>
                        <td id="tableth"><Badge size="lg" color="primary">{eq.EquipmentCategoryName}</Badge></td>
                        <td id="tableth">{eq.EquipmentName}</td>
                        <td id="tableth">{eq.EquipmentMake}</td>
                        <td id="tableth">{eq.EquipmentModel}</td>
                        <td id="tableth">{eq.EquipmentRange}</td>
                        <td id="tableth">{eq.EquipmentAccuracy}</td>
                        <td id="tableth">{eq.EquipmentOthers}</td>
                        <td id="tableth">{eq.EquipmentLocation}</td>
                        <td id="tableth">{eq.EquipmentFamilyName}</td>
                    </tr>
                            )
                        })
                    }
                </Table> 
                </Scrollbars>   
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            </>
        )
    }
}
export default Equipment;