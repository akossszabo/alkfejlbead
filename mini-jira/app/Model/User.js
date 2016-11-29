'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  todos () {
    return this.hasMany('App/Model/issues')
  }

}

module.exports = User