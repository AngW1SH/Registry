// Code.gs

function sendResponse(e) {
  var data = {
    "form": {
      "id": e.source.getId(),
      "title": e.source.getTitle() ? e.source.getTitle() : "Untitled Form",
      "is_private": e.source.requiresLogin(),
      "is_published": e.source.isAcceptingResponses(),
    },
    "response": {
      "id": e.response.getId(),
      "email": e.response.getRespondentEmail(),
      "timestamp": e.response.getTimestamp(),
      "data": e.response.getItemResponses().map(function (y) {
        if (y.getItem().getType() == "GRID") {
          return {
            type: "GRID",
            question: y.getItem().getTitle(),
            rows: y.getItem().asGridItem().getRows(),
            answers: y.getResponse()
          }
        }
        return {
          type: "DEFAULT",
          question: y.getItem().getTitle(),
          answer: y.getResponse()
        }
      }, this),
    },
    "test": e.response.getItemResponses()
  };

  var options = {
    method: "POST",
    payload: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    headers: {
      "Authorization": "Bearer " + process.env.SUBMIT_FORM_TOKEN
    }
  };

  UrlFetchApp.fetch("https://angdl.ru/api/user/form", options);
};