import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Redirect } from "react-router-dom";
import {
  Badge,
  Modal,
  ModalFooter,ModalBody,ModalHeader,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import Axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    
this.style={
  "textAlign":"center",
  "color":"white",
  "fontSize":"25px"
}
    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.fetchOverdue = this.fetchOverdue.bind(this);
    this.fetchUpcoming = this.fetchUpcoming.bind(this);

    this.state = {
      large:false,
      large1:false,
      count:'',
      users:'',
      equipments:'',
      dropdownOpen: false,
      radioSelected: 2,
      companies:'',
      upcoming:[],
      red_user:false,
      red_cmp:false,
      red_equip:false,
      type:'Overdue',
      overdueDetail:[],
      upcomingDetail:[],
      failed:false
    };
  
  }
 
fetchOverdue(event){
  
  Axios.get('http://localhost:37329/Equipment/Overdue')
    .then(response => {
      const temp = JSON.parse(response.data);
      console.log(temp);
      this.setState({
        large:true,
        overdueDetail:temp
      })
    })
}
fetchUpcoming(event){
  
  Axios.get('http://localhost:37329/Equipment/Upcoming')
    .then(response => {
      const temp = JSON.parse(response.data);
      console.log(temp);
      this.setState({
        large1:true,
        upcomingDetail:temp
      })
    })
}
  // componentDidMount(){
  //   Axios.all([
  //     Axios.get('http://localhost:37329/Schedule/Count/'+this.state.type),
  //     Axios.get('http://localhost:37329/Country/Count'),
  //     Axios.get('http://localhost:37329/User/Count'),
  //   Axios.get('http://localhost:37329/Equipment/countEquipments'),
  //   Axios.get('http://localhost:37329/Company/getall')

  //   ])
  //   .then(responseArr => {
  //     const temp = JSON.parse(responseArr[4].data);
  //     this.setState({
  //           upcoming:responseArr[0].data,
  //           count:responseArr[1].data,
  //           users:responseArr[2].data,
  //           equipments:responseArr[3].data,
  //           companies:temp
  //         })
  //   });
  // }
  componentDidMount(){
    var a =sessionStorage.getItem("username");
    
    if(a == null){
      this.setState({failed:true})
    }
    Axios.get('http://localhost:37329/Schedule/Count/'+this.state.type)
    .then(response => {
      this.setState({
        upcoming:response.data
      })
    })
      Axios.get('http://localhost:37329/Schedule/Count/Upcoming')
      .then(response => {
        this.setState({
          t1:response.data
        })
      })
    Axios.get('http://localhost:37329/Country/Count')
    .then(response => {
      this.setState({
        count:response.data
      })
    })
    Axios.get('http://localhost:37329/User/Count')
    .then(response => {
      this.setState({
        users:response.data
      })
    })
    Axios.get('http://localhost:37329/Equipment/countEquipments')
    .then(response => {
      this.setState({
        equipments:response.data
      })
    })
    Axios.get('http://localhost:37329/Company/getall')
    .then(response=>{
       const temp = JSON.parse(response.data);
        this.setState({
            companies:temp
        });
        })
    //console.log(this.state.count);
  //document.getElementById("countuser").innerHTML=this.state.count;
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    if(this.state.red_user){
      return(
        <Redirect to="User"/>
      )
    }
    if(this.state.red_equip){
      return(
        <Redirect to="EquipmentManagement/Equipment"/>
      )
    }
    if(this.state.red_cmp){
      return(
        <Redirect to="Company"/>
      )
    }
    if(this.state.failed){
      return(
        <Redirect to="/"/>
      )
    }
    
    return (
      <div className="animated fadeIn">
               <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info right">
              <CardBody className="pb-0">
               
                <div style={this.style}>{this.state.count}</div>
                <div style={this.style}>Total Companies </div><br/>
                <Row>
                 
                  <Button color="outline-light" size="lg" type="button" block onClick={ ()=>{this.setState({red_cmp:true})}}>View </Button>
                  
                </Row>
                <br/>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
               {/*  <ButtonGroup className="float-right">
                  <Dropdown id='card2' isOpen={this.state.card2} toggle={() => { this.setState({ card2: !this.state.card2 }); }}>
                    <DropdownToggle className="p-0" color="transparent">
                      <i className="icon-location-pin"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                */}
                <div style={this.style}>{this.state.users}</div>
                <div style={this.style}>Total Users</div><br/>
                <Row>
                 
                  <Button color="outline-light" size="lg" type="button" onClick={ ()=>{this.setState({red_user:true})}} block>View </Button>
                  
                </Row>
                <br/>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <div style={this.style}>{this.state.equipments}</div>
                <div style={this.style}>Total Equipments</div><br/>
                <Row>
                 
                  <Button color="outline-light" size="lg" type="button" block onClick={ ()=>{this.setState({red_equip:true})}}>View </Button>
                  
                </Row>
                <br/>
              </CardBody>
              
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <div style={this.style}>{this.state.upcoming}</div>
                <div style={this.style}>Overdue Schedules</div><br/>
                <Row>
                 
                  <Button color="outline-light" size="lg" type="button" block onClick={ this.fetchOverdue}>View </Button>
                  
                </Row>
                <br/>
              </CardBody>
              
            </Card>
          </Col>
        </Row>
        <Row>
        <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <div style={this.style}>{this.state.t1}</div>
                <div style={this.style}>Upcoming Schedules</div><br/>
                <Row>
                 
                  <Button color="outline-light" size="lg" type="button" block onClick={ this.fetchUpcoming}>View </Button>
                  
                </Row>
                <br/>
              </CardBody>
              
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.large} toggle={this.toggleLarge}
                       className={'modal-lg ' + this.props.className}>
                  <ModalHeader toggle={this.toggleLarge}>Overdue Schedules</ModalHeader>
                  <ModalBody>
                   <Table>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Basis</th>
                      <th>Due Date</th>
                    </tr>
                    
{
  this.state.overdueDetail.map(rs=>{
    const formattedDate =rs.NextInspectionDate.toString().substring(0,10);
    return(
      <tr>
        <td>{rs.EquipmentScheduleName}</td>
        <td>{rs.EquipmentScheduleType}</td>
        <td>{rs.EquipmentScheduleBasis}</td>
        <td>{formattedDate}</td>
      </tr>
    )
  })
}
                   </Table>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.toggleLarge}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={ ()=>{this.setState({large:!this.state.large})}}>Cancel</Button>
                  </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.large1} toggle={this.toggleLarge}
                       className={'modal-lg ' + this.props.className}>
                  <ModalHeader toggle={this.toggleLarge}>Upcoming Schedules</ModalHeader>
                  <ModalBody>
                   <Table>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Basis</th>
                      <th>Due Date</th>
                    </tr>
                    
{
  this.state.upcomingDetail.map(rs=>{
    const formattedDate =rs.NextInspectionDate.toString().substring(0,10);
    return(
      <tr>
        <td>{rs.EquipmentScheduleName}</td>
        <td>{rs.EquipmentScheduleType}</td>
        <td>{rs.EquipmentScheduleBasis}</td>
        <td>{formattedDate}</td>
      </tr>
    )
  })
}
                   </Table>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.toggleLarge}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={ ()=>{this.setState({large1:!this.state.large1})}}>Cancel</Button>
                  </ModalFooter>
                </Modal>
      </div>
    );
  }
}

export default Dashboard;
