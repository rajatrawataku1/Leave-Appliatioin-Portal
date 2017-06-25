var express= require("express");
var cors= require("cors");
var app=express();

app.use(cors());

var MongoClient= require("mongodb").MongoClient;
var ObjectID = require('mongodb').ObjectID;
var assert= require("assert");
var url ='mongodb://localhost:27017/intern';

var sample=[];
var employee_leave_application=[];
var all_application_for_manager=[];
var all_users_data=[];
var acess_value=0;
var current_user=[];
var counter_for_leave_application=1;
app.get('/login_authorisation',function(req,res){

    function getting_all_the_user_name(db,callback){

      current_user=[]; // removing the old one for login authorisation

      var your_applications=db.collection('users').find();
      your_applications.each(function(err,doc){
        assert.equal(err,null);
        if(doc!=null){
          sample.push(doc);
        }
        else
          {
            callback();
          }
      });

      setTimeout(function(){
          all_users_data=sample;
          console.log(req.headers.usernameinput);

          for(var i=0;i<all_users_data.length;i++)
          {
            console.log(all_users_data[i].UserName);

          }

          for(var i=0;i<all_users_data.length;i++)
          {
            if(all_users_data[i].UserName==req.headers.usernameinput)
            {
              current_user=all_users_data[i];
              acess_value=1;
              console.log("I am in");
              break;
            }
          }

          setTimeout(function(){
            //  var return_json={"val":acess_value};
              res.send(current_user);
          },500)

      },1000);

    };

    MongoClient.connect(url, function(err, db) {
        assert.equal(err,null);
        getting_all_the_user_name(db,function(){
          db.close();
        });
    });


});

app.get('/get_all_the_leave_application_employee',function(req,res){

  function getting_the_leave_application_function(db,callback){

            var sample=[];
            var your_applications= db.collection('leave').find({"UserName":req.headers.usernameinput});
            //console.log(your_applications);

            your_applications.each(function(err,doc){
                assert.equal(err,null);
                if(doc!=null){
                  sample.push(doc);
                //  console.log(doc);
                //  console.log("hello");
                }
                else {
                    callback();
                }

            });

          setTimeout(function(){
            employee_leave_application=sample;
            console.log(employee_leave_application);
            res.send(employee_leave_application);
          },1000);

  }

  MongoClient.connect(url, function(err, db) {
      assert.equal(err,null);
      getting_the_leave_application_function(db,function(){
        db.close();
      });
  });
});

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

app.listen(3000);
