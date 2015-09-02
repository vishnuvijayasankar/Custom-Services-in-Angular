var recordCtrlApp = angular.module('RecordCtrlApp', []);

// Two Custom Services

// 1. Style service
recordCtrlApp.service('StyleService', function() {
    this.StartupCss = function () {
        $("li").click(function(){
            $("li").css('background-color', 'white');
            $("li").css('color','black');
            $(this).css('background-color', 'rgb(247, 7, 25)');
            $(this).css('color', 'white');
        });
        $("#add_data_btn").click(function(){
            $("footer").css('position', 'relative');
        });
        $("#list_data_btn").click(function(){
            $("footer").css('position', 'fixed');
        });
        $(".edit_btn").click(function(){
            $("footer").css('position', 'relative');
        });
    }
    this.footerStyle = function () {
        $("footer").css('position', 'fixed');
        $("#add_data_btn").css('background-color', 'white');
        $("#add_data_btn").css('color', 'black');
        }
});

// 2. CRUD service
recordCtrlApp.service('CRUDService', function(StyleService) {
    this.Adds = function (records) {
        // Do nothing if no state is entered (blank)
        if (!records.newState)
            return;
        // Add to main records
        records.push({
            state: records.newState,
            price: records.newPrice,
            tax: records.newTax,
            include: false
        });
        // one service called inside another
        StyleService.footerStyle();
    }
    // Delete data
    this.Deletes = function (records,index,history) {
        // Remove first / oldest element from history if it reaches maximum capacity of 10 records
        if (history.length === 10)
            history.shift();
        // Add deleted record to historical records
        history.push(records[index]);
        // Remove from main records (using index)
        records.splice(index, 1);
    };
    this.Undos = function (records,history) {
            // Add last / most recent historical record to the main records
            records.push(history[history.length - 1 ]);
            // Remove last / most recent historical record
            history.pop();
    }
    this.Edits = function (that,records,index,history) {
            records.newState = that.record.state;
            records.newPrice = that.record.price;
            records.newTax = that.record.tax; 
    }
    this.Updates = function (key,records) {
            records[key].state = records.newState;
            records[key].price = records.newPrice;
            records[key].tax = records.newTax;
    }
});

// Custom Directive to load a new page
// recordCtrlApp.directive('addData', function() {
//   return{ templateUrl: 'add_data.html'}
//   });

// Custom Directive to load a new page using tags
recordCtrlApp.directive('addData', function() {
  return {
        restrict: 'E',
        templateUrl: 'add_data.html'
     };
  });

  
// Custom Directive for draggable box
recordCtrlApp.directive('myDraggable', ['$document', function($document) {
    return {
      link: function(scope, element, attr) {
        var startX = 0, startY = 0, x = 0, y = 0;

        element.css({
         position: 'relative',
         cursor: 'pointer'
        });

        element.on('mousedown', function(event) {
          // Prevent default dragging of selected content
          event.preventDefault();
          startX = event.pageX - x;
          startY = event.pageY - y;
          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);
        });

        function mousemove(event) {
          y = event.pageY - startY;
          x = event.pageX - startX;
          element.css({
            top: y + 'px',
            left:  x + 'px'
          });
        }

        function mouseup() {
          $document.off('mousemove', mousemove);
          $document.off('mouseup', mouseup);
        }
      }
    };
}]);

// Controller
recordCtrlApp.controller('RecordCtrl', function($scope,$http,StyleService,CRUDService) {
        StyleService.StartupCss();
        // Historical data
        $scope.history = [];
        $scope.tab = false;
        $scope.edit = false;
        var key;

        // default data loaded from json
        $http.get('angular.json').success(function(data){
            $scope.records = $scope.records || data;
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

