
function login_button()
{
  console.log($("#user_name_input").val());
  check_acess();
}

function new_application_created_call()
{
  $("#get_status_all_box").css("display","none");
  $("#new_application_id").css("display","block");
}

function all_status_call()
{
  $("#new_application_id").css("display","none");
  $("#get_status_all_box").css("display","block");
  employer_leave_application();
}

function manager_all_leave_application_from_html()
{
  manager_all_leave_application();
  $("#manager_leave_output").css("display","block");
  $("#approve_leave_application_output").css("display","none")
}

function approve_leave_application_html()
{
  $("#manager_leave_output").css("display","none");
  $("#approve_leave_application_output").css("display","block")
}

function approve_application_now()
{
  console.log("hello");
  approve_leave_application();
}
