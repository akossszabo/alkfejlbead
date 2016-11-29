'use strict'

const User = use('App/Model/User')
const Issue = use('App/Model/issues')
const Project = use('App/Model/projects')

const Validator = use('Validator')
class IssueController{

    * main (req, res) {
        const projects = yield Project.all()
        for (const project of projects) {
            const topIssues = yield project.issues()
            project.topIssues = JSON.stringify(topIssues)
        }

        yield res.sendView('main', {
            projects: projects.toJSON(),
        })
    }

    * create (req, res) {
        const issues = yield Issue.all()
        const users = yield User.all()
        const project = yield Project.find(req.param('id'))
        yield res.sendView('createIssue', {
            issues: issues.toJSON(),
            users: users.toJSON(),
            project: project.toJSON()
        })
    }

    * doCreate (req, res) {
        // 1. input
        const issueData = req.all()

        // 2. validáció
        const rules = {
            'name': 'required|min:3'
        }

        const validation = yield Validator.validateAll(issueData, rules)
        if (validation.fails()) {
            yield req
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('/')
            return
        }

        // TODO: check category
        const project = yield Project.find(req.param('id'))
        const userName = yield User.findBy('id',issueData.assigneeId)
        const issue = new Issue()
        issue.name = issueData.name
        issue.project_id = project.id
        issue.assignee_id = issueData.assigneeId
        issue.assignee = userName.username
        issue.started = issueData.description
        yield issue.save()

        res.redirect(`/projects/${issue.project_id}`)
    }

    * remove (req, res) {
        const issue = yield Issue.find(req.param('id'))
        const id = issue.project_id
        yield issue.delete()
        res.redirect(`/projects/${id}`)
    }

}

module.exports = IssueController