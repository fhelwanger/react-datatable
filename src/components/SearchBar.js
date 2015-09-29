import React from 'react';

export default class SearchBar extends React.Component {
  handleOnChange(e) {
    this.props.onChange(e.currentTarget.value);
  }

  render() {
    return (
      <div>
        <label>
          Filter: <input onChange={this.handleOnChange.bind(this)} />
        </label>
      </div>
    );
  }
}
