// $(document).ready(function(){
//     alert('we care')
// });
// var head= $('nav');
// head.css({color:'black'});
function ws_fly(c, a, b) {
  var e = jQuery;
  var f = e(this);
  var h = {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    transform: "translate3d(0,0,0)",
  };
  var d = b.find(".ws_list");
  var g = e("<div>")
    .addClass("ws_effect ws_fly")
    .css(h)
    .css({ overflow: "visible" })
    .appendTo(b);
  this.go = function (p, m, l) {
    if (l == undefined) {
      l = !!c.revers;
    } else {
      l = !l;
    }
    var k = -(c.distance || g.width() / 4),
      n = Math.min(
        -k,
        Math.max(0, e(window).width() - g.offset().left - g.width())
      ),
      i = l ? n : k,
      q = l ? k : n;
    var j = e(a.get(m));
    j = { width: j.width(), height: j.height() };
    var r = e("<div>")
      .css(h)
      .css({ "z-index": 1, overflow: "hidden" })
      .html(e(a.get(m)).clone().css(j))
      .appendTo(g);
    var o = e("<div>")
      .css(h)
      .css({ "z-index": 3, overflow: "hidden" })
      .html(e(a.get(p)).clone().css(j))
      .appendTo(g)
      .show();
    wowAnimate(o, { opacity: 0 }, { opacity: 1 }, c.duration);
    wowAnimate(o, { left: i }, { left: 0 }, (2 * c.duration) / 3);
    d.hide();
    wowAnimate(
      r,
      { left: 0, opacity: 1 },
      { left: q, opacity: 0 },
      (2 * c.duration) / 3,
      c.duration / 3,
      function () {
        r.remove();
        f.trigger("effectEnd");
        o.remove();
      }
    );
  };
}

//jQuery("#wowslider-container1").wowSlider({effect:"fly",prev:"",next:"",duration:20*100,delay:20*100,width:640,height:360,autoPlay:true,autoPlayVideo:false,playPause:false,stopOnHover:false,loop:false,bullets:0,caption:false,captionEffect:"parallax",controls:false,controlsThumb:false,responsive:2,fullScreen:false,gestures:1,onBeforeStep:0,images:0});
//Trip form
var userName = document.getElementById("userName");
var Email = document.getElementById("email");
var Age = document.getElementById("age");
var Course = document.getElementById("course");
var Description = document.getElementById("discription");
var male = document.getElementById("male");
var female = document.getElementById("female");
var other = document.getElementById("other");
var Gender;
var modal = document.querySelector(".modal");
var btnClose = document.getElementById("close");
//btnClose.addEventListener('click',close);

class Surveyor {
  constructor(name, email, age, gender, course, description) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.gender = gender;
    this.course = course;
    this.description = description;
  }
}

class UI {
  addSurveyorToList(surveyor) {
    const list = document.getElementById("populateTable");
    // create tr element
    const row = document.createElement("tr");

    // insert cols
    row.innerHTML = `
            <td>${surveyor.name}</td>
            <td>${surveyor.email}</td>
            <td>${surveyor.age}</td>
            <td>${surveyor.gender}</td>
            <td>${surveyor.course}</td>
            <td>${surveyor.description}</td>            
        `;
    list.appendChild(row);
  }

  showAlert(message, className) {
    // create a div
    const div = document.createElement("div");

    // add classes
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector(".container");
    // cget form
    const form = document.querySelector("#book-form");
    // insert alert
    container.insertBefore(div, form);
    // timeout after 3s
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// local storage class

class Store {
  static getSurveyors() {
    let surveyors;
    if (localStorage.getItem("surveyors") === null) {
      surveyors = [];
    } else {
      surveyors = JSON.parse(localStorage.getItem("surveyors"));
    }

    return surveyors;
  }

  static displaySurveyors() {
    const surveyors = Store.getSurveyors();
    surveyors.forEach(function (surveyor) {
      const ui = new UI();
      // add surveyors to UI
      ui.addSurveyorToList(surveyor);
    });
  }

  static addSurveyor(surveyor) {
    const surveyors = Store.getSurveyors();
    surveyors.push(surveyor);
    localStorage.setItem("surveyors", JSON.stringify(surveyors));
  }
}
//Course.value ===''|| Age.value ===''
// function to store surveyor details
function surveyorForm() {
  if (userName.value === "" || Email.value === "" || Description.value === "") {
    alert("field must not be empty");
  } else if (male.checked) {
    Gender = "Male";
  } else if (female.checked) {
    Gender = "Female";
  } else if (other.checked) {
    Gender = "Other";
  } else {
    Gender = "Not Selected";
  }

  alert(
    `${userName.value} ${Email.value} ${Age.value} ${Gender} ${Course.value} ${Description.value}`
  );

  // get form values
  const name = userName.value,
    email = Email.value,
    age = Age.value,
    gender = Gender,
    course = Course.value,
    description = Description.value;

  // instantiate surveyor
  const surveyor = new Surveyor(name, email, age, gender, course, description);

  Store.addSurveyor(surveyor);
}

// functiont to display surveyor details
function displaySurveyor() {
  // instantiate UI
  const ui = new UI();
  // get surveyor from store
  const surveyors = Store.getSurveyors();
  surveyors.forEach(function (surveyor) {
    const ui = new UI();
    ui.addSurveyorToList(surveyor);
  });
  modal.hidden = false;
}

// function to close modal
function close() {
  modal.hidden = true;
  document.getElementById("populateTable").innerHTML = "";
}
