
var employer_leave_application_array=[];
var manager_all_leave_application_output=[];
var acess_respone;
var leave_request_response;
var approve_request_response;

//  In all these I have used ajax for connection with server
// Server is listening with port no : 3000
// headers are the content which we send from frontend to backend
//

// this function initiate the service for login as employee or manager
function check_acess()
{
  var settings =
  {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:3000/login_authorisation",
    "method": "GET",
    "headers":
     {
      "usernameinput": $("#user_name_input").val(),
      "content-type": "application/x-www-form-urlencoded"
     }
  }

  $.ajax(settings).done(function (response)
  {
    acess_respone=response;   // this is the response from the server it may  contain data it is checked further in the code as below

    console.log(acess_respone);

    if(acess_respone.length==0)
    {
      $("#modal1").children().children().children().text("Please Enter Correct User Name ");
      $('#modal1').modal('open'); // modal used for giving response to the user/client
    }
    else
    {
      if(acess_respone.Role=="employee")
      {
        // emplyee login taking place
        // these display none are used for front-end
        $("#page_1").css("display","none");
        $("#emplyee_page").css("display","block");
        $("#manager_page").css("display","none");
        $("#currently_logged_in_employee").text("User Name : " + acess_respone.UserName +"  Name : "+acess_respone.FirstName + " "+acess_respone.LastName+ "  Role : " + acess_respone.Role);
        $("#user_name_input").text("");
      }
      else
      {
        // manager login taking place
        $("#emplyee_page").css("display","none");
        $("#page_1").css("display","none");
        $("#manager_page").css("display","block");
        $("#currently_logged_in_manager").text("User Name : " + acess_respone.UserName  +"   Name : "+acess_respone.FirstName + " "+acess_respone.LastName+"  Role : " + acess_respone.Role);
        $("#user_name_input").text("");
      }
    }
  });

}

// this function initiate the service for checking all the leave application for the current employer who is logged in
function employer_leave_application()
{
  var settings =
  {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:3000/get_all_the_leave_application_employee",
    "method": "GET",
    "headers":
      {
      "usernameinput": acess_respone.UserName // acess_respone is the array containing the name of the employer logged in
      }
  }

  $.ajax(settings).done(function (response)
  {
    employer_leave_application_array=response;
    console.log(employer_leave_application_array);  // this array contains all the leave application for the curretly logged employer
    // futher code is just for showing that thing in front-end

    $("#get_status_all_box").empty();

    for(var i=0;i<employer_leave_application_array.length;i++)
    {
      $("#get_status_all_box").append('<div class="col s10 offset-s1"> <div class="card blue-grey darken-1"> <div class="card-content white-text"> <div class="col s12"></div> <div class="col s12"></div> <div class="col s12"></div> <div class="col s12"></div> <div class="col s12"></div> <div class="col s12"></div> <div class="col s12"></div> </div> <br> <br> <br> <br> <br> <br> <br> <br> <br></div> </div>');
    }

    for(var i=0;i<employer_leave_application_array.length;i++)
    {
        $("#get_status_all_box").children().eq(i).children().children().children().eq(0).text("Start Date : "+employer_leave_application_array[i].StartDate);
        $("#get_status_all_box").children().eq(i).children().children().children().eq(1).text("End Date : "+employer_leave_application_array[i].EndDate);
        $("#get_status_all_box").children().eq(i).children().children().children().eq(2).text("Leave Type : "+employer_leave_application_array[i].LeaveType);
        $("#get_status_all_box").children().eq(i).children().children().children().eq(3).text("Reason : "+employer_leave_application_array[i].Reason);
        $("#get_status_all_box").children().eq(i).children().children().children().eq(4).text("Requested At : "+employer_leave_application_array[i].RequestedAt);
        $("#get_status_all_box").children().eq(i).children().children().children().eq(5).text("Approval Status : "+employer_leave_application_array[i].ApprovalStatus);
        $("#get_status_all_box").children().eq(i).children().children().children().eq(6).text("Approved At : "+employer_leave_application_array[i].ApprovedAt);
   }

  });
}

