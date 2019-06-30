import React, { Component, Fragment } from 'react'
import {connect} from "react-redux";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Input from '@material-ui/core/Input';
import store from './../store';

import {dropItem, renameItem, reprioritize, restatus} from './../actions/postRequests.js';

//define accessible redux substates
function mapStateToProps(state) {
  return {
    items: state.postRequests
  };
}

//Sort by item name
function compareAZ(a, b) {
  const A = a.Activity.toUpperCase();
  const B = b.Activity.toUpperCase();

  let comparison = 0;
  if (A > B) {
    comparison = 1;
  } else if (A < B) {
    comparison = -1;
  }
  return comparison;
}

//Sort by item priority
function comparePriority(a, b) {
  const A = a.Priority;
  const B = b.Priority;

  let comparison = 0;
  if (A < B) {
    comparison = 1;
  } else if (A > B) {
    comparison = -1;
  }
  return comparison;
}

var az = 0
var pr = 1

var initFlag = true

class ItemTable extends Component {
    setAZ() {
      if(az == 1) return
    az = 1
    pr = 0

    store.dispatch({type:"X", payload:{allItems : ""}})
  }

 setPR() {
   if(pr == 1) return
    az = 0
    pr = 1

    store.dispatch({type:"X", payload:{allItems : ""}})
      
  }

  drop(activity) {
      dropItem(activity)
  }

  Reprioritize(activity, event) {
    reprioritize(activity, Number(event.target.value))
  }

  Rename(activity, event) {
    renameItem(activity, event.target.value)
  }

  Restatus(activity, event) {
    if(event.target.value != "complete" && event.target.value != "incomplete") return
    restatus(activity, event.target.value)
  }

 constructor(props) {
    super(props);
    
    this.state = {
        newname: '',
        newactivity: 0
      };

    //bind functions to variables to utilize in 
    //component onclick(),onblur(),onchange() calls
    this.setAZ = this.setAZ.bind(this);
    this.setPR = this.setPR.bind(this);
    this.drop = this.drop.bind(this);
    this.Reprioritize = this.Reprioritize.bind(this)
    this.Restatus = this.Restatus.bind(this)
    this.Rename = this.Rename.bind(this)

  }

  render() {

    if(initFlag) {
      initFlag = false;

      dropItem("")
    }

      var items = Object.entries(this.props.items.itemList)

      var items2 = []

      items.map( r => items2.push(r[1]))
      items = items2

      if(az == 1)
        items.sort(compareAZ)
      else if(pr == 1)
        items.sort(comparePriority)

    

    if (items != null ) {
      var azButton = (   <Button type="submit" name="submit" color="green" onClick={this.setAZ} variant="contained"placeholder="AZ Order">AZ</Button>
)
  var prButton = (   <Button type="submit" name="submit" color="green" onClick={this.setPR} variant="contained"placeholder="Priority Order">Priority</Button>
)
      var itemTable = (
        <Paper>
          <Table>
            <TableHead id="TableHeadRow">

            <TableRow id="TableHeadRow">
                <TableCell id="TableHeadCell" align="center">Item</TableCell>
                <TableCell id="TableHeadCell" align="center">Priority</TableCell>
                <TableCell id="TableHeadCell" align="center">Complete?</TableCell>
                <TableCell id="TableHeadCell" align="center">Drop</TableCell>
              </TableRow>
              
            </TableHead>
            <TableBody>
            {items.map(row =>
                  (
                <TableRow key={row.Activity}>
                  <TableCell align="center"> <Input type="text" name="newactivity"  onBlur={(e) => this.Rename(row.Activity, e)}  placeholder={row.Activity}></Input></TableCell>
                  <TableCell align="center">  <Input type="number" name="newpriority"  onBlur={(e) => this.Reprioritize(row.Activity, e)}  placeholder={row.Priority}></Input>  {"  " }  
  </TableCell>
                  <TableCell align="center"><Input type="text" name="newactivity"  onBlur={(e) => this.Restatus(row.Activity, e)}  placeholder={row.Status}></Input></TableCell>

                  <TableCell align="center"><Button type="submit" name="submit" color="green" onClick={(e) => this.drop(row.Activity)} variant="contained"placeholder="Drop">X</Button></TableCell>
            </TableRow>
              ))}


            </TableBody>
          </Table>
        </Paper>
      );


      return (
        <div>
            <p id="TitleOverTable"><b>To-Do List</b></p>
            {azButton}
            {prButton}
            {itemTable}
        </div>
      );
    }

    //return nothing if items array is nil
    return (
      <div>
      
      </div>
    )
  }
}

//wire up redux store to component
export default connect(mapStateToProps)(ItemTable)

