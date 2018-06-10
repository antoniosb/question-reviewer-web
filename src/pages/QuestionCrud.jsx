import React from 'react';
import { Form, Icon, Input, Button, Alert, Col, Radio } from 'antd'
import questionService from '../services/question'
import { withRouter } from "react-router-dom";
import formConfig from '../utils/formConfig'
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
  marginBottom: '5px'
};

class QuestionCrudPage extends React.Component {
  constructor (props){
    super(props)
    const question_alternatives = [{}, {}, {}, {}, {}]

    this.state = { question: { question_alternatives }, isEdit: props.match.params.id !== 'new', correctAlternativeIndex: 0 }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
 
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ errorMsg: null })
        const obj = Object.assign({}, values)
        obj.alternatives.forEach((qa, idx) => {
          obj.alternatives[idx].is_correct = obj.correctAlternative === idx
        })
        delete obj.correctAlternative
        let method = questionService.create
        if (this.state.isEdit) {
          obj.id = this.state.question.id
          method = questionService.update
        }

        method(obj).then(() => {
          this.props.history.push('/questions')
        }).catch((err) => {
          if (err.response && err.response.status === 400) {
            this.setState({ errorMsg: 'Confira os dados e tente novamente' })
          } else {
            this.setState({ errorMsg: 'Ops! Ocorreu um erro inesperado no servidor' })
          }
        })
      } else {
        this.setState({ errorMsg: 'Confira os dados e tente novamente' })
      }
    })
  }

  componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      questionService.get(this.props.match.params.id).then((question) => {
        const correctAlternativeIndex = question.question_alternatives.findIndex((qa) => qa.is_correct)
        this.setState({ question, correctAlternativeIndex })
      }).catch((err) => {
        if (err.response && err.response.status === 404) {
          this.props.history.push('/404?msg=INVALID_QUESTION')
        }
      })
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="question-crud-page">
        <h1>Cadastro Questão</h1>
        { this.state.errorMsg && <Alert message={this.state.errorMsg} type="error" style={{ marginBottom: 20 }} /> }
        <FormItem {...formItemLayout} label="Conteúdo">
          {getFieldDecorator('content', formConfig({ initialValue: this.state.question.content }))(
            <TextArea placeholder="Conteúdo" rows={5} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Origem/Ano">
          <Col span={10}>
            {getFieldDecorator('source', formConfig({ initialValue: this.state.question.source }))(
              <Input placeholder="Origem" />
            )}
          </Col>
          <Col span={5}>
            {getFieldDecorator('year', formConfig({ initialValue: this.state.question.year }))(
              <Input placeholder="Ano" />
            )}
          </Col>
        </FormItem>
        <FormItem {...formItemLayout} label="Alternativas">
          {getFieldDecorator('correctAlternative', formConfig({ initialValue: this.state.correctAlternativeIndex }))(
            <RadioGroup>
              {this.state.question.question_alternatives.map((qa, idx) =>
                <Radio tabIndex="-1" value={idx} style={radioStyle} key={idx}>
                  {getFieldDecorator(`alternatives[${idx}].content`, formConfig({ initialValue: qa.content }))(
                    <Input placeholder={`Alternativa ${idx + 1}`} />
                  )}
                </Radio>
              )}
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout}>
          <Button type="secondary" className="question-crud-page-button" onClick={() => this.props.history.go(-1) }>
            Cancelar
          </Button>
          <Button type="primary" htmlType="submit" className="question-crud-page-button">
            Salvar
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedQuestionCrudPage = withRouter(Form.create()(QuestionCrudPage));

export default WrappedQuestionCrudPage
