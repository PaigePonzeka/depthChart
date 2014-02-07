$(document).ready(function(){
  var depthChart = [];
  generateRoster();
  generateDepthChart();



  function generateRoster(){
    var source   = $('#roster-template').html();
    var template = Handlebars.compile(source);
    var html = template(players);
    $('.js-roster-container').append(html);
  }

  function generateDepthChart() {
     depthChart["bench"] = [];
    $.each(players.players, function(){
      var player = this;

      $.each(this.positions, function(){
        var currentPosition = '' + this;
        // intialize the position if it hasn't been intialized yet
        if(depthChart[currentPosition] == undefined) {
          depthChart[currentPosition] = [];
        }
        depthChart[currentPosition].push(player.name); 

      });
        depthChart["bench"].push(player.name); 

    });
      appendDepthChart();
  }

  function appendDepthChart(){
    var depthChartObject = [];
    $.each(positions, function(){

      var position = "" + this;
      var positionObj = {name: position, players: depthChart[position]}; 
      depthChartObject.push(positionObj);
    });

    var source   = $('#depth-chart-template').html();
    var template = Handlebars.compile(source);
    var html = template({positions : depthChartObject});
    $('.js-depth-chart-container').append(html);
  }
});

$('.js-depth-chart-container').on( {
    mouseenter: function () {
      console.log("here");
      var playerClass = $(this).data('playernameclass');
      console.log(playerClass);
      $('.' + playerClass).addClass('active-player');
    },
    mouseleave: function () {
      var playerClass = $(this).data('playernameclass');
      $('.' + playerClass).removeClass('active-player');
    }
}, '.js-player');

Handlebars.registerHelper('replaceSpaces', function(text) {
    text = text.replace(/\s/g, '-');
    return new Handlebars.SafeString(text);
});