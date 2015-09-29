import React from 'react';
import Table from './components/Table';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
      filteredData: [...props.data],
    }
  }

  filterData(filter) {
    if (!filter) {
      return this.props.data;
    }

    const regexFilter = new RegExp(filter, 'i');
    const columns = this.props.columns;

    return this.props.data.filter(row => {
      return columns.reduce((acc, c) => acc || regexFilter.test(row[c.key]), false);
    });
  }

  onChangeFilter(filter) {
    this.setState({
      filteredData: this.filterData(filter)
    });
  }

  onChangePage(page) {
    this.setState({
      currentPage: page
    });
  }

  render() {
    const currentPage = this.state.currentPage;
    const pageSize = this.props.pageSize;
    const ini = currentPage * pageSize;
    const fim = ini + pageSize;

    return (
      <div>
        <SearchBar
          onChange={this.onChangeFilter.bind(this)} />
        <Table
          data={this.state.filteredData.slice(ini, fim)}
          columns={this.props.columns} />
        <Pagination
          onChange={this.onChangePage.bind(this)}
          currentPage={currentPage}
          pageSize={pageSize}
          count={this.state.filteredData.length} />
      </div>
    );
  }
}

DataTable.defaultProps = { pageSize: 10 };
