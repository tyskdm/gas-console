
module.exports = function (e) {
  if (typeof e !== 'object') return null;

  if (typeof e.queryString !== 'undefined') {
    return doGet(e);
  }
  if (typeof e.parameter !== 'undefined') {
    if (e.parameter.eventType) {
      return selectTab(e);
    } else {
      return doTimer(e);
    }
  }
  return null;
};


function doGet(e) {
  var app = UiApp.createApplication().setTitle("GAS-Console");
  {
    var panel = app.createVerticalPanel().setSize("100%","100%");
    {
      var label = app.createHTML('<span style="font-size: 160%">GAS Console v0.0.1</span>')
      .setStyleAttributes({'padding-left': "10", 'padding-top': "8"});
      panel.add(label).setCellHeight(label, "40");

      var tabBar = app.createDecoratedTabBar().setSize("100%", "24");
      tabBar.addTab("console").addTab("Logger")
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

      tabBar.addSelectionHandler(
        app.createServerHandler("doGet")
        .addCallbackElement(jasmineScrollPanel)
        .addCallbackElement(loggerScrollPanel)
      );
    }
    app.add(panel);
  }

  doTimer();

  return app;
}


/**
 * Timer-handler, select TabPanel.
 */
function doTimer(eventInfo) {
  var app = UiApp.getActiveApplication(),
      jasmineLog = app.getElementById("jasmineLog"),
      loggerLog = app.getElementById("loggerLog"),
      timeStamp = app.getElementById("timeStamp"),
      log = "";

  var buff = new (require('./databuffer'))();

  var content = buff.read();
  content = (content === null) ? '' : content;
  jasmineLog.setHTML('<tt>' + content + '</tt>');

  log = Logger.getLog().replace(/\n/g, "<br />") || "<< Logger.getLog() empty. >>";
  Logger.clear();
  loggerLog.setHTML(log);

  timeStamp.setHTML(Utilities.formatDate(new Date(), "JST", "yyyy.MM.dd HH:mm:ss"));

  app.addTimer(app.createServerHandler("doGet") , 200);

  return app;
}


/**
 * UI-handler, select TabPanel.
 */
function selectTab(eventInfo) {
  var databuffer = require('./databuffer');

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
