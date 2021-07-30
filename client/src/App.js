import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_STUDENTS = gql`
  {
    students {
      _id
      name
      email
      phoneNumber
      dob
      subjects
    }
  }
`;

class App extends Component {
  render() {
    return (
      <Query pollInterval={500} query={GET_STUDENTS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">LIST OF Students</h3>
                  <h4>
                    <Link to="/create">Add Student</Link>
                  </h4>
                </div>
                <div className="panel-body">
                  <table className="table table-stripe">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Date of Birth</th>
                        <th>Subjects</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.students.map((student, index) => (
                        <tr key={index}>
                          <td>
                            <Link
                              style={{ textDecoration: "underline" }}
                              to={`/show/${student._id}`}
                            >
                              {student.name}
                            </Link>
                          </td>
                          <td>{student.email}</td>
                          <td>{student.phoneNumber}</td>
                          <td>{student.dob}</td>
                          <td>{student.subjects}</td>
                          <td></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default App;
