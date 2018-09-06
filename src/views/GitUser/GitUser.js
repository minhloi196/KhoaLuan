import React, { Component } from 'react';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import { Card, CardBody, CardColumns, CardHeader } from 'reactstrap';

const pie = {
  labels: [
    'Red',
    'Green',
    'Yellow',
  ],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
    }],
};

grabUsers("").then((data) => {
  console.log(data);
});


class GitUser extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <CardColumns className="cols-2">

          <Card>
            <CardHeader>
              Pie Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Pie data={pie} />
              </div>
            </CardBody>
          </Card>

        </CardColumns>
      </div>
    );
  }
}

export default GitUser;


function grabUsers(query) {
  const promises = [];
  let i = 1;
  for (; i <= 1; i++) {
    const promise = fetch("http://localhost:8080/graphql", {
      method: "POST",
      async: false,
      headers: {
        "Access-Control-Allow-Origin":"*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        query: `
              {
          pets{
              id
              name,
              age,
              type
          }
      }
      `
      })
    })
      .then((r) => r.json())
    promises.push(promise);
  }

  return Promise.all(promises);
}


// function grabUsers(query) {
//   const promises = [];
// let i = 1;
// for(; i<=12; i++) {
//   const promise = fetch("https://api.github.com/graphql", {
//     method: "POST",
//     async: false,
//     headers: {
//       "Authorization": 'bearer d23e97911c0554fe8e1e13010cea0e7e85580781',
//       "Content-Type": 'application/json'
//     },
//     body: JSON.stringify({
//       query: `
//         {
//           search(type: USER, query: "created:<2017-${i < 10 ? ('0' + i) : i + ''}-01 ${query}") {
//             userCount
//           }
//         }
//       `
//     })
//   })
//   .then((r) => r.json())
//   promises.push(promise);
// }

// return Promise.all(promises);
// }