import React from 'react';
import Table from './datatable/Table';
import SearchBar from './datatable/SearchBar';
import Pagination from './datatable/Pagination';

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: '',
      sortDirection: '',
      currentPage: 0,
      pageSize: props.pageSize,
      filteredData: [...props.data]
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filteredData: [...nextProps.data]
    });
  }

  onChangeFilter(filter) {
    this.setState({
      currentPage: 0,
      filteredData: this.filterData(filter)
    });
  }

  onChangePageSize(size) {
    this.setState({
      currentPage: 0,
      pageSize: size
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

    const sliceStart = this.state.currentPage * this.state.pageSize;
    const sliceEnd = sliceStart + this.state.pageSize;

    return data.slice(sliceStart, sliceEnd);
  }

  render() {
    return (
      <div>
        <SearchBar
          onChangeFilter={this.onChangeFilter.bind(this)}
          onChangePageSize={this.onChangePageSize.bind(this)}
          pageSize={this.state.pageSize} />
        <Table
          idAttribute={this.props.idAttribute}
          data={this.prepareData()}
          columns={this.props.columns}
          onChangeSort={this.onChangeSort.bind(this)} />
        <Pagination
          onChangePage={this.onChangePage.bind(this)}
          currentPage={this.state.currentPage}
          pageSize={this.state.pageSize}
          count={this.state.filteredData.length} />
      </div>
    );
  }
}

DataTable.defaultProps = { pageSize: 10 };
