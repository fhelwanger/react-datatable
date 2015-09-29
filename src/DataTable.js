import React from 'react';
import Table from './components/Table';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: '',
      sortDirection: '',
      currentPage: 0,
      filteredData: [...props.data]
    }
  }

  onChangeFilter(filter) {
    this.setState({
      currentPage: 0,
      filteredData: this.filterData(filter)
    });
  }

  onChangePage(page) {
    this.setState({
      currentPage: page
    });
  }

  onChangeSort(key) {
    let sortDirection = 'asc';

    if (this.state.sortKey === key) {
      sortDirection = this.state.sortDirection === 'asc' ? 'desc' : 'asc';
    }

    this.setState({
      currentPage: 0,
      sortKey: key,
      sortDirection
    });
  }

  filterData(filter) {
    if (!filter) {
      return [...this.props.data];
    }

    const regexFilter = new RegExp(filter, 'i');
    const columns = this.props.columns;

    return this.props.data.filter(row => {
      return columns.reduce((acc, c) => acc || regexFilter.test(row[c.key]), false);
    });
  }

  prepareData() {
    const sortKey = this.state.sortKey;
    const sortDirection = this.state.sortDirection;

    let data = this.state.filteredData;

    if (sortKey) {
      data = data.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) {
          return sortDirection === 'asc' ? -1 : 1;
        }

        if (a[sortKey] > b[sortKey]) {
          return sortDirection === 'asc' ? 1 : -1;
        }

        return 0;
      });
    }

    const sliceStart = this.state.currentPage * this.props.pageSize;
    const sliceEnd = sliceStart + this.props.pageSize;

    return data.slice(sliceStart, sliceEnd);
  }

  render() {
    return (
      <div>
        <SearchBar
          onChange={this.onChangeFilter.bind(this)} />
        <Table
          data={this.prepareData()}
          columns={this.props.columns}
          onChangeSort={this.onChangeSort.bind(this)} />
        <Pagination
          onChange={this.onChangePage.bind(this)}
          currentPage={this.state.currentPage}
          pageSize={this.props.pageSize}
          count={this.state.filteredData.length} />
      </div>
    );
  }
}

DataTable.defaultProps = { pageSize: 10 };
