import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsers, createNewUser } from './../actions/userActions';
import './../css/userTable.css';

class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: {
        forename: '',
        surname: '',
        email: '',
      },
    };
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  handleForenameChange({ target }) {
    this.state.newUser.forename = target.value;
  }

  handleSurnameChange({ target }) {
    this.state.newUser.surname = target.value;
  }

  handleEmailChange({ target }) {
    this.state.newUser.email = target.value;
  }

  render() {
    window.componentHandler.upgradeDom(); // Workaround for a bug coming from Material Design Lite
    const users = this.props.users.users || [];
    const userVM = users.map((user, i) => (
      <tr key={i}>
        <td className="mdl-data-table__cell--non-numeric">{ user.forename }</td>
        <td>{ user.surname }</td>
        <td>{ user.email}</td>
      </tr>
    ));

    return (
      <div id="user-table-container">

        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
          <thead>
            <tr>
              <th className="mdl-data-table__cell--non-numeric">Forename</th>
              <th>Surname</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {userVM}
          </tbody>
        </table>
        <br />
        <button onClick={() => this.props.getAllUsers()} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent reload-btn">
          Reload
        </button>

        <div id="register-new-user-container" className="demo-card-wide mdl-card mdl-shadow--4dp">
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">Create new user</h2>
          </div>

          <div className="register-new-user-form mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input onChange={this.handleForenameChange.bind(this)} className="mdl-textfield__input" type="text" id="user-forename" />
            <label className="mdl-textfield__label" htmlFor="user-forename">Forename</label>
          </div>

          <div className="register-new-user-form mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input onChange={this.handleSurnameChange.bind(this)} className="mdl-textfield__input" type="text" id="user-surname" />
            <label className="mdl-textfield__label" htmlFor="user-surname">Surname</label>
          </div>

          <div className="register-new-user-form mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input onChange={this.handleEmailChange.bind(this)} className="mdl-textfield__input" type="text" id="user-email" />
            <label className="mdl-textfield__label" htmlFor="user-email">Email</label>
          </div>

          <div className="submit-area mdl-card__actions mdl-card--border">
            <a onClick={() => this.props.createNewUser(this.state.newUser)} className="mdl-button mdl-button--raised mdl-button--colored mdl-js-button mdl-js-ripple-effect">
              Create user
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.userReducer,
});

const mapDispatchToProps = dispatch => ({
  createNewUser: newUser => dispatch(createNewUser(newUser)),
  getAllUsers: () => dispatch(getAllUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
