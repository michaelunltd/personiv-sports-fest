!function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="./",e(e.s=21)}([function(t,e){sportsFest.controller("AuthController",["$scope","$auth","Auth","$rootScope","$state",function(t,e,n,o,r){var a=this;a.loginError=!1,a.loginErrorText,a.login=function(){var t={email:a.email,password:a.password};e.login(t).then(function(t){return n.getAuthenticatedUser().then(function(t){localStorage.setItem("user",JSON.stringify(t.data.user)),o.currentUser=t.data.user,r.go("home.home")})},function(t){a.password="",a.loginError=!0,a.loginErrorText=t.data.error})}}])},function(t,e){sportsFest.factory("Auth",["$q","$http",function(t,e){return{getAuthenticatedUser:function(){return e({method:"GET",url:"api/authenticate/user"})}}}])},function(t,e){sportsFest.factory("Authorize",["Role",function(t){var e=JSON.parse(localStorage.getItem("user"));return{isAdmin:function(){return t.getAdminId().then(function(t){var n=parseInt(t.data);return e.role_id==n})},isPoc:function(){return t.getPocId().then(function(t){var n=parseInt(t.data);return e.role_id==n})}}}])},function(t,e){sportsFest.controller("DraftController",["$scope","Player","Team","Sport","$mdDialog",function(t,e,n,o,r){function a(t){return s.players.map(function(t){return t.id}).indexOf(t)}function i(t){null==t.team_id?s.getSportPlayers(s.sportsId):s.players.splice(a(t.id),1)}var s=this;s.teams,s.players,s.sports,s.loaded=!1,s.limitOptions=[10,25,50,100],s.sportsId,s.query={order:"last_name",limit:10,page:1},s.getTeams=function(){n.get().then(function(t){s.teams=t.data,s.loaded=!0},function(t){})},s.getSports=function(){o.get().then(function(t){s.sports=t.data,s.getTeams()},function(t){})},s.getSports(),s.sportId,s.getSportPlayers=function(t){s.sportsId=t,s.loaded=!1,s.sportId=t,o.getPlayers(t).then(function(t){s.loaded=!0,s.players=t.data},function(t){})},s.getPosition=function(t){return t.filter(function(t){return t.sport_id===s.sportId})[0]},s.updatePlayer=function(t,n){e.update(t,n).then(function(t){},function(t){})},s.removePlayer=function(t){t.team_id=null,s.updatePlayer(t.id,t)},s.showConfirm=function(t,e){var n=r.confirm().title("Would you like to Remove this player?").textContent(e.first_name+" "+e.last_name).ariaLabel("Position").targetEvent(t).ok("REMOVE").cancel("Cancel");r.show(n).then(function(){s.removePlayer(e)},function(){})},socket.on("draft.player:App\\Events\\DraftPlayer",function(e){s.getTeams(),i(e.player),t.$apply()})}])},function(t,e){sportsFest.controller("HomeController",["$scope","$http","Sport",function(t,e,n){var o=this;o.loaded=!1,n.get().then(function(t){o.sports=t.data,o.loaded=!0})}])},function(t,e){sportsFest.controller("IndexController",["$scope","$mdToast","$mdDialog","$log","$mdSidenav","$mdBottomSheet","$q","MenuItemsService","$mdMenu","$auth","$state","$window","Role",function(t,e,n,o,r,a,i,s,u,l,c,p,d){function f(){r("right").toggle()}function m(){var t=a.hide()||i.when(!0);t.then(function(){r("left").toggle()})}function h(t){v.toggleItemsList(),v.showSimpleToast(t.name)}function g(t){e.show(e.simple().content(t).hideDelay(1500).position("bottom right"))}function y(t){return s.isSectionSelected(t)}function P(t){s.toggleSelectSection(t)}var v=this;v.user,v.getRole=function(t){d.show(t).then(function(t){v.role=t.data})},v.logout=function(){r("right").toggle(),localStorage.removeItem("user"),l.logout(),c.go("home.home"),p.location.reload()},v.isAuthenticated=function(){return l.isAuthenticated()},t.setHome=function(){t.currentNavItem="home"},v.toggleRightSidebar=f,v.toggleItemsList=m,v.selectItem=h,v.showSimpleToast=g,v.menuItems=[],s.loadAllItems().then(function(t){v.menuItems=[].concat(t)}),v.isOpen=y,v.toggleOpen=P,v.autoFocusContent=!1,v.menu=s,v.status={isFirstOpen:!0,isFirstDisabled:!1}}])},function(t,e){sportsFest.service("MenuItemsService",["$q",function(t){var e=[{name:"Home",icon:"dashboard",sref:".home",show:!0},{name:"Draft",icon:"swap_vert",sref:".draft",show:!1},{name:"Players",icon:"person",sref:".players",show:!1}],n=[];n.push({name:"Settings",type:"toggle",pages:[{name:"Sports",state:"home.sports",type:"link",icon:"blur_circular"},{name:"Users",state:"home.users",type:"link",icon:"people"},{name:"Teams",state:"home.teams",type:"link",icon:"person_add"}]});var o;return o={sections:n,toggleSelectSection:function(t){o.openedSection=o.openedSection===t?null:t},isSectionSelected:function(t){return o.openedSection===t},loadAllItems:function(){return t.when(e)},loadAllSettings:function(){return t.when(n)}}}])},function(t,e){sportsFest.controller("PlayerController",["$scope","Player","Sport","Position",function(t,e,n,o){var r=this;r.sports,r.filteredPlayers,r.selectedSport,r.i=0,r.filteredPlayersId=[],r.loaded=!1,r.players,r.getAllPlayers=function(){e.get().then(function(t){r.players=t.data,r.loaded=!0})},r.getAllPlayers(),r.submit=function(t){e.store(t).success(function(t){}).error(function(t){})},r.getSports=function(){n.get().then(function(t){r.sports=t.data},function(t){})},r.getSport=function(t){return r.sports.filter(function(e){return e.id.toString()===t})},r.sportPlayers=function(t){r.loaded=!1,"all"==t?(r.loaded=!0,r.getAllPlayers()):n.players(t).then(function(t){r.players=t.data,r.sportPlayerList=t.data,r.loaded=!0})},r.positionPlayers=function(t){r.loaded=!1,"all"==t?(r.loaded=!0,r.players=r.sportPlayerList):o.players(t).then(function(t){r.players=t.data,r.loaded=!0})},r.sortFilteredPlayers=function(t){var e=[];for(i=0;i<r.filteredPlayers.length;i++)r.filteredPlayers[i].positions.filter(function(n){n.id.toString()===t&&e.push(r.filteredPlayers[i])});r.filteredPlayers=e},r.getPosition=function(t,e){return t.filter(function(t){return t.sport_id===e})},r.export=function(t){e.export(t).then(function(e){var n=angular.element("<a/>");n.css({display:"none"}),angular.element(document.body).append(n),n.attr({href:"data:attachment/"+t+";charset=utf-8,"+encodeURI(e.data),target:"_blank",download:"document."+t})[0].click(),n.remove()},function(t){})},socket.on("add.players:App\\Events\\AddPlayers",function(e){t.$apply(function(){r.players.unshift(e.data)})})}])},function(t,e){sportsFest.factory("Player",["$q","$http",function(t,e){return{get:function(){return e({method:"GET",url:"api/players"})},noTeamGet:function(){return e({method:"GET",url:"api/players/noteam"})},getPosition:function(e,n){var o=t.defer();return this.show(e).then(function(t){var e=!0,r=!1,a=void 0;try{for(var i,s=t.data.positions[Symbol.iterator]();!(e=(i=s.next()).done);e=!0){var u=i.value;if(u.sport_id===n){o.resolve(u);break}}}catch(t){r=!0,a=t}finally{try{!e&&s.return&&s.return()}finally{if(r)throw a}}}),o.promise},store:function(t){return e({method:"POST",url:"api/players",data:t,headers:{"Content-Type":"application/json"}})},show:function(t){return e.get("/api/players/"+t)},update:function(t,n){return e({method:"POST",url:"api/players/"+t,data:n,headers:{"Content-Type":"application/json"}})},destroy:function(t){return e.delete("/api/players/"+t)},export:function(t){return e({method:"GET",url:"/api/players/export/"+t,headers:{"Content-Type":"application/csv; charset=UTF-8"}})}}}])},function(t,e){sportsFest.factory("Position",["$q","$http",function(t,e){return{get:function(){return e({method:"GET",url:"api/positions"})},store:function(t){return e({method:"POST",url:"api/positions",data:t,headers:{"Content-Type":"application/json"}})},show:function(t){return e.get("/api/positions/"+t)},update:function(t,n){return e({method:"PUT",url:"api/positions/"+t,data:n,headers:{"Content-Type":"application/json"}})},destroy:function(t){return e({method:"DELETE",url:"api/positions/"+t})},players:function(t){return e.get("api/positions/"+t+"/players")}}}])},function(t,e){sportsFest.controller("SportController",["$scope","$mdDialog","Sport","Position",function(t,e,n,o){var r=this;r.sports,r.newPosition={},r.editable=!1,r.loaded=!1,r.submit=function(t){n.store(t).success(function(t){r.getSports(),r.upload(t.id)}).error(function(t){})},r.upload=function(e){var o=new FormData;o.append("file",t.files[0].lfFile),n.upload(o,e).then(function(t){},function(t){})},r.getSports=function(){n.get().then(function(t){r.sports=t.data,r.loaded=!0},function(t){})},r.delete=function(t){n.destroy(t).success(function(t){}).error(function(t){})},r.update=function(t,e){n.update(t,e).success(function(t){r.getSports()}).error(function(t){})},r.addPosition=function(t){r.newPosition.id=t,o.store(r.newPosition).success(function(t){r.getSports()}).error(function(t){})},r.deletePosition=function(t){o.destroy(t).success(function(t){r.getSports()}).error(function(t){})},r.addModalPosition=function(t,n){var o=e.prompt().title("Please write the name of the position").placeholder("Position name").ariaLabel("Position name").initialValue("name").targetEvent(t).ok("Save").cancel("Cancel");e.show(o).then(function(t){r.newPosition.name=t,r.addPosition(n)})},t.showConfirm=function(t){var n=e.confirm().title("Would you like to delete this position?").textContent('"position..."').ariaLabel("Position").targetEvent(t).ok("DELETE").cancel("Cancel");e.show(n).then(function(){},function(){})},socket.on("add.players:App\\Events\\AddPlayers",function(e){t.$apply(function(){r.sports.unshift(e.sport)})})}])},function(t,e){sportsFest.factory("Sport",["$q","$http",function(t,e){var n="api/sports";return{get:function(){return e({method:"GET",url:n})},store:function(t){return e({method:"POST",url:n,data:t,headers:{"Content-Type":"application/json"}})},show:function(t){return e({mehod:"GET",url:n+"/"+t})},update:function(t,o){return e({method:"PUT",url:n+"/"+t,data:o,headers:{"Content-Type":"application/json"}})},destroy:function(t){return e({method:"DELETE",url:n+"/"+t})},upload:function(t,o){return e.post(n+"/upload/"+o,t,{transformRequest:angular.identity,headers:{"Content-Type":void 0}})},players:function(t){return e.get("api/sports/"+t+"/players")},positions:function(t){return e.get("api/sports/"+t+"/positions")},getPlayers:function(t){return e.get(n+"/players/noteam/"+t)}}}])},function(t,e){sportsFest.controller("TeamController",["$http","User","Team","$state","$stateParams","$scope",function(t,e,n,o,r,a){var i=this;i.editable=!1,i.loaded=!1,i.addTeam=function(t){n.store(t).then(function(t){}).catch(function(t){})},i.getTeams=function(){n.get().then(function(t){i.teams=t.data,i.loaded=!0},function(t){})},i.getTeams(),socket.on("changed.team:App\\Events\\ChangedTeam",function(t){i.teams=t.data,i.getPocs(),a.$apply()}),i.getTeam=function(){n.show(r.id).then(function(t){i.data=t.data[0],i.getTeamPoc(t.data[0].user_id)}).catch(function(t){})},i.showTeam=function(t){o.go("home.teams_view",{id:t})},i.getPocs=function(){e.poc().then(function(t){i.poc=t.data})},i.getPocs(),i.getSports=function(){t({method:"GET",url:"api/sports"}).then(function(t){i.sports=t.data})},i.getSports(),i.getTeamPoc=function(t){e.show(t).then(function(t){i.data.poc=t.data}).catch(function(t){})}}])},function(t,e){sportsFest.factory("Team",["$q","$http",function(t,e){var n="api/teams";return{get:function(){return e({method:"GET",url:n})},show:function(t){return e({mehod:"GET",url:n+"/"+t})},store:function(t){return e({method:"POST",url:n,data:t,headers:{"Content-Type":"application/json"}})},update:function(t){return e({method:"UPDATE",url:n+"/"+t,data:data,headers:{"Content-Type":"application/json"}})},destroy:function(t){}}}])},function(t,e){sportsFest.factory("Role",["$q","$http",function(t,e){return{get:function(){return e({method:"GET",url:"api/roles"})},store:function(t){return e({method:"POST",url:"api/roles",data:t,headers:{"Content-Type":"application/json"}})},show:function(t){return e.get("/api/roles/"+t)},update:function(t,n){return e({method:"PUT",url:"api/roles/"+t,data:n,headers:{"Content-Type":"application/json"}})},destroy:function(t){return e({method:"DELETE",url:"api/roles/"+t})},getAdminId:function(){return e({method:"GET",url:"api/roles/admin"})}}}])},function(t,e){sportsFest.controller("UserController",["$scope","User","Role",function(t,e,n){var o=this;o.users,o.roles,o.loaded=!1,o.register=function(t){e.store(t).success(function(t){}).error(function(t){})},o.getUsers=function(){e.get().then(function(t){o.users=t.data,o.loaded=!0},function(t){})},o.getUsers(),o.getRoles=function(){n.get().then(function(t){o.roles=t.data},function(t){})}}])},function(t,e){sportsFest.factory("User",["$q","$http",function(t,e){var n="api/users";return{get:function(){return e({method:"GET",url:n})},show:function(t){return e({mehod:"GET",url:n+"/"+t})},store:function(t){return e({method:"POST",url:n,data:t,headers:{"Content-Type":"application/json"}})},update:function(t){return e({method:"UPDATE",url:n+"/"+t,data:data,headers:{"Content-Type":"application/json"}})},destroy:function(t){},poc:function(){return e({method:"GET",url:n+"/poc"})}}}])},function(t,e){var n=angular.module("Sportsfest",["ui.router","satellizer","ngMaterial","ngMessages","ngMdIcons","ui.router.title","lfNgMdFileInput","md.data.table"]);n.run(["$rootScope","$state","$stateParams","$auth","Role",function(t,e,n,o,r){t.$on("$stateChangeStart",function(n,a,i,s,u){t.isAuthenticated=function(){return o.isAuthenticated()},t.user=JSON.parse(localStorage.getItem("user")),t.isAdmin=function(){r.getAdminId().then(function(e){id=parseInt(e.data),t.access=t.user.role_id===id})},t.isAdmin(),t.routeName=a.url.substring(1);var l=a.data.requireLogin;l&&!o.isAuthenticated()?(e.go("login"),n.preventDefault()):!l&&o.isAuthenticated()&&"login"===a.name&&(n.preventDefault(),e.go("home.home"))})}]),n.filter("nospace",function(){return function(t){return t?t.replace(/ /g,""):""}}),n.filter("humanizeDoc",function(){return function(t){if(t)return"directive"===t.type?t.name.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()}):t.label||t.name}})},function(t,e){sportsFest.config(function(t,e,n,o,r,a,i){n.loginUrl="/api/authenticate",e.otherwise("/home"),t.state("home",{url:"",templateUrl:"../app/index/_main.html",controller:"IndexController",controllerAs:"vm",abstract:!0}).state("login",{url:"/login",templateUrl:"../app/auth/_login.html",controller:"AuthController as auth",data:{requireLogin:!1},resolve:{$title:function(){return"Login"}}}).state("home.users",{url:"/users",templateUrl:"../app/user/_sign-up.html",controller:"UserController as user",data:{requireLogin:!0},resolve:{$title:function(){return"Users"}}}).state("home.home",{url:"/home",templateUrl:"../app/home/_home.html",controller:"HomeController as home",data:{requireLogin:!1},resolve:{$title:function(){return"Home"}}}).state("home.players",{url:"/players",templateUrl:"../app/player/_player.html",controller:"PlayerController as player",data:{requireLogin:!0},resolve:{$title:function(){return"Players"}}}).state("home.draft",{url:"/draft",templateUrl:"../app/draft/_draft.html",controller:"DraftController as draft",data:{requireLogin:!0},resolve:{$title:function(){return"Draft"}}}).state("home.sports",{url:"/sports",templateUrl:"../app/sport/_sport.html",controller:"SportController as sport",data:{requireLogin:!0},resolve:{$title:function(){return"Sports"}}}).state("home.teams",{url:"/teams",templateUrl:"../app/team/_team.html",controller:"TeamController as team",data:{requireLogin:!0},resolve:{$title:function(){return"Teams"}}}).state("home.teams_view",{url:"/teams/:id",templateUrl:"../app/team/_view-team.html",controller:"TeamController as team",data:{requireLogin:!0}}).state("home.register",{url:"/register",templateUrl:"../app/player/_registration.html",controller:"PlayerController as player",data:{requireLogin:!1},resolve:{$title:function(){return"Register"}}}),i.theme("default").primaryPalette("grey",{default:"500"}).accentPalette("teal",{default:"500"}).warnPalette("defaultPrimary"),i.theme("dark","default").primaryPalette("defaultPrimary").dark(),i.theme("grey","default").primaryPalette("grey"),i.theme("custom","default").primaryPalette("defaultPrimary",{"hue-1":"50"}),i.definePalette("defaultPrimary",{50:"#FFFFFF",100:"rgb(255, 198, 197)",200:"#E75753",300:"#E75753",400:"#E75753",500:"#E75753",600:"#E75753",700:"#E75753",800:"#E75753",900:"#E75753",A100:"#E75753",A200:"#E75753",A400:"#E75753",A700:"#E75753"})})},function(t,e){sportsFest.directive("menuLink",function(){return{scope:{section:"="},templateUrl:"partials/menu-link.tmpl.html",link:function(t,e){var n=e.parent().controller();t.focusSection=function(){n.autoFocusContent=!0}}}})},function(t,e){sportsFest.directive("menuToggle",["$timeout",function(t){return{scope:{section:"="},templateUrl:"partials/menu-toggle.tmpl.html",link:function(t,e){var n=e.parent().controller();t.isOpen=function(){return n.isOpen(t.section)},t.toggle=function(){n.toggleOpen(t.section)};var o=e[0].parentNode.parentNode.parentNode;if(o.classList.contains("parent-list-item")){var r=o.querySelector("h2");e[0].firstChild.setAttribute("aria-describedby",r.id)}}}}])},function(t,e,n){n(0),n(1),n(2),n(3),n(4),n(5),n(6),n(7),n(8),n(9),n(10),n(11),n(13),n(12),n(14),n(15),n(16),n(18),n(17),n(19),t.exports=n(20)}]);