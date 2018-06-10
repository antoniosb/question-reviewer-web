import React from 'react'
import { connect } from 'react-redux'
import mapStateToProps from '../utils/mapStateToProps'
import { Tabs, Badge, Button } from 'antd'
import QuestionTable from '../components/QuestionTable'
import questionService from '../services/question'
import { withRouter } from "react-router-dom";

const TabPane = Tabs.TabPane;

class QuestionList extends React.PureComponent {
  componentDidMount() {
    questionService.load()
  }

  render() {
    return (
        <div className="question-list-page">
          <h1>Questões</h1>
          <Button icon="add" type="primary" onClick={() => this.props.history.push('/questions/new')}>Cadastrar Nova</Button>
          <Tabs defaultActiveKey="1">
              <TabPane tab={<Badge offset={[1,20]} count={this.props.question.pendent.length}>Pendentes</Badge>} key="1">
              <QuestionTable value={this.props.question.pendent} />
            </TabPane>
            <TabPane tab={<Badge offset={[1,20]} count={this.props.question.reproved.length}>Reprovadas</Badge>} key="2">
              <QuestionTable value={this.props.question.reproved} />
            </TabPane>
            <TabPane tab={<Badge offset={[1,20]} count={this.props.question.approved.length}>Aprovadas</Badge>} key="3">
              <QuestionTable value={this.props.question.approved} />
            </TabPane>
          </Tabs>
        </div>
    );
  }
}

export default withRouter(connect(mapStateToProps(['question']))(QuestionList));
