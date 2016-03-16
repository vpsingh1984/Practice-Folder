app = angular.module("myapp", []);

app.controller("myCtrl", ["$scope", function($scope){
   $scope.student = {
      firstName:'Vijay',
      lastName: 'Singh',

      fullName: function(){
         var studentName;
         studentName = $scope.student;
         return studentName.firstName+ ' '+studentName.lastName;
      },
   }

   function save(){
      console.log("Data Saved");
   }

}]);