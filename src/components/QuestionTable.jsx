
import React from 'react'
import QuestionTableItem from './QuestionTableItem'
import QuestionTableItemHeader from './QuestionTableItemHeader'
import { Collapse, Icon, Alert } from 'antd'
import '../assets/scss/components/question-table.scss'
const Panel = Collapse.Panel

class QuestionTable extends React.PureComponent {
  render() {
    if (this.props.value.length < 1) {
      return (<Alert message="Nenhuma questão encontrada" type="info" />)
    }
    return (
      <Collapse accordion className="question-table">
        { this.props.value.map((item, idx) => 
          <Panel header={<QuestionTableItemHeader item={item} />} key={idx} className="question-table-item">
            <QuestionTableItem value={item} />
          </Panel>
         )
        }
      </Collapse>
    )
  }
}

export default QuestionTable