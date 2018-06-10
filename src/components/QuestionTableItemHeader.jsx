import React from 'react';
import { Icon } from 'antd'
import formatDateTime from '../utils/date'

export default class QuestionTableItemHeader extends React.PureComponent {
  render() {
    const { item } = this.props
    return (
      <p className="question-table-item-header">
        Questão #{item.id} - <Icon type="user" /> {item.user.login}
        <div><Icon type="clock-circle-o" /> Última atualização em {formatDateTime(item.updated_at)}</div>
      </p>
    )
  }
}