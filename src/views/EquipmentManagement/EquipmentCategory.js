import React,{ Component } from "react";
import  Axios from "axios";
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
      ModalHeader
  } from 'reactstrap';
  import './style.css';
  class EquipmentCategory extends Component{
      constructor(){
          super();
          this.state={
              categories:[],
              category:[],
              imagePreviewUrl:'',
              file:''
          }
          this.onChange=this.onChange.bind(this);
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
        console.log(this.state.imagePreviewUrl);
      }
      
componentDidMount(){
    Axios.get("http://localhost:37329/Categories/getAll")
    .then(response => {
        const temp = JSON.parse(response.data);
        this.setState({
            categories:temp
        })
        
    })
}

    render(){

        return(
          <Row>
             <Col md="12">
   
    <Row>
    
<Col md="6">
<Card>
        <CardHeader><h4>Categories List</h4></CardHeader>
        <CardBody>
<Table >
    
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        </tr>
                        {
                            this.state.categories.map(cat =>{
                                return(
                                    <tr>
                                        <td>{cat.EquipmentCategoryName}</td>
                                        <td>{cat.EquipmentCategoryDescription}</td>
                                    </tr>
                                )
                            })
                        }
 </Table>
 </CardBody>
    </Card>
</Col>

<Col md="6">
    <Card>
        <CardHeader><h4>Category</h4></CardHeader>
        <CardBody>
<Row>

   <Col md="6">
   <br/>
                    <form>
                   <FormGroup row>
                       <Col xs="3" md="3">
                       <Label htmlFor="Name">Name</Label>
                       </Col>
                       <Col xs="8" md="8">
                       <Input type="text" id="Name" size="md"/>
                       </Col>
                   </FormGroup> 
                  
                  
                   <FormGroup row>
                       <Col xs="3" md="3">
                       <Label htmlFor="Description">Description</Label>
                       </Col>
                       <Col xs="8" md="8">
                       <Input  id="Description" size="sm" type="textarea" name="textarea-input" rows="9" 
                               placeholder="Description" />
                       </Col>
                   </FormGroup>
                   </form>
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
                      <Button type="submit" size="sm" color="primary" > Add</Button>{' '}
                   <Button type="reset" size="sm" color="danger"> Cancel</Button>
                   </Col>                    
                
    
               
                    
 </Row> 
 </CardBody>
    </Card>
 </Col>
 </Row>


</Col>  
                
            </Row>

        );
    }}export default EquipmentCategory;