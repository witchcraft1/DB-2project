import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Input } from 'semantic-ui-react';
import { fetchUserTable } from '../store/actions/'

class UserTable extends Component {
  state = {
    str: ''
  }
  componentDidMount() {
    this.props.fetchUserTable();
  }
  handleChange = (e, { value }) => {
    this.setState({ str: value });
  }
  render() {
    let tmp = this.props.userTable;
    if (this.state.str) tmp = this.props.userTable.filter(el => el.name.toLowerCase().indexOf(this.state.str.toLowerCase()) > -1);
    return (
      <div>
        <Input fluid onChange={this.handleChange} label='Enter user name'></Input>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Tasks</Table.HeaderCell>
              <Table.HeaderCell>Communicative</Table.HeaderCell>
              <Table.HeaderCell>Worked before</Table.HeaderCell>
              <Table.HeaderCell>Skills</Table.HeaderCell>
              <Table.HeaderCell>Knowledge</Table.HeaderCell>
              <Table.HeaderCell>Created Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tmp.map(key =>
              <Table.Row key={key.id}>
                <Table.Cell>{key.id}</Table.Cell>
                <Table.Cell>{key.name}</Table.Cell>
                <Table.Cell>{key.task.map((el, id) => <div key={id}>{el}</div>)}</Table.Cell>
                <Table.Cell>{key.comm ? key.comm.toString() : ''}</Table.Cell>
                <Table.Cell>{key.worbef ? key.worbef.toString() : ''}</Table.Cell>
                <Table.Cell>{key.skills ? key.skills.toString() : ''}</Table.Cell>
                <Table.Cell>{key.knowledge ? key.knowledge.toString() : ''}</Table.Cell>
                <Table.Cell>{key.createdAt}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default connect(
  state => ({
    userTable: state.active.userTable
  }),
  { fetchUserTable }
)(UserTable);