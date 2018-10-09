import React, { Component } from "react";
 
class CamaignItems extends Component {
    constructor(props) {
        super(props);
     
    this.createTasks = this.createTasks.bind(this);
    }

    delete(key) {
        this.props.delete(key);
    }
    update(key) {
        this.props.update(key);
    }



  createTasks(item, index) {
    return <div className="eachList"  
    key={item.key}><div className="indexList">{index+1}</div> <div className="campainName">Campaign {index+1} - {item.text} </div> 
    <ul>
    <li className="options">pause</li>
    <li className="options">comment</li>
    <li className="options"  onClick={() => this.update(item.key)}>update</li>
    <li className="options" onClick={() => this.delete(item.key)}>Delete</li>
    </ul>
    </div>
  }
 
  render() {
    var campaignEntries = this.props.entries;
    var listItems = campaignEntries.map(this.createTasks);
 
    return (
      <div className="theList">
          {listItems}
      </div>
    );
  }
};
 
export default CamaignItems;