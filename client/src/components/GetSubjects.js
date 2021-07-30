import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import "./getSubject.css";

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

function GetSubjects() {
  return (
    <Query pollInterval={500} query={GET_STUDENTS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <div className="container">
            <h2>Student Name by Subject</h2>
            <h4>Bangla: </h4>
            {data.students.map(
              (student, index) =>
                student.subjects.toLowerCase().includes("bangla") && (
                  <div key={student._id} className="white-space">
                    {student.name},
                  </div>
                )
            )}
            <h4>English: </h4>
            {data.students.map((student, index) => (
              <div key={student._id} className="white-space">
                {student.subjects.toLowerCase().includes("english") &&
                  student.name}
              </div>
            ))}
            <h4>Physics: </h4>
            {data.students.map((student, index) => (
              <div key={student._id} className="white-space">
                {student.subjects.toLowerCase().includes("physics") &&
                  student.name}
              </div>
            ))}
            <h4>Math: </h4>
            {data.students.map((student, index) => (
              <div key={student._id} className="white-space">
                {student.subjects.toLowerCase().includes("math") &&
                  student.name}
              </div>
            ))}
          </div>
        );
      }}
    </Query>
  );
}

export default GetSubjects;
