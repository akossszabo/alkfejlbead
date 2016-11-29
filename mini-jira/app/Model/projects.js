'use strict'

const Lucid = use('Lucid')

class projects extends Lucid {

  issues () {
    return this.hasMany('App/Model/issues')
  }

}

module.exports = projects