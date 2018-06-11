import React from 'react';
import { Form, Icon, Input, Button, Alert } from 'antd'
import { Link, withRouter } from "react-router-dom"
import '../assets/scss/pages/auth.scss'
import userService from '../services/user'
import { Redirect } from 'react-router-dom'
import formConfig from '../utils/formConfig'
import getApiErrorMessage from '../utils/error';

const FormItem = Form.Item;

export class AuthPage extends React.Component {
  constructor (props){
    super(props)
    const isLogin = this.props.match.path === '/login'
    const title = isLogin ? 'Login' : 'Cadastro de Usuário'

    this.state = { authenticated: false, errorMsg: null, isLogin, title }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    userService.logout()
  }

  componentWillReceiveProps() {
    const isLogin = this.props.match.path === '/login'
    const title = isLogin ? 'Login' : 'Cadastro de Usuário'
    this.setState({ isLogin, title })
  }
 
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const method = this.state.isLogin ? userService.login : userService.signUp

        method(values).then(() => {
          this.props.history.push('/')
        }).catch((err) => {
          this.setState({ errorMsg: getApiErrorMessage('Usuário', err) })
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { title, isLogin } = this.state
    return (
      <Form onSubmit={this.handleSubmit} className="auth-page">
        <h1>{ title }</h1>
        { this.state.errorMsg && <Alert message={this.state.errorMsg} type="error" /> }
        <FormItem>
          {getFieldDecorator('login', formConfig())(
            <Input prefix={<Icon type="user" className="auth-page-input-icon" />} placeholder="Usuário" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', formConfig())(
            <Input prefix={<Icon type="lock" className="auth-page-input-icon" />} type="password" placeholder="Senha" />
          )}
        </FormItem>
        <FormItem>
          {!isLogin && [<Button key="voltar" type="secondary" onClick={() => this.props.history.go(-1)} className="auth-page-button">
            Voltar
          </Button>,
          <Button key="cadastrar" type="primary" htmlType="submit" className="auth-page-button">
            Cadastrar
          </Button>
          ]}
          {isLogin && [<Button key="entrar" type="primary" htmlType="submit" className="auth-page-button">
            Entrar
          </Button>, <Button key="cadastrar" type="secondary" onClick={() => this.props.history.push('/signUp')} className="auth-page-button">
            Cadastro novo Usuário
          </Button>]}
        </FormItem>
      </Form>
    );
  }
}

const WrappedAuthPage = Form.create()(AuthPage);

export default withRouter(WrappedAuthPage)