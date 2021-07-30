import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";

const ADD_STUDENT = gql`
  mutation AddStudent(
    $name: String!
    $email: String!
    $phoneNumber: String!
    $dob: String!
    $subjects: String!
  ) {
    addStudent(
      name: $name
      email: $email
      phoneNumber: $phoneNumber
      dob: $dob
      subjects: $subjects
    ) {
      _id
    }
  }
`;

class Create extends Component {
  render() {
    let name, email, phoneNumber, dob, subjects;
    return (
      <Mutation
        mutation={ADD_STUDENT}
        onCompleted={() => this.props.history.push("/")}
      >
        {(addStudent, { loading, error }) => (
          <div className="container">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">ADD Student</h3>
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
                    addStudent({
                      variables: {
                        name: name.value,
                        email: email.value,
                        phoneNumber: phoneNumber.value,
                        dob: dob.value,
                        subjects: subjects.value,
                      },
                    });
                    name.value = "";
                    email.value = "";
                    phoneNumber.value = "";
                    dob.value = "";
                    subjects.value = null;
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
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      ref={(node) => {
                        email = node;
                      }}
                      placeholder="email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phoneNumber"
                      ref={(node) => {
                        phoneNumber = node;
                      }}
                      placeholder="phoneNumber"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dob">date of birth:</label>
                    <input
                      className="form-control"
                      name="dob"
                      ref={(node) => {
                        dob = node;
                      }}
                      placeholder="dob"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subjets">Subjects:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="subjects"
                      ref={(node) => {
                        subjects = node;
                      }}
                      placeholder="subjects"
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
  }
}

export default Create;
