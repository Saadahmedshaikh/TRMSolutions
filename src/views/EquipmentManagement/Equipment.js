import React,{ Component } from "react";
import Axios from "axios";
import './style.css';
import { Scrollbars } from 'react-custom-scrollbars';

import { Redirect } from 'react-router-dom';
import { Row,Col,Table,Card,CardBody,CardFooter,CardHeader,Badge,Button } from "reactstrap";
class Equipment extends Component{
    constructor(props){
        super(props);
        this.state={
            equipments:[],
            equipmentid:'',
            flag:false,
            newflag:false
        }
        this.viewDetails=this.viewDetails.bind(this);
        this.onAddNew = this.onAddNew.bind(this);
    }
    componentDidMount(){
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
        if(this.state.flag){
            return( 
           
             <Redirect
             to="/EquipmentManagement/EquipmentDetails"
             />
           
            )
        }
        if(this.state.newflag){
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
                        <td><Badge size="lg" color="primary">{eq.EquipmentCategoryName}</Badge></td>
                        <td>{eq.EquipmentName}</td>
                        <td>{eq.EquipmentMake}</td>
                        <td>{eq.EquipmentModel}</td>
                        <td>{eq.EquipmentRange}</td>
                        <td>{eq.EquipmentAccuracy}</td>
                        <td>{eq.EquipmentOthers}</td>
                        <td>{eq.EquipmentLocation}</td>
                        <td>{eq.EquipmentFamilyName}</td>
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