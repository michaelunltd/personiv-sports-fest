angular.module('teamCtrl' , [])

  .controller('TeamController', function($http ,$mdDialog ,$state ,$stateParams, Team, User) {

    var vm = this;
    vm.editable = false;

    //add team to database
    vm.addTeam = function(data){
      Team.store(data).then(function(response) {
        console.log(response);
      }).catch(function(err){
        console.log(err);
      })
    }

    //retrieve teams from api/teams
    vm.getTeams = function() {
      Team.get().then(function (team) {
        vm.teams = team.data
      }, function(error){
        console.log(error)
      })
    }

    //get team from api/teams/{id}
    vm.getTeam = function() {
      Team.show($stateParams.id).then(function(team) {
        vm.data = team.data[0];
        vm.getTeamPoc(team.data[0].user_id);
        console.log(vm.data);
      }).catch(function(err) {
        console.log(err);
      })
    }

    //go to team route
    vm.showTeam = function(id) {
      $state.go("team_view" ,{id:id});
    }

    //get the POCs
    vm.getPocs = function()
    {
      User.poc().then(function(poc) {
        vm.poc = poc.data
      })
    }

    vm.getSports = function() {
      $http({
        method: 'GET',
        url: 'api/sports'
      }).then(function(sports) {
        vm.sports = sports.data
        console.log(sports.data);
      })
    }

    //retrieve poc from apo/users/{id}
    vm.getTeamPoc = function(id)
    {
      User.show(id).then(function(poc) {
       vm.data.poc = poc.data
     }).catch(function(err){
       console.log(err);
     })
    }

  })
