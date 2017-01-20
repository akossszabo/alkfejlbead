'use strict'

const Route = use('Route')

Route.get('/', 'IssueController.main')
Route.get('/login', 'UserController.login')
Route.post('/login', 'UserController.ajaxLogin')
Route.get('/logout', 'UserController.doLogout')
Route.get('/register', 'UserController.register')
Route.post('/register', 'UserController.doRegister')
Route.get('/projects', 'ProjectController.main' )
Route.get('/projects/:id', 'ProjectController.show').middleware('auth')
Route.get('/projects/:id/edit','ProjectController.edit').middleware('auth')
Route.post('/projects/:id/edit','ProjectController.doEdit').middleware('auth')
Route.get('/createproject', 'ProjectController.create').middleware('auth')
Route.post('/createproject', 'ProjectController.doCreate').middleware('auth')
Route.get('/projects/:id/createissue', 'IssueController.create').middleware('auth')
Route.post('/projects/:id/createissue', 'IssueController.doCreate').middleware('auth')

Route.get('projects/logwork/:uid', 'IssueController.logWork').middleware('auth')
Route.post('projects/logwork/:uid', 'IssueController.doLog').middleware('auth')
//Route.get('/projects/:pid/removeissue/:id', 'IssueController.remove').middleware('auth')
Route.get('/profile/:id','UserController.getProfile').middleware('auth')

Route.get('/removewlog/:id','IssueController.ajaxWlogDelete').middleware('auth')

Route.get('/profile/:id/edit','UserController.edit').middleware('auth')
Route.post('/profile/:id/edit','UserController.doEdit').middleware('auth')

Route.get('/projects/:pid/removeissue/:id', 'IssueController.ajaxDelete').middleware('auth')