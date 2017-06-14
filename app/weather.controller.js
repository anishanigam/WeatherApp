(function() {
    'use strict';

    angular
      .module('app')
      .controller('weatherController', weatherController);

    weatherController.$inject = ['weatherFactory', 'toastr'];

    /* @ngInject */
    function weatherController(weatherFactory, toastr) {
      var vm = this;
      vm.searchTerm = '';
      let searchTerm = vm.searchTerm;
      vm.searched = []; // Previus searches array
      vm.date = Date.now(); // Time stamp


      ////////////


      vm.searchForWeather = function(searchTerm) {
        weatherFactory
          .searchForWeather(searchTerm)
          .then(function(response)
          {
            if (response.status == 200) { // Toastr alerts
              weatherData(response.data);
              toastr.success("Weather Found");
            } else {
              toastr.info("Incorrect Data Found");
            }
          }, function(error) {
            toastr.error("Invalid City");
          });
      };

      function weatherData(detailedResults) { // Weather data specifics
        vm.detailedResults = {
          cityName: detailedResults.name,
          mainWeather: detailedResults.weather.main,
          mainWeatherIcon: detailedResults.weather.icon,
          temp: detailedResults.main.temp,
          pressure: detailedResults.main.pressure,
          humidity: detailedResults.main.humidity,
          tempMin: detailedResults.main.temp_min,
          tempMax: detailedResults.main.temp_max,
          windSpeed: detailedResults.wind.speed,
        }
        // Pushes results into a recent searches array
        vm.searched.push(detailedResults.name)

      }
  }



})();
