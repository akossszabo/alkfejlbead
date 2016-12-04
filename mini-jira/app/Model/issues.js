'use strict'

const Lucid = use('Lucid')

class issues extends Lucid {

  project () {
    return this.belongsTo('App/Model/projects')
  }
   assignee () {
    return this.belongsTo('App/Model/User')
  }
  worklogs(){
    return this.hasMany('App/Model/worklog')
  }

}

module.exports = issues