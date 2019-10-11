import React,{Component} from 'react';
import Axios from 'axios';
import { shallowEqualArrays } from "shallow-equal";
class Industry extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      id:"12",
      job:[
       "SE","SSE"
        ],
        flag:false
    }
  this.onclick=this.onclick.bind(this);
  }
  onclick(event){
    var name=document.getElementById("name").value;
    this.setState({
      flag:true
    })
    this.setState(()=>{
      this.state.job.push(name)
    }
      
    )
    console.log(this.state.job);
  }
  componentWillMount(){
    console.log("componentWillMount");
    
  }
  componentDidMount(){
    console.log("componentDidMount");
    this.setState({
      id:"23"
    })
  }
  componentWillUpdate(){
    console.log("componentWillUpdate");
  }
  componentDidUpdate(){
    console.log("componentDidUpdate");
  }
  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps");
  }
  shouldComponentUpdate(nextProps,nextState){
    
    console.log("shouldComponentUpdate");
    console.log(shallowEqualArrays(this.state.job, nextState.job));
    return !shallowEqualArrays(this.state.job, nextState.job);
  
  }
  componentWillUnmount(){
    console.log("componentWillUnmount");
  }
  render(){
    return(
      <div>
        <button onClick={this.onclick}>ok</button>
        <p>Render {this.state.id}</p>
        <form>
          <input type="text" id="name"/>
          <input type="text" id="company"/>
          <button type="button" onClick={this.onclick}>ok</button>
        </form>
        <ul>
       <li>{this.state.job}</li>
        </ul>
      </div>
    )
  }
}export default Industry;