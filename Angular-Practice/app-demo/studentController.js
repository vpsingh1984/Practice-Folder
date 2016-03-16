mainApp.controller("studentController", function($http, $scope) {
   
   result();

   $scope.reset = function(){
         $scope.firstName = "Mahesh";
         $scope.lastName = "Parashar";
         $scope.email = "MaheshParashar@tutorialspoint.com";
      }   
      
      $scope.reset();
   $scope.clickme = function(){
      alert("Hello Vijay");
    }

    function result(){
      $http.get("http://www.w3schools.com/angular/customers.php").success(function(response){
         $scope.customers = response;
      })
    }


});