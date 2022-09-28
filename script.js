var qanda = [];

var assignment_id = window.location.href.split("/")[4];
var url1 = "https://edpuzzle.com/api/v3/assignments/"+assignment_id;

var request1 = new XMLHttpRequest();
request1.open("GET", url1, false);
request1.send();
var assignment = JSON.parse(request1.responseText);

var media_id = assignment.teacherAssignments[0].contentId;
var classroom_id = assignment.teacherAssignments[0].classroom.id;
var url2 = "https://edpuzzle.com/api/v3/assignments/classrooms/"+classroom_id+"/students/";

var request2 = new XMLHttpRequest();
request2.open("GET", url2, false);
request2.send();
var classroom = JSON.parse(request2.responseText);
var media;

for (let i=0; i<classroom.medias.length; i++) {
  media = classroom.medias[i];
  if (media._id == media_id) {
    break;
  }
  if (i == classroom.medias.length-1) {
    media = null;
  }
}

if (media == null) {
  alert("Could not get the media for this assignment.");
}
else {
  var questions = media.questions;
  var date = new Date(media.createdAt);
  thumbnail = media.thumbnailURL;
  if (thumbnail.startsWith("/")) {
    thumbnail = "https://"+window.location.hostname+thumbnail;
  }
  var question;

  for (let i=0; i<questions.length; i++) {
    for (let j=0; j<questions.length-i-1; j++) {
      if(questions[j].time > questions[j+1].time){
       let question_old = questions[j];
       questions[j] = questions[j + 1];
       questions[j+1] = question_old;
     }
    }
  }
  
  for (let i=0; i<questions.length; i++) {
    question = questions[i];
    
    if (typeof question.choices != "undefined") {
      let question_content;
      if (question.body[0].text != "") {
        question_content = `<p>${question.body[0].text}</p>`;
      }
      else {
        question_content = question.body[0].html;
      }
      for (let j=0; j<question.choices.length; j++) {
        let choice = question.choices[j];
        if (typeof choice.body != "undefined") {
          let item_html;
          if (choice.body[0].text != "") {
            item_html = `<p>${choice.body[0].text}</p>`;
          }
          else {
            item_html = `${choice.body[0].html}`;
          }
          if (choice.isCorrect == true) {
            qanda.push([question_content, item_html])
            //console.log(qanda);
          }
        }
      }
    }
  }
}
    question = document.getElementsByClassName('REgT153wHl kvVVRmoyRB NVoSF83SAC yAeLu8JD9d duNyBf_CZP wvf8Cowmtr')[0].innerHTML;
    answers = document.getElementsByClassName('I2QcFnn2MS');
    console.log(answers);
    (qanda).forEach(element => {
        if(question == element[0])
        {
            //console.log(element[1])
            for (let i = 0; i < answers.length; i++) {
                console.log(answers[i]);
                if(answers[i].children[1].children[0].children[0].innerHTML == element[1])
                {
                    //document.getElementsByClassName('I2QcFnn2MS')[0].children[0].children[0].children[0].click()
                    answers[i].children[0].children[0].children[0].click();
                }
            }
        }
}, 1000);
