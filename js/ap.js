var Application = {
  initApplication: function () {
    $(window).load('pageinit', '#page-one', function () {
      Application.initShowClub();
    })
    $(document).on('click', '#jenis-pertandingan', function () {
      var idclub = $(this).data('idclub');
      Application.initShowJenis(idclub);
    })
    $(document).on('click', '#weekhome', function () {
      var idclub = $(this).data('idclub');
      Application.initShowWeekHome(idclub);
    })
    $(document).on('click', '#weekaway', function () {
      var idclub = $(this).data('idclub');
      Application.initShowWeekAway(idclub);
    })
    $(document).on('click', '#detailpertandinganhome', function () {
      var idclub = $(this).data('idclub');
      var week = $(this).data('week');
      Application.initShowDetailPertandinganHome(idclub, week);
    })
    $(document).on('click', '#detailpertandinganaway', function () {
      var idclub = $(this).data('idclub');
      var week = $(this).data('week');
      Application.initShowDetailPertandinganAway(idclub, week);
    })
  },
  initShowClub: function () {
    $.ajax({
      url: 'https://api.myjson.com/bins/1dei6u',
      type: 'get',
      beforeSend: function () {
        $.mobile.loading('show', {
          text: 'Please wait while retrieving data...',
          textVisible: true
        });
      },
      success: function (dataObject) {
        for (var i = 0; i < dataObject.length; i++) {
          var appendList = '<li id="klub"><a href="#page-two"?id='+dataObject[i].id +
          '"target="_self" id="jenis-pertandingan" data-idclub="' + dataObject[i].id +
          '"><img class="logoclub" src="images/' + dataObject[i].logo + '" align="middle"><h2 class="style">' + dataObject[i].nama + '</h2></a></li>'
          $('#list-club').append(appendList);
        }
        $('#list-club').listview('refresh');
      },
      complete: function () {
        $.mobile.loading('hide');
      }
    });
  },
  initShowJenis: function (idclub) {
    $.ajax({
      url: 'https://api.myjson.com/bins/1dei6u',
      type: 'get',
      beforeSend: function () {
        $.mobile.loading('show', {
          text: 'Please wait while retrieving data...',
          textVisible: true
        });
      },
      success: function (dataObject) {
        $('#p-nama').empty();
        $('#p-logo').empty();
        for (var i = 0; i < dataObject.length; i++) {
          if (dataObject[i].id == idclub) {
            $('#p-nama').append(dataObject[i].nama);
            $('#p-logo').append('<img class="logoclubheader" src="images/' + dataObject[i].logo + '" align="middle">');
          }
        }
        $('#list-jenis').empty();
        var appendList = '<li id="jenismatch"><a href="#page-threehome" "target="_self" id="weekhome" data-idclub="'+idclub+'"><h2 align="center" class="style">Home</h2></a></li>'
        $('#list-jenis').append(appendList);
        var appendList = '<li id="jenismatch"><a href="#page-threeaway" "target="_self" id="weekaway" data-idclub="'+idclub+'"><h2 align="center" class="style">Away</h2></a></li>'
        $('#list-jenis').append(appendList);
        $('#list-jenis').listview('refresh');
      },
      complete: function () {
        $.mobile.loading('hide');
      }
    });
  },
  initShowWeekHome: function (idclub) {       
    $.ajax({           
      url: 'http://localhost:8080/projekppk/jadwal.php',           
      type: 'get',           
      beforeSend : function() {
        $.mobile.loading('show', {
          text:'Please wait while retrieving data...',
          textVisible : true
        });
      },
      success: function (dataObject) {
        for (var i = 0; i < 380; i++) {
          if (dataObject[i].home == idclub) {
            var appendList = '<li id="week"><a href="#page-four" "target="_self" id="detailpertandinganhome" data-idclub="'+idclub+'" data-week="'+dataObject[i].week+'"><h2 >Gameweek - '+dataObject[i].week+'</h2></a></li>'
            $('#list-weekhome').append(appendList);
          }
        }
        $('#list-weekhome').listview('refresh');
      },
      complete: function () {
        $.mobile.loading('hide');
      }
    });
    $('#list-weekhome').empty();
  },
  initShowWeekAway: function (idclub) {   
   $.ajax({          
    url: 'http://localhost:8080/projekppk/jadwal.php', 
    type: 'get',          
    beforeSend : function() {
      $.mobile.loading('show', {
        text:'Please wait while retrieving data...',
        textVisible : true
      });
    },
    success: function (dataObject) {
      for (var i = 0; i < 380; i++) {
        if (dataObject[i].away == idclub) {
          var appendList = '<li id="week"><a href="#page-fouraway" "target="_self" id="detailpertandinganaway" data-idclub="'+idclub+'" data-week="'+dataObject[i].week+'"><h2 class="style">Gameweek - '+dataObject[i].week+'</h2></a></li>'
          $('#list-weekaway').append(appendList);
        }
      }
      $('#list-weekaway').listview('refresh');
    },
    complete: function () {
      $.mobile.loading('hide');
    }
  });
   $('#list-weekaway').empty();
 },
 initShowDetailPertandinganHome: function (idclub, week) {
  $.ajax({
    url: 'http://localhost:8080/projekppk/jadwal.php',
    type: 'get',
    beforeSend : function() {
      $.mobile.loading('show', {
        text:'Please wait while retrieving data...',
        textVisible : true
      });
    },
    success: function (dataObject) {
      $.ajax({
        url: 'https://api.myjson.com/bins/1dei6u',
        type: 'get',
        success: function (dataObject2) {
          $('#list-detailpertandinganhome').empty();
          for (var i = 0; i < dataObject.length; i++) {
            if (dataObject[i].week == week) {
              if (dataObject[i].home == idclub) {
                var appendList = '<p>VS</p><h1>'+dataObject2[(dataObject[i].away-1)].nama+'</h2><p><b>Gameweek -'+week+'</b></p><p><b>'+dataObject[i].date+'</b></p>'
                $('#list-detailpertandinganhome').append(appendList);
              }
            }
          }
          $('#list-detailpertandinganhome').listview('refresh');
        },
      });
    },
    complete: function () {
      $.mobile.loading('hide');
    }
  });
},
initShowDetailPertandinganAway: function (idclub, week) {
  $.ajax({
    url: 'http://localhost:8080/projekppk/jadwal.php',
    type: 'get',
    beforeSend : function() {
      $.mobile.loading('show', {
        text:'Please wait while retrieving data...',
        textVisible : true
      });
    },
    success: function (dataObject) {
      $.ajax({
        url: 'https://api.myjson.com/bins/1dei6u',
        type: 'get',
        success: function (dataObject2) {
          $('#list-detailpertandinganaway').empty();
          for (var i = 0; i < dataObject.length; i++) {
            if (dataObject[i].week == week) {
              if (dataObject[i].away == idclub) {
                var appendList = '<p>VS</p><h1>'+dataObject2[(dataObject[i].home-1)].nama+'</h2><p><b>Gameweek -'+week+'</b></p><p><b>'+dataObject[i].date+'</b></p>'
                $('#list-detailpertandinganaway').append(appendList);
              }
            }
          }
          $('#list-detailpertandinganaway').listview('refresh');
        },
      });
    },
    complete: function () {
      $.mobile.loading('hide');
    }
  });
}
}