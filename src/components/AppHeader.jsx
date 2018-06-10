import React from 'react';
import { Icon } from 'antd'
import formatDateTime from '../utils/date'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { isAuthenticated } from '../redux/modules/user'
import mapStateToProps from '../utils/mapStateToProps';

class AppHeader extends React.PureComponent {
  render() {
    const { item } = this.props
    return (
      <div>
        <div className="app-header-title">
          <h1>Banco de Questões</h1>
        </div>
        { this.props.isAuthenticated && <div className="app-header-user-info">
          <p>(Usuário: {this.props.user.perfil.login})</p>
          <Link to="/login">Sair</Link>
        </div>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps([
  'user',
  {
    prop: 'isAuthenticated',
    selector: isAuthenticated,
    state: 'user'
  }
]))(AppHeader)
