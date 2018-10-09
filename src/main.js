import React, { Component } from "react";
import CamaignItems from "./campaignItems"
 
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            shouldHide:true,
            shouldHideUpdate:true,
            updateEle:0
          };
     
          this.addItem = this.addItem.bind(this);
          this.deleteItem = this.deleteItem.bind(this);
          this.updateNewItem = this.updateNewItem.bind(this);
          this.updateItem = this.updateItem.bind(this);
          this.toggleBox = this.toggleBox.bind(this);
          this.toggleBox1 = this.toggleBox1.bind(this);
      }

      addItem(e) {
        if (this._inputElement.value !== "") {
          var newItem = {
            text: this._inputElement.value,
            key: Date.now()
          };
       
          this.setState((prevState) => {
            return { 
              items: prevState.items.concat(newItem) 
            };
          });
         
          this._inputElement.value = "";
        }
         
        console.log(this.state.items);
        this.toggleBox();
        e.preventDefault();
      }
      updateNewItem(e) {
        if (this._inputElement1.value !== "") {
          var newItem = {
            text: this._inputElement1.value,
            key: Date.now()
          };
       
          this.setState((prevState) => {
            var index = prevState.items.findIndex(x => x.key== prevState.updateEle.key);
            prevState.items[index] = newItem;
            return { 
              items:  prevState.items
            };
          });
         
          this._inputElement1.value = "";
        }
         
        console.log(this.state.items);
        this.toggleBox1();
        e.preventDefault();
      }
    

      deleteItem(key) {
        var filteredItems = this.state.items.filter(function (item) {
          return (item.key !== key);
        });
        console.log(filteredItems);
        this.setState({
            items: filteredItems
          });
    }
        updateItem(key) {
            var UpdatedItems = this.state.items.filter(function (item) {
              return (item.key == key);
            });
            console.log(UpdatedItems);
        this.setState({
          updateEle: UpdatedItems[0]
        });

        this.toggleBox1();
        this._inputElement1.value = UpdatedItems[0].text;
      }
      toggleBox() {
        // check if box is currently shouldHide
        const { shouldHide } = this.state;
        this.setState({
          // toggle value of `shouldHide`
          shouldHide: !shouldHide,
        });
      }
      toggleBox1() {
        // check if box is currently shouldHide
        const { shouldHideUpdate } = this.state;
        this.setState({
          // toggle value of `shouldHide`
          shouldHideUpdate: !shouldHideUpdate,
        });
      }

  render() {
    return (
      <div className="campaignMain">
      <nav className="navbar navbar-default">
        <div className="container-fluid">
         <div className="menuz">
          <div></div>
          <div></div>
          <div></div>
        </div>
         <div className="navbar-header">
            <a className="navbar-brand" href="#">Camaign Items</a>
          </div>
          <ul className="nav navbar-nav">
            <li className=""><a className="createBTN" href="#" onClick={this.toggleBox}>+ Create New</a></li>
          </ul>
        </div>
      </nav>
      <div className={this.state.shouldHide ? 'hidden' : ''}>
        <div className="modalBox">
          <div className="innerBlk">
          <div className="header">
          <form onSubmit={this.addItem}>
          <span className="close"  onClick={this.toggleBox}>X</span>
          <div className="andnewCampHead">Add New Camaign</div>
          <div className="form-group">
             <label>Enter Campaign Name:</label>
             <input ref={(a) => this._inputElement = a} 
             placeholder="enter Name">
            </input>
           </div>
            <button type="submit">add</button>
          </form>
        </div>
          </div>
        </div>
      </div>

      <div className={this.state.shouldHideUpdate ? 'hidden' : ''}>
        <div className="modalBox">
          <div className="innerBlk">
          <div className="header">
          <form onSubmit={this.updateNewItem}>
          <span className="close"  onClick={this.toggleBox1}>X</span>
          <div className="andnewCampHead">Add New Camaign</div>
          <div className="form-group">
             <label>Update Campaign Name:</label>
             <input ref={(a) => this._inputElement1 = a} 
             placeholder="enter Name">
            </input>
           </div>
            <button type="submit">Update</button>
          </form>
        </div>
          </div>
        </div>
      </div>
        
        <CamaignItems update = {this.updateItem} entries={this.state.items} delete={this.deleteItem}/>
      </div>
    );
  }
}
 
export default Main;