import React, { Component } from "react";

import "./App.css";

import { TablePagination } from "react-pagination-table";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      res: "",
      query: "",
      searchString: [],
      dataLength: [],
      filterData: [],
      pagesize:'',
    };
  }
  filterArray = event => {
    var updatedList = this.state.data;
    updatedList = updatedList.filter(function(item) {
      return item.bank_name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    this.setState({ filterData: updatedList });
  };
  setPagesize=(e)=>{
    this.setState({pagesize:e.target.value});
    return this.state.pagesize;
    
    

console.log(this.state.pagesize,"length")

  }

  componentWillMount() {
    console.log("COMPONENT DID MOUNT");
    fetch("https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI")
      .then(results => {
        console.log(results);
        return results.json();
      })
      .then(data => {
        this.setState({
          data: data
        });
      });
      
  }

  render() {
    const Header = ["IFSC", "Bank-ID", "Bank-Name", "Branch", "Address"];
    console.log(this.state.data, "hellllooooo");
    
    return (
      
      <div>
        <input
          type="text"
          className="input"
          onChange={this.filterArray}
          placeholder="Search..."
        />

        <select className="font-control" name="id">
          {this.state.data.slice(0, 5).map((bank, key) => (
            <option value={this.state.data.ifsc}>{bank.city}</option>
          ))}
        </select>

        {this.state.data.length > 0 ? (
        
          <TablePagination
            className="tableData"
            headers={Header}
            data={
              this.state.filterData.length
                ? this.state.filterData
                : this.state.data
            }
          
            columns="ifsc.bank_id.bank_name.branch.address"
            perPageItemCount={25==this.state.pagesize? 25 : 10}
            totalCount={this.state.data.length}
            nextPageText="Next"
            prePageText="Prev"
          />
        ) : null}
<span className="pageSetsize">Page Size:
<select className="sizeControl" onClick={this.setPagesize}>

            <option value='10'>10</option>
            <option value='25'>25</option>
        

        </select>
   </span>
     
        
      </div>
      
      
    );
    
  }
}
export default App;
