sportsFest.factory("Player", ["$q", "$http", 
  function($q, $http) {
  	return {
  		get : function() {
  			return $http({
				method: 'GET',
				url: 'api/players'
        	});
  		},
		noTeamGet : function() {
			return $http({
				method: 'GET',
				url: 'api/players/noteam'
			});
		},

  		store : function(data) {
  			return $http({
	            method: 'POST',
	            url: 'api/players',
	            data: data,
	            headers: { 'Content-Type' : 'application/json' }
	        });
  		},

  		show : function(id) {
  			return $http.get('/api/players/' + id);
  		},

  		update : function(id, data) {
			return $http({
	            method: 'POST',
	            url: 'api/players/' + id,
	            data: data,
	            headers: { 'Content-Type' : 'application/json' }
	        });
  		},

  		destroy : function(id) {
  			return $http.delete('/api/players/' + id);
  		}
  	}
}])