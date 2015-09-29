import React from 'react';

export default class Pagination extends React.Component {
  handleClickPage(page, e) {
    e.preventDefault();

    if (page < 1) page = 1;
    if (page > this.totalPages()) page = this.totalPages();

    this.props.onChangePage(page - 1);
  }

  currentPage() {
    return this.props.currentPage + 1;
  }

  totalPages() {
    return Math.ceil(this.props.count / this.props.pageSize);
  }

  renderPages() {
    const currentPage = this.currentPage();
    const totalPages = this.totalPages();
    const pages = [];

    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i < 1 || i > totalPages) {
        continue;
      }

      pages.push(
        <a
          className={(i === currentPage ? 'current' : '')}
          key={i}
          href="#"
          onClick={this.handleClickPage.bind(this, i)}>
          {i}
        </a>
      );
    }

    return pages;
  }

  render() {
    const start = this.props.currentPage * this.props.pageSize + 1;
    const end = start + this.props.pageSize - 1;
    const count = this.props.count;

    return (
      <div>
        <span>Exibindo {start} a {end > count ? count : end} de {count} registros.</span>
        <a onClick={this.handleClickPage.bind(this, 1)} href="#">Primeiro</a>
        <a onClick={this.handleClickPage.bind(this, this.currentPage() - 1)} href="#">Anterior</a>
        {this.renderPages()}
        <a onClick={this.handleClickPage.bind(this, this.currentPage() + 1)} href="#">Próximo</a>
        <a onClick={this.handleClickPage.bind(this, this.totalPages())} href="#">Último</a>
      </div>
    );
  }
}
