// Code.gs

function sendResponse(e) {
  var data = {
    form: {
      id: e.source.getId(),
      title: e.source.getTitle() ? e.source.getTitle() : "Untitled Form",
      is_private: e.source.requiresLogin(),
      is_published: e.source.isAcceptingResponses(),
    },
    response: {
      id: e.response.getId(),
      email: e.response.getRespondentEmail(),
      timestamp: e.response.getTimestamp(),
      data: e.response
        .getItemResponses()
        .map(function (y) {
          return {
            question: y.getItem().getTitle(),
            answer: y.getResponse(),
          };
        }, this),
    },
  };

  var options = {
    method: "post",
    payload: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    headers: {
      "Authorization": "Bearer " + process.env.SUBMIT_FORM_TOKEN
    }
  };

  UrlFetchApp.fetch(process.env.WEBSITE_URL + "/api/user/form", options);
}
