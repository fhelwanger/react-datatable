import React from 'react';

export default class Table extends React.Component {
  renderHeader(column, index) {
    return <th key={index} onClick={() => this.props.onChangeSort(column.key)}>{column.header}</th>;
  }

  renderRow(row) {
    const renderCell = (column, index) => (
      <td key={index}>{row[column.key]}</td>
    );

    return (
      <tr key={row[this.props.idAttribute || 'id']}>{this.props.columns.map(renderCell)}</tr>
    );
  }

  render() {
    return (
      <table>
        <thead>
          <tr>{this.props.columns.map(this.renderHeader.bind(this))}</tr>
        </thead>
        <tbody>
          {this.props.data.map(this.renderRow.bind(this))}
        </tbody>
      </table>
    );
  }
}