// this function initiate the service for creating leave application for the current employer who is logged in
function create_leave_application()
{
  var entery_allowed_or_not=1;  // this variable performs various checks for wrong input by the user

  $("#modal1").children().children().children().text("");

  if($("#input_start_date").val()=="")
  {
    entery_allowed_or_not=0;
    $("#modal1").children().children().children().append("Enter the Start Date <br>");
  }
  if($("#input_end_date").val()=="")
  {
    entery_allowed_or_not=0;
    $("#modal1").children().children().children().append("Enter the End Date <br>");
  }
  if($("#input_leave_type").val()=="")
  {
    entery_allowed_or_not=0;
    $("#modal1").children().children().children().append("Enter the Leave Type <br>");
  }
  if($("#input_reason_type").val()=="")
  {
    entery_allowed_or_not=0;
    $("#modal1").children().children().children().append("Enter the Reason <br>");
  }
  if(Date.parse($("#input_start_date").val())>=Date.parse($("#input_end_date").val()) )
  {
    entery_allowed_or_not=0;
    $("#modal1").children().children().children().append("Start Data should be less than End Date <br>");
  }

  if(entery_allowed_or_not==1)  // if it goes inside means all the inputs are correct and we can create leave application for the current empolyer
  {
    var settings =
    {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3000/create_leave_request",
      "method": "POST",
      "headers":
        {
        "startdate": $("#input_start_date").val(),
        "enddate":$("#input_end_date").val(),
        "leavetype":$("#input_leave_type").val(),
        "reason":$("#input_reason_type").val(),
        "requestedby": acess_respone.FirstName+" "+acess_respone.LastName,
        "username":acess_respone.UserName,
        "requestedat":new Date()
       }
    }

    $.ajax(settings).done(function(response){
      leave_request_response=response.val;
      $("#modal1").children().children().children().text(leave_request_response);
      $('#modal1').modal('open');
      console.log(leave_request_response);
    });

  }
  else{
    $('#modal1').modal('open');
  }
}

// this function initiate the service for getting all the leave application list to the manager who is logged in
function manager_all_leave_application()
{
  var settings =
  {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:3000/get_all_leave_application_manager",
    "method": "GET",
  }

  $.ajax(settings).done(function (response)
  {
    manager_all_leave_application_output=response;
    console.log(manager_all_leave_application_output);

    $("#manager_leave_output").empty();

    for(var i=0;i<manager_all_leave_application_output.length;i++)
    {
      $("#manager_leave_output").append('<div class="col s10 offset-s1"> <div class="card blue-grey darken-1"> <div class="card-content white-text"> <div class="col s12">Start Date </div> <div class="col s12">End Date </div> <div class="col s12">Leave Type </div> <div class="col s12">Reason </div> <div class="col s12">RequestedBy </div> <div class="col s12">RequestedAt </div> <div class="col s12">Approval Status </div> <div class="col s12">Approved At </div> <div class="col s12">User Name </div> <div class="col s12">Id Number </div> </div> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> </div> </div>');
    }

    for(var i=0;i<manager_all_leave_application_output.length;i++)
    {
      $("#manager_leave_output").children().eq(i).children().children().children().eq(0).text("Start Date : "+manager_all_leave_application_output[i].StartDate);
      $("#manager_leave_output").children().eq(i).children().children().children().eq(1).text("End Date : "+manager_all_leave_application_output[i].EndDate);
      $("#manager_leave_output").children().eq(i).children().children().children().eq(2).text("Leave Type : "+manager_all_leave_application_output[i].LeaveType);
      $("#manager_leave_output").children().eq(i).children().children().children().eq(3).text("Reason : "+manager_all_leave_application_output[i].Reason);
      $("#manager_leave_output").children().eq(i).children().children().children().eq(4).text("Requested By : "+manager_all_leave_application_output[i].RequestBy);
      $("#manager_leave_output").children().eq(i).children().children().children().eq(5).text("Requested At : "+manager_all_leave_application_output[i].RequestedAt);
      $("#manager_leave_output").children().eq(i).children().children().children().eq(6).text("Approval Status : "+manager_all_leave_application_output[i].ApprovalStatus);
      $("#manager_leave_output").children().eq(i).children().children().children().eq(7).text("Approved At : "+manager_all_leave_application_output[i].ApprovedAt);
      $("#manager_leave_output").children().eq(i).children().children().children().eq(8).text("User Name : "+manager_all_leave_application_output[i].UserName);
      $("#manager_leave_output").children().eq(i).children().children().children().eq(9).text("LeaveID  : "+manager_all_leave_application_output[i]._id);
    }

  });
}

