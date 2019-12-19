import React, { Component } from 'react';
import { Menu, Header } from 'semantic-ui-react';
import '../App.css';
import { connect } from 'react-redux';
import { changeActiveItem, logOut } from '../store/actions/';

class Navbar extends Component {
  handleItemClick = (e, { content }) => {
    if (this.props.logged) {
      this.setState({ activeItem: content });
      this.props.changeActiveItem(content);
    }
  }

  render() {
    const { activeItem } = this.props;

    return (
      <div>
        <Menu horizontal='true'>
          <Menu.Item header>
            <Header>
              Business processes
                            <Header.Subheader>Databases-1</Header.Subheader>
            </Header>
          </Menu.Item>
          <Menu.Item>
            <Menu fluid>
              <Menu.Item onClick={this.handleItemClick} as='a'
                content='User Table' active={activeItem === 'User Table'}>
              </Menu.Item>
              <Menu.Item onClick={this.handleItemClick} as='a'
                content='Task Table' active={activeItem === 'Task Table'}>
              </Menu.Item>
              <Menu.Item onClick={this.handleItemClick} as='a'
                content='State Table' active={activeItem === 'State Table'}>
              </Menu.Item>
              <Menu.Item onClick={this.handleItemClick} as='a'
                content='User Management' active={activeItem === 'User Management'}>
              </Menu.Item>
              <Menu.Item onClick={this.handleItemClick} as='a'
                content='Task Management' active={activeItem === 'Task Management'}>
              </Menu.Item>
            </Menu>
          </Menu.Item>

          <Menu.Item onClick={this.props.logOut} as='a' content='Log Out' />
        </Menu>
      </div>
    )
  }
}

export default connect(
  state => ({
    activeItem: state.active.activeItem,
    logged: state.active.logged
  }),
  { changeActiveItem, logOut }
)(Navbar);