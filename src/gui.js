
module.exports.doGet = function (e) {
  var app = UiApp.createApplication().setTitle("GAS-Console");
  {
    var panel = app.createVerticalPanel().setSize("100%","100%");
    {
      var label = app.createHTML('<span style="font-size: 160%">GAS Console</span>')
      .setStyleAttributes({'padding-left': "10", 'padding-top': "8"});
      panel.add(label).setCellHeight(label, "40");

      var tabBar = app.createDecoratedTabBar().setSize("100%", "24");
      tabBar.addTab("jasmine").addTab("Logger")
      .selectTab(0);
      panel.add(tabBar).setCellHeight(tabBar, "24");

      var timeStamp = app.createHTML(Utilities.formatDate(new Date(), "JST", "yyyy.MM.dd HH:mm:ss")).setId("timeStamp")
      .setStyleAttributes({background:"#92c1f0", color: "white", 'text-align': "right", 'padding-right': "8"}).setWidth("100%-8");
      panel.add(timeStamp).setCellHeight(timeStamp, "3");

      var deckPanel = app.createAbsolutePanel().setSize("100%", "100%");
      {
        var jasmineScrollPanel = app.createScrollPanel().setSize("100%", "100%").setId("jasmineScrollPanel");
        {
          var jasmineLog = app.createHTML("--- jasmineLog ---").setId("jasmineLog")
          .setStyleAttributes({'padding-left': "8", 'padding-right': "8", 'padding-top': "4"})
          .setSize("100%-16","100%-4").setWordWrap(true);
          jasmineScrollPanel.add(jasmineLog);
        }
        deckPanel.add(jasmineScrollPanel, 0, 0);

        var loggerScrollPanel = app.createScrollPanel().setSize("100%", "100%").setId("loggerScrollPanel")
        .setVisible(false);
        {
          var loggerLog = app.createHTML("--- Logger.getLog() ---").setId("loggerLog")
          .setStyleAttributes({'padding-left': "8", 'padding-right': "8", 'padding-top': "4"})
          .setSize("100%-16","100%-4").setWordWrap(true);
          loggerScrollPanel.add(loggerLog);
        }
        deckPanel.add(loggerScrollPanel, 0, 0);


      }
      panel.add(deckPanel);

      //var horizontalPanel = app.createHorizontalPanel().setSize("100%", "100%")
      //.setStyleAttributes({'background': "#e0e0e0"});
      //{
      //  horizontalPanel.add(app.createLabel("jasmine.version_ : " + jasmine.version_.major + '.' + jasmine.version_.minor + '.' + jasmine.version_.build)
      //  .setStyleAttributes({'text-align': "center", 'padding-left': "8", 'padding-top': "10"}));
      //
      //  var handler = app.createServerHandler("rajah.executeByButton")
      //  .addCallbackElement(jasmineLog)
      //  .addCallbackElement(loggerLog)
      //  .addCallbackElement(timeStamp);
      //
      //  var b = app.createButton("Execute jasmine", handler).setSize("94%", "30");
      //  horizontalPanel.add(b);
      //}
      //panel.add(horizontalPanel).setCellHeight(horizontalPanel, 38)

      tabBar.addSelectionHandler(
        app.createServerHandler("_selectTab")
        .addCallbackElement(jasmineScrollPanel)
        .addCallbackElement(loggerScrollPanel)
      );

    }
    app.add(panel);
  }

  return module.exports._doTimer();
};


/**
 * Timer-handler, select TabPanel.
 */
module.exports._doTimer = function (eventInfo) {
  var app = UiApp.getActiveApplication(),
      jasmineLog = app.getElementById("jasmineLog"),
      loggerLog = app.getElementById("loggerLog"),
      timeStamp = app.getElementById("timeStamp"),
      log = "";

  var buff = new (require('./databuffer'))();

  jasmineLog.setHTML(buff.read());
  log = Logger.getLog().replace(/\n/g, "<br />") || "<< Logger.getLog() empty. >>";
  Logger.clear();
  loggerLog.setHTML(log);
  timeStamp.setHTML(Utilities.formatDate(new Date(), "JST", "yyyy.MM.dd HH:mm:ss"));

  app.addTimer(app.createServerHandler("_doTimer") , 200);

  return app;
};


var databuffer = require('./databuffer');
/**
 * UI-handler, select TabPanel.
 */
module.exports._selectTab = function (eventInfo) {
  var app = UiApp.getActiveApplication(),
      jasmineScrollPanel = app.getElementById("jasmineScrollPanel"),
      loggerScrollPanel = app.getElementById("loggerScrollPanel");

  switch (eventInfo.parameter[eventInfo.parameter.source]) {
    case "0":
      jasmineScrollPanel.setVisible(true);
      loggerScrollPanel.setVisible(false);
      break;
    case "1":
      jasmineScrollPanel.setVisible(false);
      loggerScrollPanel.setVisible(true);
      break;
    default:
      break;
  }

  return app;
};




/*

function doGet(e) {

  var app = UiApp.createApplication();



  app.add(app.createLabel(new Date()).setId("label"));



  app.addTimer(app.createServerHandler("update") , 1000);



  return app;

}

function update(e){

  var app = UiApp.getActiveApplication();

  app.getElementById("label").setText(new Date());

  app.addTimer(app.createServerHandler("update") , 1000);

  return app;

}


*/
