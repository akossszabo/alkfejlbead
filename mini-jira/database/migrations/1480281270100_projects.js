'use strict'

const Schema = use('Schema')

class ProjectTableSchema extends Schema {

  up () {
    this.create('projects', (table) => {
      table.increments()
      table.string('name', 60).notNullable()
      table.string('description')
      table.string('type')
      table.timestamps()
    })
  }

  down () {
    this.drop('projects')
  }

}

module.exports = ProjectTableSchema
