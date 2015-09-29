import React from 'react';
import ReactDOM from 'react-dom';
import DataTable from './DataTable';

let columns = [
  { key: 'nome', header: 'Nome' },
  { key: 'idade', header: 'Idade' }
];

let data = [];

for (let i = 0; i < 20000; i+=3) {
  data.push({ id: i, nome: 'Fernando', idade: 23 });
  data.push({ id: i+1, nome: 'Alex', idade: (23 + 1) });
  data.push({ id: i+2, nome: 'Helwanger', idade: 25 });
}

ReactDOM.render(
  <DataTable data={data} columns={columns} />,
  document.getElementById('root')
);
