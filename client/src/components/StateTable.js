import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Input } from 'semantic-ui-react';
import { fetchStateTable } from '../store/actions/'

class StateTable extends Component {
    state = {
        str: ''
    }
    componentWillMount() {
        this.props.fetchStateTable();
    }
    handleChange = (e, { value }) => {
        this.setState({ str: value });
    }
    render() {
        let tmp = this.props.stateTable;
        if (this.state.str) tmp = this.props.stateTable.filter(el => el.name.toLowerCase().indexOf(this.state.str.toLowerCase()) > -1);
        return ( <div>
            <Input fluid onChange={this.handleChange} label='Enter task name'></Input> 
            <Table celled structured>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Users</Table.HeaderCell>
                        <Table.HeaderCell>State</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                        <Table.HeaderCell>Managed</Table.HeaderCell>
                        <Table.HeaderCell>Creation date</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {tmp.map(key =>
                            <Table.Row key={key.id}>
                                <Table.Cell>{key.id}</Table.Cell>
                                <Table.Cell>{key.name}</Table.Cell>
                                <Table.Cell>
                                <Table>
                                    <Table.Body>
                                        <Table.Row>{key.users ?
                                            key.users.map((el, id) => <Table.Cell key={id + 1001 * key.id}>{el}</Table.Cell>) :
                                            <div></div>}
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                                </Table.Cell>
                                <Table.Cell>{key.state}</Table.Cell>
                                <Table.Cell>{key.action}</Table.Cell>
                                <Table.Cell>{key.managed}</Table.Cell>
                                <Table.Cell>{key.createdAt}</Table.Cell>
                            </Table.Row>
                        )
                    }
                </Table.Body>
            </Table>
        </div>
        );
    }
}

export default connect(
    state => ({
        stateTable: state.active.stateTable
    }),
    { fetchStateTable }
)(StateTable);