// Set up our Front-End Framework using AngularJS

// Instantiate the app
angular.module('MeetlyApp', [
  'MeetlyApp.form',
  'MeetlyApp.map',
  'MeetlyApp.services',
  'MeetlyApp.yelp',
  'MeetlyApp.authServices',
  'MeetlyApp.dataServices',
  'MeetlyApp.register',
  'MeetlyApp.login',
  'MeetlyApp.dashboard',
  'MeetlyApp.nav',
  'MeetlyApp.signout',
  'MeetlyApp.invites',
  'ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'app/views/form.html',
        authenticate: true
    })
    .state('map-view', {      
      url: '/map-view',      
      templateUrl: 'app/views/map-view.html',
      authenticate: true
    })
    .state('register', {
      url: '/register',
      templateUrl: 'app/views/register.view.html',
      controller: 'Register'      
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/views/login.view.html',
      controller: 'Login'      
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'app/views/dashboard.view.html',
      controller: 'Dashboard',
      authenticate: true    
    })
    .state('signout', {
      url: '/signout',
      templateUrl: 'app/views/signout.view.html',
      controller: 'Signout'      
    })
    .state('invites', {
      url: '/invites',
      templateUrl: 'app/views/invites.view.html',
      controller: 'Invites'      
    })

})

.run(function ($rootScope, $location, $window, Auth, $state) {
  console.log('run running')
  // Check whether the user is authenticated to navigate to a route or not on every
  // route change.
  $rootScope.$on('$stateChangeStart', function (event, next, prev) {

    //If unauthenticated user tries to access protected page, redirect to login
    if (!Auth.isLoggedIn() && next.authenticate) {            
      event.preventDefault();      
      // $location.path('/'); // not working for some reason
      $window.location.href = '#/login';            
    }
  })
})  
