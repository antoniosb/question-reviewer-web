import React from 'react';
import { Modal, Form, Input } from 'antd'
const FormItem = Form.Item
const { TextArea } = Input
import formConfig from '../utils/formConfig'

class QuestionReproveConfirmation extends React.PureComponent {
  constructor (props){
    super(props)
    this.onOk = this.onOk.bind(this)
  }

  onOk (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onReprove(values.comment)
      }
    })
  }

  render() {
    const { onCancel, visible } = this.props
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal visible={visible} title={`Reprovar Questão #${this.props.value.id}`} okText="Reprovar" onCancel={onCancel} onOk={this.onOk}>
        <Form layout="vertical">
          <FormItem label="Comentário">
            {getFieldDecorator('comment', formConfig())(
              <TextArea placeholder="Comentário" />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const WrappedQuestionReproveConfirmation = Form.create()(QuestionReproveConfirmation);

export default WrappedQuestionReproveConfirmation
