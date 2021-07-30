import React, { Component } from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_STUDENT = gql`
  query student($studentId: String) {
    student(id: $studentId) {
      _id
      name
      email
      phoneNumber
      dob
      subjects
      updated_date
    }
  }
`;

const UPDATE_STUDENT = gql`
  mutation updateStudent(
    $id: String!
    $name: String!
    $email: String!
    $phoneNumber: String!
    $dob: String!
    $subjects: String!
  ) {
    updateStudent(
      id: $id
      name: $name
      email: $email
      phoneNumber: $phoneNumber
      dob: $dob
      subjects: $subjects
    ) {
      updated_date
    }
  }
`;

class Edit extends Component {
  render() {
    let name, email, phoneNumber, dob, subjects;
    return (
      <Query
        query={GET_STUDENT}
        variables={{ studentId: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <Mutation
              mutation={UPDATE_STUDENT}
              key={data.student._id}
              onCompleted={() => this.props.history.push(`/`)}
            >
              {(updateStudent, { loading, error }) => (
                <div className="container">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h3 className="panel-title">EDIT Student</h3>
                    </div>
                    <div className="panel-body">
                      <h4>
                        <Link to="/" className="btn btn-primary">
                          Student List
                        </Link>
                      </h4>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          updateStudent({
                            variables: {
                              id: data.student._id,
                              name: name.value,
                              email: email.value,
                              phoneNumber: phoneNumber.value,
                              dob: dob.value,
                              subjects: subjects.value,
                            },
                          });
                          name.value = "";
                          email.value = "";
                          email.value = "";
                          phoneNumber.value = "";
                          dob.value = null;
                          subjects.value = "";
                        }}
                      >
                        <div className="form-group">
                          <label htmlFor="name">Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            ref={(node) => {
                              name = node;
                            }}
                            placeholder="name"
                            defaultValue={data.student.name}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">email:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="email"
                            ref={(node) => {
                              email = node;
                            }}
                            placeholder="email"
                            defaultValue={data.student.email}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phoneNumber">Phone Number:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="phoneNumber"
                            ref={(node) => {
                              phoneNumber = node;
                            }}
                            placeholder="Phone Number"
                            defaultValue={data.student.phoneNumber}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="dob">dob:</label>
                          <input
                            className="form-control"
                            name="dob"
                            ref={(node) => {
                              dob = node;
                            }}
                            placeholder="dob"
                            defaultValue={data.student.dob}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="subjects">subjects:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="subjects"
                            ref={(node) => {
                              subjects = node;
                            }}
                            placeholder="subjects"
                            defaultValue={data.student.subjects}
                          />
                        </div>
                        <button type="submit" className="btn btn-success">
                          Submit
                        </button>
                      </form>
                      {loading && <p>Loading...</p>}
                      {error && <p>Error :( Please try again</p>}
                    </div>
                  </div>
                </div>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default Edit;
