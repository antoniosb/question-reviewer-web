
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { Radio, Button } from 'antd'
import mapStateToProps from '../utils/mapStateToProps'
import questionService from '../services/question'
import QuestionReproveConfirmation from './QuestionReproveConfirmation'
import QuestionRevisionHistory from './QuestionRevisionHistory';
const RadioGroup = Radio.Group;

const getAlternativeClass = (item) => {
  return {
    'question-table-item-alternative': true,
    correct: item.is_correct
  }
}

class QuestionTableItem extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { showModalReprove: false }
    this.approve = this.approve.bind(this)
    this.reprove = this.reprove.bind(this)
    this.onReprove = this.onReprove.bind(this)
    this.edit = this.edit.bind(this)
  }

  edit () {
    this.props.history.push(`/questions/${this.props.value.id}`)
  }

  approve() {
    questionService.approve(this.props.value.id)
  }

  reprove() {
    this.setState({ showModalReprove: true })
  }

  onReprove(comment) {
    questionService.reprove(this.props.value.id, comment).then(() => {
      this.setState({ showModalReprove: false })
    })
  }

  render() {
    const canEdit = this.props.user.perfil.id === this.props.value.user.id && this.props.value.status === 'R'
    const canReview = this.props.user.perfil.is_admin && this.props.value.status === 'P'

    return (
      <div>
        <p>({this.props.value.source} - {this.props.value.year}) {this.props.value.content}</p>
        <RadioGroup disabled>
          { this.props.value.question_alternatives.map((alt, idx) => <Radio className={getAlternativeClass(alt)} checked={alt.is_correct} value={idx}>{alt.content}</Radio>) }
        </RadioGroup>
        <QuestionRevisionHistory value={this.props.value}></QuestionRevisionHistory>
        <div className="question-table-item-buttons">
          { canEdit && <Button size="large" type="primary" onClick={this.edit}>Editar</Button>}
          { canReview && <Button size="large" icon="like-o" type="primary" onClick={this.approve}>Aprovar</Button>}
          { canReview && <Button size="large" icon="dislike-o" type="danger" onClick={this.reprove}>Reprovar</Button>}
        </div>
        <QuestionReproveConfirmation value={this.props.value} visible={this.state.showModalReprove} onCancel={() => this.setState({ showModalReprove: false })} onReprove={this.onReprove} />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps(['user']))(QuestionTableItem))
