import React from 'react';
import AuthPage from '../pages/Auth';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from 'antd';
import NotFoundPage from '../pages/NotFound';
const { Header, Content, Footer } = Layout;
import './../assets/scss/pages/app.scss'
import PrivateRoute from '../components/PrivateRoute';
import QuestionList from './QuestionList';
import QuestionCrudPage from './QuestionCrud';
import AppHeader from '../components/AppHeader';

class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <Layout className="app">
          <Header className="app-header">
            <AppHeader />
          </Header>
          <Content className="app-content">
            <div>
              <Switch>
                <PrivateRoute exact path="/" component={QuestionList}/>
                <PrivateRoute exact path="/questions" component={QuestionList}/>
                <PrivateRoute exact path="/questions/:id" component={QuestionCrudPage}/>
                <Route path="/login" component={AuthPage} key="login"/>
                <Route path="/signUp" component={AuthPage} key="signUp"/>
                <Route component={NotFoundPage} />
              </Switch>
            </div>
          </Content>
          <Footer className="app-footer">
            Banco de Questões ©2018 criado por Hermógenes Ferreira
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App
