import React from 'react';
import { Button } from 'antd';
import '../assets/scss/pages/not-found.scss'

class NotFoundPage extends React.PureComponent {
  goBack() {
    window.history.go(-1)
  }

  render() {
    return (
        <div className="not-found-page">
          <h1>404</h1>
          <Button className="not-found-page-button" size="large" type="primary" onClick={this.goBack}>Voltar</Button>
        </div>
    );
  }
}

export default NotFoundPage;