// this is extra function which  initiates the service for getting all the leave appication data and show it to the mananger to get help in changing approval
function getting_data_for_manager_to_approve_things(){

  var settings =
  {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:3000/get_all_leave_application_manager",
    "method": "GET",
  }

  $.ajax(settings).done(function (response)
  {
    manager_all_leave_application_output=response;// array containing all the leave application
    console.log(manager_all_leave_application_output);

    // futher code is for front-end just showing all leave application to the manager front-end

    $("#for_manager_help_data").empty();

    for(var i=0;i<manager_all_leave_application_output.length;i++)
    {
      $("#for_manager_help_data").append('<div class="col s10 offset-s1"> <div class="card blue-grey darken-1"> <div class="card-content white-text"> <div class="col s12">Start Date </div> <div class="col s12">End Date </div> <div class="col s12">Leave Type </div> <div class="col s12">Reason </div> <div class="col s12">RequestedBy </div> <div class="col s12">RequestedAt </div> <div class="col s12">Approval Status </div> <div class="col s12">Approved At </div> <div class="col s12">User Name </div> <div class="col s12">Id Number </div> </div> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> </div> </div>');
    }

    for(var i=0;i<manager_all_leave_application_output.length;i++)
    {
      $("#for_manager_help_data").children().eq(i).children().children().children().eq(0).text("Start Date : "+manager_all_leave_application_output[i].StartDate);
      $("#for_manager_help_data").children().eq(i).children().children().children().eq(1).text("End Date : "+manager_all_leave_application_output[i].EndDate);
      $("#for_manager_help_data").children().eq(i).children().children().children().eq(2).text("Leave Type : "+manager_all_leave_application_output[i].LeaveType);
      $("#for_manager_help_data").children().eq(i).children().children().children().eq(3).text("Reason : "+manager_all_leave_application_output[i].Reason);
      $("#for_manager_help_data").children().eq(i).children().children().children().eq(4).text("Requested By : "+manager_all_leave_application_output[i].RequestBy);
      $("#for_manager_help_data").children().eq(i).children().children().children().eq(5).text("Requested At : "+manager_all_leave_application_output[i].RequestedAt);
      $("#for_manager_help_data").children().eq(i).children().children().children().eq(6).text("Approval Status : "+manager_all_leave_application_output[i].ApprovalStatus);
      $("#for_manager_help_data").children().eq(i).children().children().children().eq(7).text("Approved At : "+manager_all_leave_application_output[i].ApprovedAt);
      $("#for_manager_help_data").children().eq(i).children().children().children().eq(8).text("User Name : "+manager_all_leave_application_output[i].UserName);
      $("#for_manager_help_data").children().eq(i).children().children().children().eq(9).text("LeaveID  : "+manager_all_leave_application_output[i]._id);
    }

  });

}

// this is function which  initiates the service for changing apporval status of application by current manager

function approve_leave_application()
{
  var approval_allowed_or_not=1;      // this variable handles all the wrong inputs given by the manager for apporval of an applicaion
  $("#modal1").children().children().children().text("");

  if($("#user_name_manager").val()=="")
  {
    approval_allowed_or_not=0;
    $("#modal1").children().children().children().append("Enter User Name <br>");
  }
  if($("#leave_id").val()=="")
  {
    approval_allowed_or_not=0;
    $("#modal1").children().children().children().append("Enter leave id <br>");
  }

  var re = /[0-9A-Fa-f]{6}/g;
  var object_id_check=$("#leave_id").val();
  if(re.test(object_id_check))
  {
    console.log("valid hex");
  }
  else {
    approval_allowed_or_not=0;
    $("#modal1").children().children().children().append("Please copy correct leave id from below");
    console.log("not valid hex");
  }

  re.lastIndex = 0;
  // var object_id_check=parseInt(,24);
  // if( object_id_check.toString(24)==$("#leave_id").val() == false )
  // {
  //     approval_allowed_or_not=0;
  //     $("#modal1").children().children().children().append("Please enter correct leave id <br>");
  // }

  if(approval_allowed_or_not==1)  // this approval_allowed_or_not == 1 means all the inputs are valid we can continue further
  {
    var settings=
    {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3000/change_status",
      "method": "POST",
      "headers":
        {
        "username": $("#user_name_manager").val(),
        "leaveid":$("#leave_id").val(),
        "approvedat":new Date(),
        "approvalstatus":"Approved"
       }
    }

    $.ajax(settings).done(function (response)
    {
      approve_request_response=response.val;
      console.log(approve_request_response);
      if(approve_request_response>=1)
      { $("#modal1").children().children().children().text("Approved Sucessfully");
        $('#modal1').modal('open');
      }
      else {
        $("#modal1").children().children().children().text("Sorry Approval Unsucessfully May be network issues or Incorrect User Name Entered");
        $('#modal1').modal('open');
      }
    });
  }
  else {  // wrong values entered
    $('#modal1').modal('open');
  }

}
