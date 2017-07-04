# Leave-Application-Portal
![Alt text](pl.png?raw=true "Optional Title")
<br/>

> Video Link of the application : https://drive.google.com/open?id=0B1Z59yxdylI1cWFHNEw1WXhFcFE 

An application to manage all the leave application by the employee of a company. <br>
Two set of users are there in application : Employee and Manager.

<h4> Services for employee : </h4> Creating new Leave Application , Viewing old Applications.
<h4> Services for manager :</h4> View all the leave application , Approve a leave application.

### Quick WorkFlow ###

* Login Authentication
* Magager Login 
  * View all Leave Application.
  * Approve Leave Application.
* Employee Login
  * View all old Application.
  * Create new Leave Application.
* Logout

### Database Configruartion ### 
* MonogDB is used as database. If its not installed follow the link : https://docs.mongodb.com/manual/installation/
* After installation: 
  * Create Database : intern.
  * Create two collections inside it: 
    * "users" : Having fields "FirstName" , "LastName" , "Email", "Role" , "UserName" . 
    * "leave" : Having fields "StartDate" , "EndDate" , "LeaveType" ,"Reason" ,"RequestBy" , "RequestedAt", "ApprovalStatus", "ApprovedAt" ,"UserName". <br>
 * Add document in users collection to make application because functionality to add it from application is not provided. <br>
   For Example : db.users.insert({FirstName : "rajat" , LastName : "rawat",Email : "rajatrawataku@gmail.com", Role :"employee" ,UserName :"rrawat"})
> Please fill Role as "employee" or "manager". 

### Quick Start Guide ###
* Clone the repo: git clone https://github.com/Dogfalo/materialize.git.
* Install the node modules  : npm install.
* No need to install materialise css already included in the repository(Front-end).
* No need to add externally jquery already added.
* Go to the base directory of the project:
  * open terminal to host web server: http-server
  * start mongo server : 
      * in one terminal : mogod (mongo server)
      * in another terminal : mongo
  * another terminal : node server.js

### APIS/Services In the Application ###
* Getting All Leave Application for the employer :
```javascript

    app.get('/get_all_the_leave_application_employee',function(req,res){

    function getting_the_leave_application_function(db,callback){

            var sample=[];
            var your_applications= db.collection('leave').find({"UserName":req.headers.usernameinput}); // current user name in the headers is given

            your_applications.each(function(err,doc){
                assert.equal(err,null);
                if(doc!=null){
                  sample.push(doc);
                }
                else {
                    callback();
                }

            });

          setTimeout(function(){
            employee_leave_application=sample;
            console.log(employee_leave_application);
            res.send(employee_leave_application); // this is response given back
          },1000);
    }

     MongoClient.connect(url, function(err, db) {
      assert.equal(err,null);
      getting_the_leave_application_function(db,function(){
        db.close();
        });
       });
     }); 
```
* Create Leave Application For the employee
```javascript
app.post('/create_leave_request',function(req,res){

    function tell_mongo_to_insert_leave_application(db,callback){

      var contents={StartDate:req.headers.startdate,EndDate:req.headers.enddate,LeaveType:req.headers.leavetype,Reason:req.headers.reason,RequestBy:req.headers.requestedby,RequestedAt:req.headers.requestedat,ApprovalStatus:"-",ApprovedAt:"-",UserName:req.headers.username};
      db.collection('leave').insertOne(contents,function(err,res){
            assert.equal(err,null);
            console.log("leave_request_created_successfully");
            db.close();
      });
      res.send({"val":"created Sucessfully"});
    }

    MongoClient.connect(url, function(err, db) {
        assert.equal(err,null);
        tell_mongo_to_insert_leave_application(db,function(){
          db.close();
        });
    });

});
```
* Getting all the leave Application for the manager
```javascript
app.get('/get_all_leave_application_manager',function(req,res){

  function all_the_leave_application_function(db,callback){

            var sample=[];
            var your_applications= db.collection('leave').find();
            //console.log(your_applications);

            your_applications.each(function(err,doc){
                assert.equal(err,null);
                if(doc!=null){
                  sample.push(doc);
                //  console.log(doc);
                //  console.log("hello");
                }
                else
                  {
                    callback();
                  }

            });

          setTimeout(function(){
            all_application_for_manager=sample;
            console.log(all_application_for_manager);
            res.send(all_application_for_manager);
          },1000);

  }

  MongoClient.connect(url, function(err, db) {
      assert.equal(err,null);
      all_the_leave_application_function(db,function(){
        db.close();
      });
  });

});
```

* Approve Leave Application By the Manager
```javascript
app.post('/change_status',function(req,res){

  var modified_response;

  function tell_mongo_to_change_status(db,callback){

    db.collection('leave').update({'_id':ObjectID(req.headers.leaveid),'UserName':req.headers.username},{$set:{'ApprovalStatus':req.headers.approvalstatus,'ApprovedAt':req.headers.approvedat}},function(err,res){
      assert.equal(err,null);
      if(res.result.nModified==0){
        console.log("Was not able to approve");
      }
      else{
        console.log("Approved Successfully");
      }
      modified_response=res.result.nModified;
      db.close();
    });

    setTimeout(function(){
      console.log(modified_response);
      res.send({"val":modified_response});

    },500)
  }

  MongoClient.connect(url,function(err,db){
      assert.equal(err,null);
      tell_mongo_to_change_status(db,function(){
        db.close();
      })

  });

});
```
> Server listening at port 3000 : ``` app.listen(3000) ```

### References ###
* ajax_file_server_connection.js file connects the front-end with backend and with AJAX helps in hitting the services.
* Various functions explaination :
  * employer_leave_application() : hits the service with URL :http://localhost:3000/get_all_the_leave_application_employee
  * create_leave_application() : hits the service wiht URL : http://localhost:3000/create_leave_request
  * manager_all_leave_application() : hits the service with URL : http://localhost:3000/get_all_leave_application_manager
  * approve_leave_application() : hits the service with URL : http://localhost:3000/change_status <br> <br>
  > With each URL corresspondin API's/app.get/app.post are created on the server

```javascript
  app.get('/add_your_route_here_url',function(req,res){

  function this_function_is_called_after_mongo_connection(db,callback){

            var sample=[];    // storing result in this varaible from mongo
            var your_applications= db.collection('leave').find(); // a query to find all the document in leave collection
            //console.log(your_applications);

            your_applications.each(function(err,doc){
                assert.equal(err,null);   // if any value has error assert will create the exception
                if(doc!=null){
                  sample.push(doc);   // storing result in sample for every document found
                }
                else
                  {
                    callback();
                  }

            });
          
          // timeout is added because javascript is asynchronous so these will also run simultaneously giving unknown result 
          // promises can also be used which is the standard method but will compicate the code
          
          setTimeout(function(){
            all_application_for_manager=sample;
            console.log(all_application_for_manager);
            res.send(all_application_for_manager);  // sending response back to the ajax_file_server_connection.js 
          },1000);

  }
  
  // below code helps in connection with mongo if created call the above function for further functionality
  MongoClient.connect(url, function(err, db) {
      assert.equal(err,null);
      all_the_leave_application_function(db,function(){
        db.close();
      });
  });

}) // all the other services follow the same pattern above with diffrent queries.
```
### License ###
The MIT License (MIT) <br>
Copyright (c) 2017 Rajat Rawat
      
      
      
