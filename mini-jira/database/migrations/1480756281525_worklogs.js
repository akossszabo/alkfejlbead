'use strict'

const Schema = use('Schema')

class WorklogsTableSchema extends Schema {

  up () {
    this.create('worklogs', (table) => {
      table.increments()
      table.string('description')
      table.string('timeworked')
      table.string('assignee')
      table.string('issue_id').unsigned().references('id').inTable('issues')
      table.integer('assignee_id').unsigned().references('id').inTable('User')
      table.timestamps()
    })
  }

  down () {
      this.drop('worklogs')
  }

}

module.exports = WorklogsTableSchema
