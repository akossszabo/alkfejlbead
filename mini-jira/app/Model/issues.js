'use strict'

const Lucid = use('Lucid')

class issues extends Lucid {

  project () {
    return this.belongsTo('App/Model/projects')
  }
   assignee () {
    return this.belongsTo('App/Model/User')
  }

}

module.exports = issues