import React, { Component, Fragment } from 'react'
import {connect} from "react-redux";

import Paper from '@material-ui/core/Paper';
import {addItem} from './../actions/postRequests.js';


import Button from '@material-ui/core/Button';

import Input from '@material-ui/core/Input';

function mapStateToProps(state) {
  return {
    itemList: state.itemReducer
  };
}



class CreateItem extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        newname: '',
        newactivity: 0
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }


  handleSubmit(event) {
    console.log("MM")
    addItem(this.state.newactivity, this.state.newpriority)
  }

  render() {

    var s = (<div><p><b>{"Create New Item"}</b></p> <Input type="text" name="newactivity" onChange={this.handleChange} placeholder="item name"></Input> {"  " }
    <Input type="number" name="newpriority"  onChange={this.handleChange}  placeholder="priority"></Input>  {"  " }  
    <Button type="submit" name="submit" color="primary" onClick={this.handleSubmit} variant="contained"placeholder="Create Item!">+</Button>
 </div>)
       

    return (s )
  }
}

export default connect(mapStateToProps)(CreateItem)