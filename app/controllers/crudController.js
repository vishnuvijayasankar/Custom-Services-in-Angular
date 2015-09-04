// Controller
recordCtrlApp.controller('RecordCtrl', function($scope,$http,StyleService,CRUDService) {
        StyleService.StartupCss();
        // Historical data
        $scope.history = [];
        $scope.tab = false;
        $scope.edit = false;
        var key;

        // default data loaded from json
        $http.get('assets/angular.json').success(function(data){
            $scope.records = data;
        });
       
        // Reset new data model
        $scope.Reset = function () {
            $scope.newState = '';
            $scope.newPrice = '';
            $scope.newTax = '';
        }
        $scope.Reset();

        $scope.Add = function () { 
            // calling service
            CRUDService.Adds($scope.records);
            $scope.Reset();
            $scope.tab = false;
        };
        $scope.Delete = function (index) { 
            // calling service
            CRUDService.Deletes($scope.records,index,$scope.history);
        };
        // Undo action (delete)
        $scope.Undo = function () { 
            // calling service
            CRUDService.Undos($scope.records,$scope.history);
        };
        $scope.Edit = function (index) { 
            $scope.tab = true;
            $scope.edit = true;
            key=index;
            // calling service
            CRUDService.Edits(this,$scope.records,index,$scope.history);
        };
        $scope.Update = function () {
            $scope.edit = false;
            // calling service
            CRUDService.Updates(key,$scope.records);
            $scope.Reset();
            $scope.tab = false;
        }
        // Show and Hide functions
        $scope.Show = function () {
            $scope.tab = true;
            $scope.edit = false;
            $scope.records.newState = '';
            $scope.records.newPrice = '';
            $scope.records.newTax = '';
        }
        $scope.Hide = function () {
            $scope.tab = false;
            $scope.edit = false;
            $scope.records.newState = '';
            $scope.records.newPrice = '';
            $scope.records.newTax = '';
        }
  });