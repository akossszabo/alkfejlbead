'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  todos () {
    return this.hasMany('App/Model/issues')
  }
  todos () {
    return this.hasMany('App/Model/worklogs')
  }

}

module.exports = User