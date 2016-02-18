(function() {
  'use strict';

  function DataService($q, $http, $timeout, Messagebus) { //, AuthenticationService) {
    this.backendURL = 'http://localhost:5000';

    this.exampleQuery = '/records/original/0/100';
    this.suggestionsPath = '/suggestions';

    this.currentTopOfStack = {};
    this.lastMainScreenInteraction = {};

    var deferred = $q.defer();
    this.ready = deferred.promise;

    this.init = function() {
      $timeout(this.getData,10);
    };

    this.getData = function() {
      Messagebus.publish('dataUpdate',$http.get(encodeURI(this.backendURL + this.exampleQuery)));
    }.bind(this);

    this.getSuggestions = function(topOfStack,mainScreenInteraction) {
      Messagebus.publish('blockSuggestions',$http.post(encodeURI(this.backendURL + this.suggestionsPath)),
        {
          'topOfStack': topOfStack,
          'mainScreenInteraction': mainScreenInteraction
        });
    }.bind(this);

    Messagebus.subscribe('mainScreenInteraction',function(event,interactionSpec) {
      this.lastMainScreenInteraction = interactionSpec;
      this.getSuggestions(this.currentTopOfStack,interactionSpec);
    }.bind(this));
    
    Messagebus.subscribe('topOfStack',function(event,block) {
      this.currentTopOfStack = block;
      this.getSuggestions(this.currentTopOfStack,this.lastMainScreenInteraction);
    }.bind(this));

  }

  angular.module('rigApp.dataService')
    .service('DataService', DataService);
})();
