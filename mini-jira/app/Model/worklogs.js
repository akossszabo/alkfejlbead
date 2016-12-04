'use strict'

const Lucid = use('Lucid')

class worklogs extends Lucid {

  issue () {
    return this.belongsTo('App/Model/issues')
  }
   assignee () {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = worklogs