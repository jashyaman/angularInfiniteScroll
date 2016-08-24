/**
 * Created by shyam_000 on 7/8/2016.
 */

var app = angular.module('myApp', []);
var url_main_str = 'http://api.teosto.fi/2014/event?limit=25&page=';
var ctr = 1;


app.controller('MainController', function ($scope, $http) {

    $scope.tableData = [];
    url_main = function () {
       var url_final_str = "";
        url_final_str = url_main_str+ctr++;
      console.log("loading next 25 records")
      // console.log(url_final_str);
        return url_final_str;
    }

    $http({
        method: 'GET',
        'url': url_main()
    }).then(function (result) {

        var tempArr = result.data.events;
       // console.log(tempArr)
        var len = tempArr.length;
        for(var i = 0;i<len;i++) {
            $scope.tableData.push(tempArr[i]);
        }
        //console.log($scope.tableData);
       document.getElementById("mainDiv").style.visibility = 'visible';
    });

    $scope.loadmore = function () {
        $http({
            method: 'GET',
            'url': url_main()
        }).then(function (result) {

            var tempArr = result.data.events;

            var len = tempArr.length;
            for(var i = 0;i<len;i++) {
                $scope.tableData.push(tempArr[i]);
            }

            //console.log($scope.tableData);
        });
    };

});
//http://stackoverflow.com/questions/17450861/add-scroll-bar-to-table-body
//http://stackoverflow.com/questions/29954799/angularjs-how-to-trigger-event-when-scroll-reaches-to-the-bottom-of-the-scroll
//http://jsfiddle.net/qwtaq5o8/180/
app.directive('scrollDirective',function () {
  return {
      
      link: function (scope,elem,attrs) {
          var raw = elem[0];
       //   console.log("loading directive");
          //console.log(elem);


          elem.bind('scroll',function () {
              console.log('in scroll');
          //    console.log(raw.offsetHeight+raw.scrollTop);
            //  console.log(raw.scrollTop);
              //console.log(raw.scrollHeight);
              if ((raw.scrollTop+raw.offsetHeight) > raw.scrollHeight) {
                //  console.log("I am at the bottom");
                  //console.log(raw.scrollTop + raw.offsetHeight);
                  //console.log(raw.scrollHeight);
              scope.$apply(attrs.scrollDirective);
              }
          })
      }

  }
});

/*
 Things to do -
 1. get some open api request that returns json results.    DONE
 2. push the json result into a scope variable fetching the data using an ajax call. DONE
 3. use the json result to split the data into several parts 50 at a time. X
 4. load 10 data records at a time. X
 5. attach a scroll functionality to the div/ directive that displays the data DONE
 6. upon reaching the end of the scroll, reload another 50 data records into the table < no idea how to do.
 */

// http://api.teosto.fi/2014/event?limit=20

/*
get a variable with data,
load it on the table,

 */