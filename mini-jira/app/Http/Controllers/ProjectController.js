'use strict'

const Project = use('App/Model/projects')
const Issue = use('App/Model/issues')
const Validator = use('Validator')
const User = use('App/Model/User')


class ProjectController{

    * main (req, res) {
        const projects = yield Project.all()
        yield res.sendView('projects', {projects: projects.toJSON()})
    }

    * show (req, res) {
        const project = yield Project.find(req.param('id'))
        const issues = yield project.issues().fetch()

            yield res.sendView('project', {
            project: project.toJSON(),
            issues: issues.toJSON()
        })
    }

    * create (req, res) {
        const projects = yield Project.all()

        yield res.sendView('createProject', {
            projects: projects.toJSON()
        })
    }

    * doCreate (req, res) {
        // 1. input
        const projectData = req.all()

        // 2. validáció
        const rules = {
            'name': 'required|min:3',
            'type': 'required',
            'description': 'required',
        }

        

        const validation = yield Validator.validateAll(projectData, rules)
        if (validation.fails()) {
            yield req
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('/createproject')
            return
        }

        // TODO: check category

        const project = new Project()
        project.name = projectData.name
        project.type = projectData.type
        project.description = projectData.description

        yield project.save()

        res.redirect(`/projects/${project.id}`)
    }

    * edit (req, res) {
        const project = yield Project.find(req.param('id'))

        yield res.sendView('editProject', {
            project: project.toJSON()
        })

    }

    * doEdit (req, res) {
        const project = yield Project.find(req.param('id'))

        if (project === null) {
            res.notFound('Sorry, project not found.')
            return
        }

        // 1. input
        const projectData = req.all()

        // 2. validáció
        const rules = {
            'name': 'required|min:3',
            'description': 'required'
        }

        const validation = yield Validator.validateAll(projectData, rules)
        if (validation.fails()) {
            yield req
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect(`/projects/${project.id}/edit`)
            return
        }

        // TODO: check category

        project.name = projectData.name
        project.description = projectData.description
        project.type = projectData.inputType


        yield project.save()

        res.redirect(`/projects/${project.id}`)
    }



}

module.exports = ProjectController