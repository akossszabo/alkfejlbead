'use strict'

const Route = use('Route')

Route.get('/', 'IssueController.main')
Route.get('/login', 'UserController.login')
Route.post('/login', 'UserController.doLogin')
Route.get('/logout', 'UserController.doLogout')
Route.get('/register', 'UserController.register')
Route.post('/register', 'UserController.doRegister')
Route.get('/projects', 'ProjectController.main' )
Route.get('/projects/:id', 'ProjectController.show').middleware('auth')
Route.get('/createproject', 'ProjectController.create').middleware('auth')
Route.post('/createproject', 'ProjectController.doCreate').middleware('auth')
Route.get('/projects/:id/createissue', 'IssueController.create').middleware('auth')
Route.post('/projects/:id/createissue', 'IssueController.doCreate').middleware('auth')

Route.get('/projects/:pid/removeissue/:id', 'IssueController.remove').middleware('auth')
Route.get('/profile/:id','UserController.getProfile').middleware('auth')