import React,{Component} from 'react';
import Axios from 'axios';
import {Button} from 'reactstrap';
class Industry extends Component{
  constructor(props){
    super(props)
    this.state = {
      name:''
    }
    this.onchange = this.onchange.bind(this);
    this.onsave=this.onsave.bind(this);
  }
onchange(event){
    this.setState({
      name:event.target.value
    })
    
}
onsave(event){
localStorage.setItem("name",this.state.name);
}
render(){
  return(
  <form>
    <input type="text" onChange={this.onchange} />
    <Button type="button" onClick={()=>this.onsave()}>ok</Button>
  </form>
  )
}
}export default Industry;