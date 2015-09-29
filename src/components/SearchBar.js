import React from 'react';

export default class SearchBar extends React.Component {
  handleOnChangeFilter(e) {
    this.props.onChangeFilter(e.currentTarget.value);
  }

  handleOnChangePageSize(e) {
    this.props.onChangePageSize(parseInt(e.currentTarget.value));
  }

  renderEntriesPerPage() {
    const options = [10, 20, 50];
    const currentOption = this.props.pageSize;

    return options.map(x => <option key={x} selected={x === currentOption}>{x}</option>);
  }

  render() {
    return (
      <div>
        <label>
          Exibir
          <select onChange={this.handleOnChangePageSize.bind(this)}>
            {this.renderEntriesPerPage()}
          </select>
          registros.
        </label>
        <label>
          Pesquisar: <input onChange={this.handleOnChangeFilter.bind(this)} />
        </label>
      </div>
    );
  }
}
