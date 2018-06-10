import React from 'react';
import { Modal, Button, Row, Col } from 'antd'
import formatDateTime from '../utils/date'
import '../assets/scss/components/question-revision-history.scss'

class QuestionRevisionHistory extends React.PureComponent {
  constructor (props){
    super(props)
    let ultima = {}
    const question = this.props.value
    const revisions = (question.question_revisions || []).reverse()

    if (revisions.length > 0) {
      ultima = revisions[0]
    }
    this.state = { modalVisible: false, ultima, question, revisions }
  }

  render() {
    const { modalVisible, question, ultima, revisions } = this.state
    if (revisions.length === 0) {
      return (<div />)
    }
    return (
      <div className="question-revision-history">
        <Button icon="clock-circle-o" onClick={() => this.setState({ modalVisible: true })} />
        <h4>Última Revisão ({formatDateTime(ultima.updated_at)}): </h4> { ultima.comment }
        <Modal visible={modalVisible} title={`Revisões da Questão #${this.props.value.id}`} footer={[
            <Button onClick={() => this.setState({ modalVisible: false })}>Fechar</Button>
          ]}>
        { revisions.map((rev, idx) =>
          <div className="question-revision-history-item">
            <h4>{formatDateTime(rev.updated_at)}: </h4>{rev.comment}
          </div>
        )}
        </Modal>
      </div>
    )
  }
}

export default QuestionRevisionHistory
