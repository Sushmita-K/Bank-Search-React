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
      filterData: []
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

  componentWillMount() {
    console.log("COMPONENT DID MOUNT");
    fetch("https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI")
      .then(results => {
        console.log(results);
        return results.json();
      })
      .then(data => {
        return this.setState({
          data: data
        });
      });
  }

  render() {
    const Header = ["IFSC", "Bank-ID", "Bank-Name", "Branch", "Address"];
    console.log(this.state.data, "hellllooooo");
    console.log(this.state.responseData, "responseData");

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
            perPageItemCount={10}
            totalCount={this.state.data.length}
            nextPageText="Next"
            prePageText="Prev"
          />
        ) : null}
      </div>
    );
  }
}
export default App;
