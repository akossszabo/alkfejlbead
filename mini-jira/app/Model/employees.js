'use strict'

const Lucid = use('Lucid')

class employees extends Lucid {

  todos () {
    return this.hasMany('App/Model/issues')
  }

}

module.exports = employees