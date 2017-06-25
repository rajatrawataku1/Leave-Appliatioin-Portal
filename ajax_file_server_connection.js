
var employer_leave_application_array=[];
var manager_all_leave_application_output=[];
var acess_respone;
var leave_request_response;
var approve_request_response;

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
    acess_respone=response;

    console.log(acess_respone);

    if(acess_respone.length==0)
    {
      $("#modal1").children().children().children().text("Please Enter Correct User Name ");
      $('#modal1').modal('open');
    }
    else
    {
      if(acess_respone.Role=="employee")
      {
        $("#page_1").css("display","none");
        $("#emplyee_page").css("display","block");
        $("#manager_page").css("display","none");
        $("#currently_logged_in_employee").text("User Name : " + acess_respone.UserName +"  Name : "+acess_respone.FirstName + " "+acess_respone.LastName+ "  Role : " + acess_respone.Role);
        $("#user_name_input").text("");
      }
      else
      {
        $("#emplyee_page").css("display","none");
        $("#page_1").css("display","none");
        $("#manager_page").css("display","block");
        $("#currently_logged_in_manager").text("User Name : " + acess_respone.UserName  +"   Name : "+acess_respone.FirstName + " "+acess_respone.LastName+"  Role : " + acess_respone.Role);
        $("#user_name_input").text("");
      }
    }

    // if(acess_respone==0)
    // {
    //   $('#modal1').modal('open');
    // }
    // else
    // if(acess_respone==1){
    //     $("#page_1").css("display","none");
    //     $("#")
    // }
  });

}

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
      "usernameinput": acess_respone.UserName //$("#user_name_input").val()//local_storage
     }
  }

  $.ajax(settings).done(function (response)
  {
    employer_leave_application_array=response;
    console.log(employer_leave_application_array);

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


function create_leave_application()
{

  // checking whether all the fields are filled correctly or not
  // var  array_tp_check=[ {"start_date_input_value": $("#input_start_date").val()},
  //                       {"end_date_input_value": $("#input_end_date").val()},
  //                       {"leave_type_input_value": $("#input_leave_type").val()},
  //                       {"reason_value":$("#input_reason_type").val()}
  //                     ];

  var entery_allowed_or_not=1;

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

  if(entery_allowed_or_not==1)
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
    manager_all_leave_application_output=response;
    console.log(manager_all_leave_application_output);

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

function approve_leave_application()
{
  var approval_allowed_or_not=1;
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

  if(approval_allowed_or_not==1)
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
        $("#modal1").children().children().children().text("Sorry Approval Unsucessfully");
        $('#modal1').modal('open');
      }
    });
  }
  else {
    $('#modal1').modal('open');
  }

}
