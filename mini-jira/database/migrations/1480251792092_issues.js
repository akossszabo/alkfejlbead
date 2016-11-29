'use strict'

const Schema = use('Schema')

class IssuesTableSchema extends Schema {

  up () {
    this.create('issues', (table) => {
      table.increments()
      table.string('name')
      table.string('started')
      table.string('reporter')
      table.string('assignee')
      table.integer('assignee_id').unsigned().references('id').inTable('User')
      table.integer('project_id').unsigned().references('id').inTable('projects')
      table.timestamps()
    })
  }

  down () {
    this.drop('issues')
  }

}

module.exports = IssuesTableSchema
