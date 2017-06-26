
// these are all the function used
// either for front end or connecting ajax_file_server_connection functions  with the front-end buttons

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
  $("input").val("");
  $("textarea").val("");
  $("#new_application_id").css("display","none");
  $("#get_status_all_box").css("display","block");
  employer_leave_application();
}

function manager_all_leave_application_from_html()
{
  $("input").val("");
  manager_all_leave_application();
  $("#manager_leave_output").css("display","block");
  $("#approve_leave_application_output").css("display","none")
}

function approve_leave_application_html()
{
  $("#manager_leave_output").css("display","none");
  $("#approve_leave_application_output").css("display","block");
  $("#for_manager_help_data").css("display","block");
  getting_data_for_manager_to_approve_things();
}

function approve_application_now()
{
  console.log("hello");
  approve_leave_application();
}

function go_back_to_home_page()
{
  $("input").val("");
  $("textarea1").val("");
  $("#user_name_input").val("");
  $("#emplyee_page").css("display","none");
  $("#manager_page").css("display","none");
  $("#page_1").css("display","block");
}
