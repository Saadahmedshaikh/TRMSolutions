import React,{ Component } from "react";
import  Axios from "axios";
import { Scrollbars } from 'react-custom-scrollbars';
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
    Media,
    ModalBody,
      ModalHeader,
      ModalFooter
  } from 'reactstrap';
  import './style.css';
  class EquipmentCategory extends Component{
      constructor(){
          super();
          this.state={
              categories:[],
              category:[],
              imagePreviewUrl:'',
              file:'',
              Name:'',
              Description:'',
              success:false,
              danger:false,
              catid:'',
              editflag:false
              ,failed:false
          }
         this.toggleSuccess = this.toggleSuccess.bind(this);
         this.toggleDanger = this.toggleDanger.bind(this);
          this.onChange=this.onChange.bind(this);
          this.handleChange=this.handleChange.bind(this);
          this.onAdd=this.onAdd.bind(this);
          this.refresh=this.refresh.bind(this);
          this.onView=this.onView.bind(this);
          this.onCancel=this.onCancel.bind(this);
          this.update=this.update.bind(this);
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
      onChange(event){
        let reader = new FileReader();
        let file = event.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
        reader.readAsDataURL(file)
      }
      onCancel(event){
        this.setState({
            catid:"",
            editflag:false
        })
        document.getElementById("form1").reset();
        document.getElementById("img-thumbnail").src="";
      }
      onView(event){
          Axios.get("http://localhost:37329/Equipment/getCategory/"+event)
          .then(response=>{
           const temp = JSON.parse(response.data); 
            this.setState({
                  category:temp,
                  catid:event,
                  editflag:true,
                  Name:temp.EquipmentCategoryName,
                  Description:temp.EquipmentCategoryDescription,
                  imagePreviewUrl:temp.EquipmentCategoryImage
              })
              console.log(this.state.category.EquipmentCategoryName);
             document.getElementById("img-thumbnail").src=this.state.category.EquipmentCategoryImage;
           document.getElementById("Name").value=this.state.category.EquipmentCategoryName;
           document.getElementById("Description").value=this.state.category.EquipmentCategoryDescription;
          })
      }
      onAdd(event){
          event.preventDefault();
           const category = {
               "EquipmentCategoryID":"",
               "EquipmentCategoryName":this.state.Name,
               "EquipmentCategoryDescription":this.state.Description,
               "EquipmentCategoryImage":this.state.imagePreviewUrl
           }
           
           Axios.post("http://localhost:37329/Category/AddNew",category)
  .then(response=> {
      if(response.status=='201'){
        this.toggleSuccess();
        document.getElementById("form1").reset();
        this.setState({
            catid:"",
            editflag:false
        })
        document.getElementById("img-thumbnail").src="";
      }
   console.log(response);
  })
  .catch(error =>{
      console.log(error);
      this.toggleDanger();
  })
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
      refresh=(event)=>{
        this.toggleSuccess();
        this.componentDidMount();
      }


      update(event){
        const category = {
            "EquipmentCategoryID":this.state.catid,
            "EquipmentCategoryName":this.state.Name,
            "EquipmentCategoryDescription":this.state.Description,
            "EquipmentCategoryImage":this.state.imagePreviewUrl
        }
        
        Axios.post("http://localhost:37329/Category/Update",category)
.then(response=> {
   if(response.status=='201'){
     this.toggleSuccess();
     document.getElementById("form1").reset();
     this.setState({
        catid:"",
        editflag:false
    })
    document.getElementById("img-thumbnail").src="";
   }
console.log(response);
})
.catch(error =>{
   console.log(error);
   this.toggleDanger();
})
   }
      
componentDidMount(){
  var a =sessionStorage.getItem("username");
    
  if(a == null){
    this.setState({failed:true})
  }
    Axios.get("http://localhost:37329/Categories/getAll")
    .then(response => {
        const temp = JSON.parse(response.data);
        this.setState({
            categories:temp
        })
        
    })
}

    render(){
      
 if(this.state.failed){
  return(
    <Redirect to="/"/>
  )
}

        return(
            <>
          <Row>
             <Col md="12">
   
    <Row>
    
<Col md="6">
<Card>
        <CardHeader><h4>Categories List</h4></CardHeader>
        <CardBody>
        <Scrollbars style={{ height: 500 }}>
<Table >
    
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        </tr>
                        {
                            this.state.categories.map(cat =>{
                                return(
                                    <tr id="hoverrow" onClick={()=>this.onView(cat.EquipmentCategoryID)}>
                                        <td>{cat.EquipmentCategoryName}</td>
                                        <td>{cat.EquipmentCategoryDescription}</td>
                                    </tr>
                                )
                            })
                        }
 </Table>
 </Scrollbars>
 </CardBody>
    </Card>
</Col>

<Col md="6">
    <Card>
        <CardHeader><h4>Category</h4></CardHeader>
        <CardBody>
        <form id="form1" onSubmit={this.onAdd}>
<Row>

   <Col md="6">
   <br/>
                   
                   <FormGroup row>
                       <Col xs="3" md="3">
                       <Label htmlFor="Name">Name</Label>
                       </Col>
                       <Col xs="8" md="8">
                       <Input type="text" id="Name" name="name" size="md" required onChange={this.handleChange}/>
                       </Col>
                   </FormGroup> 
                  
                  
                   <FormGroup row>
                       <Col xs="3" md="3">
                       <Label htmlFor="Description">Description</Label>
                       </Col>
                       <Col xs="8" md="8">
                       <Input  id="Description" size="sm" type="textarea" name="description" rows="9" 
                               placeholder="Description" onChange={this.handleChange} />
                       </Col>
                   </FormGroup>
                  
     </Col>         
                   <Col md="6">
                       <h5>Image Preview</h5>
                    <img src={this.state.imagePreviewUrl} id="img-thumbnail"/>
                   <br/>
                    <div className="custom-file">
                     <input type="file" className="custom-file-input" id="image" onChange={this.onChange}/>
                    <label className="custom-file-label" for="validatedCustomFile">Choose image...</label>
                     </div>
  
                    <br/>
                      <br/>
                    {this.state.editflag?<Button type="button" onClick={this.update} size="sm" color="warning" > Update</Button>:<Button type="submit" size="sm" color="primary" > Add</Button>}{' '}
                   <Button type="button" onClick={this.onCancel} size="sm" color="danger"> Cancel</Button>
                   </Col>
                                     
                
    
               
                    
 </Row> 
 </form> 
 </CardBody>
    </Card>
 </Col>
 </Row>


</Col>  
                
            </Row>
            <Modal isOpen={this.state.success} toggle={this.toggleSuccess}
                       className={'modal-success ' + this.props.className}>
                  <ModalHeader toggle={this.toggleSuccess}>Success</ModalHeader>
                  <ModalBody>
                    Category has been added Successfully
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
        );
    }}export default EquipmentCategory;