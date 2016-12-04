
'use strict'

const User = use('App/Model/User')
const Hash = use('Hash')
const Issue = use('App/Model/issues')
const Worklog = use('App/Model/worklogs')

const Validator = use('Validator')

class UserController {
    * register (req, res) {
        yield res.sendView('register')
    }

    * login (req, res) {
        yield res.sendView('login')
    }

    * doRegister (req, res) {
        // 1. input adatok kinyerése
        const empData = req.all()

        // 2. kinyert adatok validálása
        const rules = {
            'email': 'required|email',
            'name': 'required',
            'password': 'required|min:4',
            'password_again': 'required|same:password'
        }

        const validation = yield Validator.validateAll(empData, rules)
        if (validation.fails()) {
            yield req
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('/register')
            return
        }

        // 3. business logic
        const user = new User
        user.username = empData.name
        user.email = empData.email
        user.password = yield Hash.make(empData.password)

        yield user.save()
        yield req.auth.login(user)

        // 4. válasz generálása
        res.redirect('/')
    }

    * doLogin (req, res) {
        // 1.
        const email = req.input('email')
        const password = req.input('password')

        // 3.
        try {
            yield req.auth.attempt(email, password)
            res.redirect('/')
        } catch (ex) {
            console.log(ex)
            yield req
                .with({ error: 'Rossz belépési adatok.' })
                .flash()
            
           // res.redirect('/login')
        }
    }

    * doLogout (req, res) {
        // 1. 
        // 2.

        // 3.
        yield req.auth.logout()

        // 4.
        res.redirect('/')
    }

    * getProfile(req,res){
        const issues = yield Issue.query().where('assignee_id', req.param('id')).fetch()
        const worklogs = yield Worklog.query().where('assignee_id',req.param('id')).fetch()
        if (issues != null){
            yield res.sendView('profile', {
            issues: issues.toJSON(),
            worklogs: worklogs.toJSON()
        })
        }else{
          yield res.sendView('profile')  
        }
    }

    * edit (req, res) {
        const user = yield User.find(req.param('id'))

        yield res.sendView('editUser', {
            user: user.toJSON()
        })

    }

    * doEdit (req, res) {
        const user = yield User.find(req.param('id'))

        if (user === null) {
            res.notFound('Sorry, user not found.')
            return
        }

        // 1. input
        const userData = req.all()

        // 2. validáció
        const rules = {
            'email': 'required|email',
            'username': 'required',
        }

        const validation = yield Validator.validateAll(userData, rules)
        if (validation.fails()) {
            yield req
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect(`/profile/${user.id}/edit`)
            return
        }

        // TODO: check category

        user.username = userData.username
        user.email = userData.email
        user.firstname = userData.firstname
        user.lastname = userData.lastname

        yield user.save()

        res.redirect(`/profile/${user.id}`)
    }


}

module.exports = UserController
