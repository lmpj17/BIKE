var refreshIntervalId;
var refreshIntervalSearchProviderId;
var globalManufName;







function getURL()         
 
            {
//             return 'http://www.be1worldservices.com/maxima/';
             return 'http://bike.lmsis.com.br/ws/';
         
    } 	



function loginUsr()         
            {
                $("#message-login").html("<center>Finding email information....</center>");
                var $email = document.getElementById('repEmail').value;
                var $password = document.getElementById('repPwd').value;
                console.log($email);
                $.ajax({
                    type: "GET",
                    url: getURL()+"login.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"email":$email, "password":$password},
                    success: function (result, jqXHR) {
					   var userData = JSON.parse(result);
                       console.log(result);
                       if (userData.MESSAGE == "OK"){
							$("#iduser").val(userData.ID);
                            $("#todaysdate").val(userData.TODAYSDATE);                            
							$("#username").html('<center><p style="margin-top: 0em; margin-bottom: 0em;font-size:22pt;color:white;">'+userData.NAME+'</center>');
                            var item = "<br><br><table align='center' border='0' width='95%'  style='background-color:black; color:#fff;'>";
                                item = item + '<tr><td><img class="img-circle" src="'+userData.IMG+'" width="100" /></td>';
                                item = item + "<td style='padding-left:10px;'><p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(2vw + 1vh);'>"+userData.NAME+"";
                                item = item + "</td></tr><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2>&nbsp;</td></tr></table>";
                                item = item + "<p>";
                            $("#repPictName4").html(item);
                            $("#repPictName3").html(item);
                           $("#repPictName2").html(item);
                           $("#repPictName1").html(item);
                           $("#skype1").html('<i class="fa fa-skype button-icon-left icone-margin" data-position="left" style="padding-top:4px"></i>&nbsp;&nbsp;&nbsp;<a href="skype:'+userData.SKYPE+'?userinfo" " ><font color="#fff">Link to my profile</a>');
                           $("#skype2").html('<i class="fa fa-skype button-icon-left icone-margin" data-position="left" style="padding-top:4px"></i>&nbsp;&nbsp;&nbsp;<a href="skype:'+userData.SKYPE+'?userinfo" " ><font color="#fff">Link to my profile</a>');
                           $("#skype3").html('<i class="fa fa-skype button-icon-left icone-margin" data-position="left" style="padding-top:4px"></i>&nbsp;&nbsp;&nbsp;<a href="skype:'+userData.SKYPE+'?userinfo" " ><font color="#fff">Link to my profile</a>');
                           $("#skype4").html('<i class="fa fa-skype button-icon-left icone-margin" data-position="left" style="padding-top:4px"></i>&nbsp;&nbsp;&nbsp;<a href="skype:'+userData.SKYPE+'?userinfo" " ><font color="#fff">Link to my profile</a>');
//							listClassVideos();                           
							videosShowPage();
                            $("#message-login").html("");

                       }
                       else
                       {
                           $("#message-login").html('<center><b>'+userData.MESSAGE+'</center>');

                       }                   
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-login").html("<center>Server busy try again later...  "+status+"</center>");
                        console.log(jqXHR.responseText);
                        console.log(jqXHR.status);
 
                    },
                });
         
    }
function getUserDetails()         

            {
         
                var uid = document.getElementById('iduser').value;
                console.log(getURL());
                $.ajax({
                    type: "GET",
                    url: getURL()+"get-userdetail.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"uid":uid},
                    success: function (result, jqXHR) {
					   var userData = JSON.parse(result);
                       if (userData.MESSAGE == "OK"){
							$("#app-address").val(userData.ADDRESS);
                       }
                       else
                       {
                           $("#app-address").val('');

                       }                   
         
                        $("#message-login").html("<center>Found "+userData.length+" Driver(s)</center>");
         
                    },
                    error: function (jqXHR, status) {
                        // error message...
                        $("#app-address").val("");
 
                    },
                });
         
    }
   function onDemandSidebarFilter()         
{

        uib_sb.toggle_sidebar($(".uib_w_130"));


}

   function scheduleSidebarFilter()         
{

        uib_sb.toggle_sidebar($(".uib_w_162"));


}



   function onDemandSidebarSort()         
{

        uib_sb.toggle_sidebar($(".uib_w_71"));  

}

    function profileShowPage()         
{
    getCountClassTaken();
    getUserProfile();

    activate_page("#pg-profile");

}

    function onDemandShowPage()         
{
     listOndemand();
     $("#returnplay").val("onDemandShowPage");
     listInstructors();
     listMusics();
     activate_page("#pg-ondemand");

}

    function videosShowPage()         
{
    listByCategory();
    listFirst4Schedule();
    activate_page("#pg-videos");

}

    function scheduleShowPage()         
{
    var todaysdate = document.getElementById('todaysdate').value;
    listDatesSchedule(todaysdate);
    listSchedule(todaysdate);
    activate_page("#pg-schedule");

}

    function scheduleSelect(id)         
{

        updUserWatchClass(id);
 
}








    function ondemandDetail(id)         
{

    listOndemandDetail(id);
    activate_page("#pg-video-detail");

}

    function playOndemand()         
{
    console.log('playOndemand');
    var id = document.getElementById('idvideo').value;    
    playOndemandVideo(id);
    showWorkoutProgress();   
    activate_page("#pg-workout");

}

    function returnFromPlay()         
{
    console.log('returnFromPlay');
    var returnTo = document.getElementById('returnplay').value;    
    window[returnTo]();
    console.log("return:"+returnTo);

}


   function listDatesSchedule(date)         

            {
                // clean list div...
//                $("#menuDaysSchedule").empty();
                $("#menuDaysScheduleNew").empty();
                var iduser = document.getElementById('iduser').value;


                console.log ('listDatesSchedule : ' + date);
                cont=0;
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-dates-schedule.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"id":iduser, "date": date},
                    success: function (result, jqXHR) {
         
                        var dates = JSON.parse(result);
                        $.each(dates,function(i, date){
                                            
//                            var item = "<div onclick='listSchedule();'>" + date.WEEKDAY + "<p>&nbsp;&nbsp;" + date.DAY + "</div>";
//                            console.log("ITEM:"+item);
//                            $("#menuDaysSchedule").append(item); 
                            var item1 = "<a href='#' onclick='listSchedule(\""+ date.DATE +" 00:00:00\");'><p  class='font-roboto' >" + date.WEEKDAY + "</p><p  class='font-roboto' >&nbsp;&nbsp;" + date.DAY + "</p></a";
                            
                            $("#menuDaysScheduleNew").append(item1); 
                            cont++;
                        });
                        for(i=cont;i<14;i++){
                            var item1 = "<a href='#' onclick='listSchedule(\""+ date.DATE +" 00:00:00\");'><p  class='font-roboto' >&nbsp;</p><p  class='font-roboto' >&nbsp;&nbsp;</p></a";
                            
                            $("#menuDaysScheduleNew").append(item1); 
                        }
                        
         
                    },
                    error: function (jqXHR, status) {
                        $("#scheduleContent").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });
         
    } 

   function listFirst4Schedule()         

            {
                // clean list div...
                $("#scheduleTime").empty();
                var iduser = document.getElementById('iduser').value;
                var classnow,datenow,timenow;

                console.log ('listFirst4Schedule');
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-time-schedule.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"id":iduser},
                    success: function (result, jqXHR) {
         
                        var dates = JSON.parse(result);
 
                        $.each(dates,function(i, date){
                            
                            var item1 =  "<a href='#' onclick='showFeaturedClass(\""+ date.ID +"\",\""+date.WEEK+"\",\""+date.TIME+"\");' >" + date.TIME  + "</a>";
                            
                            $("#scheduleTime").append(item1); 
                            classnow = date.CLASSNOW;
                            timenow = date.TIMENOW;
                            datenow = date.DATENOW;
                            weekdaynow = date.WEEKNOW;
                        });
                      ;  
                      showFeaturedClass(classnow,weekdaynow,timenow);          
         
                    },
                    error: function (jqXHR, status) {
                        $("#scheduleTime").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });
         
    } 

   function showFeaturedClass(id, date, time)         

            {
                // clean list div...
 //               $("#featuredClass").empty();
                var iduser = document.getElementById('iduser').value;


                console.log ('showfeaturedclass'+id + date+time);
               $.ajax({
                    type: "GET",
                    url: getURL()+"show-featured-class.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"id":iduser, "schedid": id},
                    success: function (result, jqXHR) {
         
                        var featured = JSON.parse(result);
                        
                        $.each(featured,function(i, feat){
                                  
//                            var item = "<table class='font-roboto' onclick='ondemandDetail("+ feat.ID + ");' align='center' border='0' width='100%' height='300px' style='background: url("+feat.IMG+") no-repeat center center ; border-spacing:0; border-collapse:collapse; color:#fff;'>";
                            var item = "<table class='font-roboto' align='center' border='0' width='100%' height='300px' style='background: url("+feat.IMG+") no-repeat center center ; border-spacing:0; border-collapse:collapse; color:#fff;'>";
                                item = item + "<tr  style='background: rgba(30,39,68,0.7);'>";
                                item = item + "<td style='vertical-align:bottom;padding-left:10px;padding-bottom:20px;'>";
                                item = item + '<p><a href="fitnation://" class="btn widget uib_w_161 d-margins button-round" style="width:120px;font-size:12px;background-color:#21e7b6;color:white;" data-uib="twitter%20bootstrap/button" data-ver="1" id="xplayOndemandFeatured">';
                                item = item + '<i class="glyphicon glyphicon-play button-icon-left" data-position="left"></i>JOIN  CLASS</a></p>';
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(2vw + 2vh);'>"+feat.DESCRIPTION+"";
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(1vw + 1vh);'>"+feat.INSTRUCTOR;
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(1.5vw + 1.5vh);'>"+date+" "+time+"</td></tr></table>";
                               


                            $("#featuredClass").html(item); 
                        });
         
                              
         
                    },
                    error: function (jqXHR, status) {
                        $("#featuredClass").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });
         
    } 

   function listSchedule(date,bookM,taken)         

            {
                // clean list div...
                $("#scheduleContent").empty();
                var iduser = document.getElementById('iduser').value;
                //var bookM = document.getElementById('schbookm').value;
                //var taken = document.getElementById('schtaken').value;
                $('#returnbookm').val('listSchedule');

                bookM = null;
                taken= null;
                if ($('#schbookm')[0].checked)
                    var bookM = 1;
                if ($('#schtaken')[0].checked)
                    var taken = 1;
                var all = $("input[id='bs-radio-group-a']:checked").val();
                var length = $("input[id='bs-radio-group-0']:checked").val();
                var classType = $("input[id='bs-radio-group-1']:checked").val();
                var music = $("input[id='bs-radio-group-2']:checked").val();
                var instructor = $("input[id='bs-radio-group-3']:checked").val();

                if (typeof(length) == "undefined")
                   var length = null;
                if (typeof(classType) == "undefined")
                   var classType = null;
                if (typeof(music) == "undefined")
                   var music = null;
                if (typeof(instructor) == "undefined")
                   var instructor = null;


                console.log ('listSchedule: ' + all + length+classType+music+instructor+bookM+taken);
                var wdate = "";
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-schedule.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"id":iduser, "date": date, "bookM" : bookM, "length":length, "classType":classType, "music":music, "instructor":instructor, "taken":taken},
                    success: function (result, jqXHR) {
         
                        var schedule = JSON.parse(result);
                        $.each(schedule,function(i, sched){
                            console.log(sched.DATE + "*" + sched.TIME);
                            if (sched.DATE != wdate)
                            {
                                $("#scheduleContent").append('<p  class="font-roboto" style="font-size:19px;font-weight:bold;color:white;padding-left:18px; padding-top:5px;" >'+ sched.WEEKDAY + '</p'); 
                                wdate = sched.DATE;
                            }
                            var item = "<table  class='font-roboto' class='font-roboto'  align='center' border='0' width='95%' height='50px' style='border-spacing:0; border-collapse:collapse; color:#fff;'>";
                                item = item + "<tr  style='background: rgba(16,20,37,0.7);'>";
                                item = item + "<td style='width:20%;vertical-align:center;padding-left:10px;padding-bottom:0px;'><p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(1.2vw + 1.2vh);'>"+sched.TIME+"</td>";
                                item = item + "<td style='width:60%;vertical-align:center;padding-left:10px;padding-bottom:0px;'><p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(1.5vw + 1.5vh);'>"+sched.DESCRIPTION+"";
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(1vw + 1vh);'>"+sched.INSTRUCTOR;
                                item = item + "</td>";
                                item = item + "<td style='width:20%; align:right;' >";
//                                item = item + "<div onclick='scheduleSelect(\""+ sched.ID +"\")'><input class='required' type='radio' value='mark' id='mark"+ sched.ID +"' /></div></td>";
                               console.log('book:'+sched.BOOK);
                               if (sched.BOOK == "1"){
                                   item = item + "<div onclick='scheduleSelect(\""+ sched.ID +"\")'><img width='30px' id='mark" + sched.ID + "' class='img-circle' src='images/Arrow-sel.png' /></div></td>";
                                }
                                else{
                                   item = item + "<div onclick='scheduleSelect(\""+ sched.ID +"\")'><img width='30px' id='mark" + sched.ID + "' class='img-circle' src='images/Arrow.png' /></div></td>";
                                }
                                
                                item = item + "</tr></table>";
                               
                            $("#scheduleContent").append(item); 
                        });
         
                        
         
                    },
                    error: function (jqXHR, status) {
                        $("#scheduleContent").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });
         
    } 



   function showWorkoutProgress()         

            {
                // clean list div...
                $("#workoutDisplay").empty();
                var iduser = document.getElementById('iduser').value;


                console.log ('workout-progress: ' );
                var wdate = "";
                var item = "<table  class='font-roboto' align='center' border='0' width='100%' height='50px' style='border-spacing:0; border-collapse:collapse; color:#fff;'>";
                    item = item + "<tr >";
                    item = item + "<td style='background-color:#141a2e;vertical-align:bottom;padding-left:10px;padding-bottom:0px;'><p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(2vw + 2vh);'>Distance: <p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(2vw + 2vh);'>13M</p></td>";
                    item = item + "<td style='background-color:#101425;vertical-align:bottom;padding-left:10px;padding-bottom:0px;'><p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(2vw + 2vh);'>Calories: <p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(2vw + 2vh);'>200</p></td>";
                    item = item + "<td style='background-color:#141a2e;vertical-align:bottom;padding-left:10px;padding-bottom:0px;'><p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(2vw + 2vh);'>SPEED:</p> <p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(2vw + 2vh);'>30 MPH</p></td>";
                    item = item + "</tr></table>";
                   
                $("#workoutDisplay").append(item); 
         
    } 





   function listOndemand()         

            {
                // clean list div...
                $("#listOndemands").empty();
				var iduser = document.getElementById('iduser').value;

                bookM = null;
                taken= null;
                if ($('#onbookm')[0].checked)
                    var bookM = 1;
                if ($('#ontaken')[0].checked)
                    var taken = 1;
 
                var length = $("input[id='bs-radio-group-10']:checked").val();
                var classType = $("input[id='bs-radio-group-11']:checked").val();
                var music = $("input[id='bs-radio-group-12']:checked").val();
                var instructor = $("input[id='bs-radio-group-13']:checked").val();
                var sort = $("input[id='bs-radio-group-4']:checked").val();
                    
                if (typeof(length) == "undefined")
                   var length = null;
                if (typeof(classType) == "undefined")
                   var classType = null;
                if (typeof(music) == "undefined")
                   var music = null;
                if (typeof(instructor) == "undefined")
                   var instructor = null;

                console.log ('listOndemands: ' + length+classType+music+instructor+bookM+taken+sort);
 
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-ondemand.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"id":iduser, "bookM" : bookM, "length":length, "classType":classType, "music":music, "instructor":instructor, "taken":taken, "sort":sort},
                    success: function (result, jqXHR) {
         
                        var videos = JSON.parse(result);
                        var qty = 0;
                        $.each(videos,function(i, video){
                                qty = video.QTY;
                            console.log(video.IMG + "qty:"+ qty);
                            var item = "<table  class='font-roboto' onclick='ondemandDetail("+ video.ID + ");' align='center' border='0' width='100%' height='115px' style='background: url("+video.IMG+") no-repeat center center ; background-size: cover;  border-spacing:0; border-collapse:collapse; color:#fff;'>";
                                item = item + "<tr  style='background: rgba(30,39,68,0.7);'><td style='vertical-align:bottom;padding-left:10px;padding-bottom:0px;'><p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(2vw + 2vh);'>"+video.NAME+"";
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(1vw + 1vh);'>"+video.INSTRUCTOR;
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(1.5vw + 1.5vh);'>"+video.WEEK+" "+video.TIME+"</td></tr></table>";
                                item = item + "<p>";
                            $("#listOndemands").append(item); 
                        });
         
                $("#ondemandtitle").empty();
                $("#ondemandtitle").html("<center><p  class='font-roboto' style='padding-top:5px;font-size:18px;color:#646e9f;'>Showing " + qty + " classes</p></center>"); 
                        
         
                    },
                    error: function (jqXHR, status) {
                        $("#listOndemands").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });
         
    } 

   function listInstructors()         

            {
                // clean list div...
                $("#instructors_list").empty();
                $("#sched_instructors_list").empty();
                var iduser = document.getElementById('iduser').value;

 
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-instructors.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"id":iduser},
                    success: function (result, jqXHR) {
         
                        var instructors = JSON.parse(result);
                        $.each(instructors,function(i, instructor){

                        var item = '<fieldset class="widget uib_w_148 d-margins" data-uib="twitter%20bootstrap/radio_group" data-ver="1" data-child-name="bs-radio-group-3" id="filterinstructor">';
                           item += '<label class="radio radio-padding-left widget uib_w_149 padding-bottom-10" data-uib="twitter%20bootstrap/radio_button" data-ver="1">';
                           item += '<input type="radio" name="bs-radio-group-0" id="bs-radio-group-13" value="'+ instructor.ID +'">'+instructor.NAME+'</label>';
                           item += '</fieldset>';


                            $("#sched_instructors_list").append(item); 
                            $("#instructors_list").append(item); 
                        });
         
                    },
                    error: function (jqXHR, status) {
                        $("#instructors_list").html("<center>Server Busy try later...  "+status+"</center>");
                        $("#sched_instructors_list").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });
         
    } 


   function listMusics()         

            {
                // clean list div...
                $("#musics_list").empty();
                $("#sched_musics_list").empty();
                var iduser = document.getElementById('iduser').value;

 
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-musics.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"id":iduser},
                    success: function (result, jqXHR) {
         
                        var musics = JSON.parse(result);
                        $.each(musics,function(i, music){

                        var item = '<fieldset class="widget uib_w_148 d-margins" data-uib="twitter%20bootstrap/radio_group" data-ver="1" data-child-name="bs-radio-group-3" id="filtermusic">';
                           item += '<label class="radio radio-padding-left widget uib_w_149 padding-bottom-10" data-uib="twitter%20bootstrap/radio_button" data-ver="1">';
                           item += '<input type="radio" name="bs-radio-group-0" id="bs-radio-group-2" value="'+ music.ID +'">'+music.GENRE+'</label>';
                           item += '</fieldset>';



                            $("#musics_list").append(item); 
                            $("#sched_musics_list").append(item); 
                        });
         
                    },
                    error: function (jqXHR, status) {
                        $("#musics_list").html("<center>Server Busy try later...  "+status+"</center>");
                        $("#sched_musics_list").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });
         
    } 



   function listByCategory()         

            {
                // clean list div...
                $("#videoGallery1").empty();
                var iduser = document.getElementById('iduser').value;
                addDivScroll();
                $('#returnbookm').val('listByCategory');
                console.log ('listByCategory');
 
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-by-category.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"id":iduser},
                    success: function (result, jqXHR) {
         
                        var videos = JSON.parse(result);
                        var category = "";
                        var nrdiv = 1;
                        $.each(videos,function(i, video){
                            
                            if (category != video.CATEGORY){
                               var item = '<p  class="font-roboto" style="font-size:16px;font-weight:bold;color:#21e7b6;background-color:#1e2744; padding-top:15px;" >'+ video.CATEGORY + '</p>'; 

                                $("#catscroll" + nrdiv).append(item); 
                                nrdiv+=nrdiv;
                                category = video.CATEGORY;
                            }
                            var item = "<table class='font-roboto font-white-1'  onclick='scheduleSelect("+ video.SID + ");' align='center' width='200px' height='115px' style='background: url("+video.IMG+") no-repeat center center ; background-size: cover ;background-size: 100% auto;' >";
                                item = item + "<tr style= 'background: rgba(30,39,68,0.7);height:115px;'>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<p style='padding-left:10px; font-size:14px;'>"+video.NAME+"</p>";
                                item = item + "<p style='padding-left:10px;font-size:14px;'>"+video.INSTRUCTOR+"</p>";
                                item = item + "<p style='padding-left:10px;width:250px; font-size:10px;'>"+video.WEEK+" "+video.TIME+"</p>";
                                item = item + "</td></tr></table><table><tr><td></td></tr></table>";
                            
                            $("#scroll" + nrdiv).append(item); 
                            
                        });
                         
                    
                    },
                    error: function (jqXHR, status) {
                        $("#videoGallery1").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });
         
    } 

   function addDivScroll()         
   {
        for (i=1;i<100;i++){
             var item = '<div class="scrollmenu" id="scroll'+i+'" style="background-color:#1e2744;vertical-align: top;border:#1e2744 1px solid;"></div>';
             item = item + '<div class="col-xs-12" id="catscroll'+i+'"  style="background-color:#1e2744;vertical-align: top;border:#1e2744 1px solid;"></div>'; 
             $("#videoGallery1").append(item);
             var item = '<div class="scrollmenu" id="scroll'+i+'"  style="background-color:#1e2744;vertical-align: top;border:#1e2744 1px solid;"></div>';
             $("#videoGallery1").append(item);

        }
 
    }                            

   function listOndemandDetail(id)         

            {
                // clean list div...
                $("#videoImage").empty();
                $("#difRating").empty();
                $("#videoDescription").empty();
                var iduser = document.getElementById('iduser').value;
                $("#idvideo").val(id);


                console.log ('listOndemandDetail:' + id);
 
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-ondemand-detail.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"id":id},
                    success: function (result, jqXHR) {
         
                        var videos = JSON.parse(result);
                        $.each(videos,function(i, video){
                            console.log(video.IMG + "/" + video.RATE );
                            var item = "<table  class='font-roboto'  align='center' border='0' width='100%' height='250px' style='background: url("+video.IMG+") no-repeat center center ; border-spacing:0; border-collapse:collapse; color:#fff;'>";
                                item = item + "<tr  style='background: rgba(30,39,68,0.7);'><td style='vertical-align:top;padding-left:10px;padding-top:0px;' onclick='onDemandShowPage();'><p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(4vw + 4vh);'><</td></tr>";
                                item = item + "<tr  style='padding-bottom:10px; background: rgba(30,39,68,0.7);'><td style='vertical-align:bottom;padding-left:10px;padding-bottom:0px;'><p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(2vw + 2vh);'>"+video.NAME+"";
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(1vw + 1vh);'>"+video.INSTRUCTOR;
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(1.5vw + 1.5vh);'>"+video.WEEK+" "+video.TIME+"</td></tr></table>";
                                
                            $("#videoImage").append(item); 
                                item = "<table   class='font-roboto bg-grey' align='center' border='0' width='100%' style='border-spacing:0; border-collapse:collapse; color:#fff;'>";
                                item = item + "<tr  >";
                                item = item + "<td style='vertical-align:bottom;padding-left:10px;padding-bottom:0px;'><p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(2vw + 2vh);'>Difficulty";
                                item = item + "<td style='vertical-align:bottom;padding-left:10px;padding-bottom:0px;'><p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(2vw + 2vh);'>Rating";
                                item = item + "<tr >";
                                item = item + "<td style='background-color:#182039;vertical-align:bottom;padding-left:10px;padding-bottom:0px;'>";
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(1.5vw + 1.5vh);'>"+video.DIFFICULTY + "%</td>";
                                item = item + "<td style='background-color:#101425;vertical-align:bottom;padding-left:10px;padding-bottom:0px;'>";
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(1.5vw + 1.5vh);'>"+video.RATE+"%</td></tr></table>";

                            $("#difRating").append(item); 
                                item = "<table  class='font-roboto' align='center' border='0' width='100%'  style='border-spacing:0; border-collapse:collapse; color:white;'>";
                                item = item + "<tr><td style='vertical-align:bottom;padding-left:10px;padding-bottom:0px;'>";
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(1.5vw + 1.5vh);'>"+video.DESCRIPTION;
                                item = item + "</td></tr></table>";
                                
                                console.log(video.DESCRIPTION);
                            $("#videoDescription").append(item); 
                        });
         

                        
         
                    },
                    error: function (jqXHR, status) {
                        $("#listOndemands").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });
         
    } 








   function showFeatured()         

            {
                // clean list div...
                $("#featuredProd").empty();
                var iduser = document.getElementById('iduser').value;
                
                console.log('showFeatured');
 
               $.ajax({
                    type: "GET",
                    url: getURL()+"get-featured.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"uid":iduser},
                    success: function (result, jqXHR) {
         
                        var products = JSON.parse(result);
         
                     console.log(result);   
                    $.each(products,function(i, product){    
                                console.log(product.IMG);
                            var item = "<table class='font-roboto' class='bgimgprod' border='0' width='100%'  style='min-height:200px;background-size:auto; background:url("+product.IMG+") no-repeat center center;-webkit-background-size: 100% 100%;-moz-background-size: 100% 100%;-o-background-size: 100% 100%; background-size: 100% 100%;'  onclick='showProductDetail("+product.ID+")'>";
                                item = item + "<tr height='90%' ><td colspan=2></td></tr>";
                                item = item + "<tr height='10%' style='max-height:30px;background:rgba(0,0,0,0.7);color:#fff;'>"; 
                                item = item + "<td style='max-height:30px;vertical-align:center; padding-left:10px;'>";
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(2vw + 2vh);'>"+product.FEATURED;
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-size: calc(2vw + 1vh);'>"+product.BRIEF+"</td>";
                                item = item + "<td align='center' style='max-height:30px; padding: 15px 15px 0 0;'><table border='0'  width='20%' style='background-color:black; color:#fff;font-family:arial narrow;'>";
                                item = item + "<tr style='font-size:12px;'><td  align='center' >MAP -&nbsp;</td><td  align='center'> MSRP</td ></tr>";
                                item = item + "<tr><td bgcolor='#FFFFFF' align='center' colspan=2><font color='black' style='font-size:13px;'><b>$"+product.MAP+" - $"+product.MSRP+"</td></tr>";
                                
                                item = item + "<tr><td  align='right' style='font-size:10px;'>Wholesale:</td><td align='right'><font color='yellow'>$"+product.WHOLESALE+"</font></td></tr></table>";
                                item = item + "</td></table>";
                                item = item + "<p>";
                            $("#featuredProd").append(item); 
                        
                         });
                        
                    },
                    error: function (jqXHR, status) {
                        $("#msgListManuf").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });
         
    } 




   function playOndemandVideo(id)         

            {
                var iduser = document.getElementById('iduser').value;
    
                
                console.log('playOndemandVideo:' + id);
 
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-ondemand-detail.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"id":id},
                    success: function (result, jqXHR) {
         
                        var videos = JSON.parse(result);
         
                       
                    $.each(videos,function(i, video){    
                            console.log(video.USERIMG);
                            var item = "<table class='font-roboto' border='0' width='100%' style='background-color:#1e2744;max-height:50px;' >";
                            item = item + "<tr  style='height:20px;background:rgba(0,0,0,0.7);color:#fff;'><td colspan=2>&nbsp;&nbsp;&nbsp;&nbsp;LEADERBOARD</td></tr>"; 
                            item = item + "<tr  style='max-height:30px;background:#1e2744;color:#white;'>"; 
                            item = item + "<td style='vertical-align:center; padding-left:10px;'>";
                            item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(1.5vw + 1.5vh);'><img class='img-circle' width='50' src='"+video.USERIMG+"'></td>";
                            item = item + "<td align='center' style='padding: 0px 0px 0 0;'>";
                            item = item + "<p  style='color:white;font-size:14px;padding-top:10px;'>"+video.USERNAME+"</p><p style='color:white;font-size:14px;'>Total Output</p>";
                            item = item + "<p style='color:#21e7b6;font-weight:bold;font-size:14px;'>"+video.TOTALWATT+" watts </p></td ></tr>";
                            
                            item = item + "</table>";
                           
                                
                             $("#leaderBoard").html(item);  

                            showVideoOndemand(video.VIDEO,video.VIDEOOGG,video.VIDEOWEBM);                  
 
                        
                         });


                        
                    },
                    error: function (jqXHR, status) {
                        $("#msgListManuf").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });
         
    } 


   function showInstructor(schedid)         

            {
                var iduser = document.getElementById('iduser').value;
    
                
                console.log('showInstructor:' + schedid);
 
               $.ajax({
                    type: "GET",
                    url: getURL()+"get-instructor-detail.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"schedid":schedid},
                    success: function (result, jqXHR) {
         
                        var inst = JSON.parse(result);
         
                       
                            console.log(inst.IMG);
                            var item = "<div class='font-roboto font-white-1 ' style='background-color:#1e2744;min-height:100px;' >";
                            item = item + "<center>"; 
                            item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(2.5vw + 2.5vh);'><img class='img-circle' width='50' src='"+inst.IMG+"'></p>";
                            item = item + "<br><p  style='color:white;font-size:20px;padding-top:10px;'>"+inst.VIDEONAME+"</p>";
                            item = item + "<p  style='color:white;font-size:20px;padding-top:10px;'>"+inst.NAME+"</p>";
                            item = item + "<p style='font-weight:bold;font-size:16px;'>"+inst.DATE+" </p></td ></tr>";
                            
                            item = item + "</table></center>";
                           
                                
                             $("#instructorProfile").html(item);  

 
                        


                        
                    },
                    error: function (jqXHR, status) {
                        $("#instructorProfile").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });
         
    } 







 function showVideoOndemand(videoProd,videoogg,videowebm)  {       

    var video = document.getElementById('ondemandvideo');
    var sources = video.getElementsByTagName('source');
    console.log(videoProd);
    sources[0].src = videoProd;
    sources[1].src = videoogg;
    sources[2].src = videowebm;
    video.load();

}

 function videostartstop(videoProd,videoogg,videowebm)  {       

    var video = document.getElementById('ondemandvideo');
    var sources = video.getElementsByTagName('source');
    console.log("videostartstop");
    if (video.paused){
        console.log('play video paused');
        video.play();
    } 
    else
     if (video.ended){
        console.log('play video ended');
        video.play();
     }
     else
       video.pause(); 
    

}

 function videostop()  {       

    var video = document.getElementById('myvideo');
    var sources = video.getElementsByTagName('source');
    console.log("videostop");
    video.pause(); 
    

}

   function getUserProfile()         

            {
                var iduser = document.getElementById('iduser').value;
    
                
                console.log('getUserProfile:' + iduser);
 
               $.ajax({
                    type: "GET",
                    url: getURL()+"get-userdetail.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"uid":iduser},
                    success: function (result, jqXHR) {
         
                        var usr = JSON.parse(result);
         
                       
                            console.log("userimg:" + usr.USERIMG);
                            var item = "<table class='font-roboto' border='0' width='50%' style='background-color:#1e2744;max-height:50px;' >";
                            item = item + "<tr  style='max-height:30px;background:#1e2744;color:#white;'>"; 
                            item = item + "<td style='vertical-align:center; padding-left:10px;'>";
                            item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(1.5vw + 1.5vh);'><img class='img-circle' width='80px' src='"+usr.USERIMG+"'></td>";
                            item = item + "<td align='center' style='padding: 0px 0px 0 0;'>";
                            item = item + "<p  style='color:white;font-size:18px;padding-top:10px;'>"+usr.NAME+"</p>";
                            item = item + "<p style='color:white;font-weight:bold;font-size:18px;'>"+usr.CITY+" </p></td ></tr>";
                            
                            item = item + "</table>";
                           
                                
                             $("#profileUser").html(item);  


                        


                        
                    },
                    error: function (jqXHR, status) {
                        $("#profileUser").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });
         
    } 



   function getInstructorProfile(id)         

            {
                var iduser = document.getElementById('iduser').value;
    
                
                console.log('getInstructorProfile:' + iduser);
 
               $.ajax({
                    type: "GET",
                    url: getURL()+"get-instructor-detail.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"id":id},
                    success: function (result, jqXHR) {
         
                        var ins = JSON.parse(result);
         
                       
                            console.log("userimg:" + ins.USERIMG);
                            var item = "<table class='font-roboto' border='0' width='50%' style='background-color:#1e2744;max-height:50px;' >";
                            item = item + "<tr  style='max-height:30px;background:#1e2744;color:#white;'>"; 
                            item = item + "<td style='vertical-align:center; padding-left:10px;'>";
                            item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(1.5vw + 1.5vh);'><img class='img-circle' width='80px' src='"+ins.USERIMG+"'></td>";
                            item = item + "<td align='center' style='padding: 0px 0px 0 0;'>";
                            item = item + "<p  style='color:white;font-size:18px;padding-top:10px;'>"+ins.NAME+"</p>";
                            item = item + "<p style='color:white;font-weight:bold;font-size:18px;'>"+ins.CITY+" </p></td ></tr>";
                            
                            item = item + "</table>";
                           
                                
                             $("#profileInstructor").html(item);  


                        


                        
                    },
                    error: function (jqXHR, status) {
                        $("#profileInstructor").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });
         
    } 


   function getScheduleDetail(id)         

            {
                var iduser = document.getElementById('iduser').value;
    
                
                console.log('getScheduleDetail:' + iduser);
 
               $.ajax({
                    type: "GET",
                    url: getURL()+"get-schedule-detail.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"id":id},
                    success: function (result, jqXHR) {
         
                        var sch = JSON.parse(result);
         
                       
                            var item = "<table class='font-roboto' border='0' width='50%' style='background-color:#1e2744;max-height:50px;' >";
                            item = item + "<tr  style='max-height:30px;background:#1e2744;color:#white;'>"; 
                            item = item + "<td align='center' style='padding: 0px 0px 0 0;'>";
                            item = item + "<p  style='color:white;font-size:18px;padding-top:10px;'>"+sch.NAME+"</p>";
                            item = item + "<p style='color:white;font-weight:bold;font-size:18px;'>"+sch.TIME+" </p></td ></tr>";
                            
                            item = item + "</table>";
                           
                                
                             $("#scheduledetail").html(item);  


                        


                        
                    },
                    error: function (jqXHR, status) {
                        $("#scheduledetail").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });
         
    } 

















    function getCountClassTaken()         
{
    console.log('getCountClassTaken');
    var iduser = document.getElementById('iduser').value;    
                

               $.ajax({
                    type: "GET",
                    url: getURL()+"get-count-class-taken.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"id": iduser},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
                        
                        if (userData.QTY != "0"){
                            $("#showClassTaken").html("<center>"+userData.QTY+"<p>Workouts</p></center>");
                       }
                       else
                       {

                            $("#showClassTaken").html("<center>0<p>Workouts</p></center>");

                            var item = "<center>You haven't taken any<br> classes yes.</center>";
                            item = item +'<center><p><button class="btn widget uib_w_161 d-margins button-round" onclick="videosShowPage();" style="width:220px;font-size:12px;background-color:#21e7b6;color:white;" data-uib="twitter%20bootstrap/button" data-ver="1" id="listClasses">';
                            item = item + '<i class="glyphicon glyphicon-play button-icon-left" data-position="left"></i>TAKE YOUR FIRST CLASS</button></p></center>';
                            console.log(item);
                            $("#msgProfile").html(item);
                       }                                       
 

                    },
                    error: function (jqXHR, status) {
                        $("#msgListManuf").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });


}


    function updUserWatchClass(schedid)         
{
    console.log('updUserWatchClass');
    var iduser = document.getElementById('iduser').value;    
 //   var mark = document.getElementById('mark'+schedid).src;  
    var mark = $('#mark'+schedid).attr('src');
    console.log('mark:'+mark);  
                

               $.ajax({
                    type: "GET",
                    url: getURL()+"upd-user-watch-class.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"id": iduser, "sched":schedid},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
                        console.log(userData.STATUS);
                        if (userData.STATUS == "ADD"){

                        $("#mark" + schedid ).attr("src", "images/Arrow-sel.png");
//                        $("#mark" + schedid).attr("src", $('#srcVal').val()+"&"+Math.floor(Math.random()*1000));
                            console.log('ADD'+schedid);
                            showInstructor(schedid);
                            activate_page("#pg-bookm");
                       }
                       else
                       {
                            console.log('DEL'+schedid);
//                            var col=document.getElementById("mark"+schedid);
//                            col.style.background="#1e2744"; 
                        $("#mark" + schedid ).attr("src", "images/Arrow.png");

                       }                                       
 

                    },
                    error: function (jqXHR, status) {
                        $("#msgListManuf").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });


}


    function deleteUserWatchClass(schedid)         
{
    console.log('addUserWatchClass');
    var iduser = document.getElementById('iduser').value;    

               $.ajax({
                    type: "GET",
                    url: getURL()+"del-user-watch-class.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"id": iduser, "sched":schedid},
                    success: function (result, jqXHR) {
         
                        
                        
                    },
                    error: function (jqXHR, status) {
                        $("#msgListManuf").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });




}


 	


	function addUser()         

            {
				
					var email = document.getElementById('emailuser').value;
					var mobile = document.getElementById('mobileuser').value;
					var pwd = document.getElementById('passworduser').value;
					var error = true;
					console.log('addUser');
                $.ajax({
                    type: "GET",
                    url: getURL()+"articles/add-user.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
					data: {"email": email, "mobile":mobile, "pwd":pwd},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
 
                       if (userData.MESSAGE == "OK"){
                           $("#iduser").val(userData.UID);
						   $("#message-signup1").html('<center><b>'+userData.MESSAGE+'</center>');
						   activate_page("#signup2");
						   error = true;
                       }
                       else
                       {
                           $("#message-signup1").html('<center><b>'+userData.MESSAGE+'</center>');
                           error = false;
                       }                   
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-conf").html("<center>Server busy try again later... "+status+"</center>");
                        error = false;
					
					},
                });
				
				return error;
         
    } 	
  function updateUser()         

            {
				
					var uid = document.getElementById('iduser').value;
					var name = document.getElementById('name').value;
					var address = document.getElementById('address').value;
					var gender = document.getElementById('gender').value;
					var height = document.getElementById('height').value;
					var weight = document.getElementById('weight').value;
					console.log('addUser');
                $.ajax({
                    type: "GET",
                    url: getURL()+"update-user.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
					data: {"uid": uid, "name":name, "address":address , "gender":gender, "height":height, "weight":weight},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
 
                       if (userData.MESSAGE == "OK"){
                           $("#uid").val(userData.UID);
						   $("#message-signup-2").html('<center><b>'+userData.MESSAGE+'</center>');
                           sendText(userData.UID);
						   activate_page("#signup2");
                       }
                       else
                       {
                           $("#message-signup-2").html('<center><b>'+userData.MESSAGE+'</center>');
                       }                   
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-conf").html("<center>Server busy try again later... "+status+"</center>");
					
					},
                });
				
         
    }	

	
	
  function sendText(uid)         

            {
				
					console.log('sendText');
                $.ajax({
                    type: "GET",
                    url: getURL()+"send-text.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
					data: {"uid": uid},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
 
                       $("#message-signup-3").html('<center><b>'+userData.MESSAGE+'</center>');
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-signup-3").html("<center>Server busy try again later... "+status+"</center>");
					
					},
                });
				
         
    }	
	
	
	
function profile()         
            {
                $("#message-profile").html("<center>Finding profile information....</center>");
                var $uid = document.getElementById('iduser').value;
                $.ajax({
                    type: "GET",
                    url: getURL()+"profile.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"uid":$uid},
                    success: function (result, jqXHR) {
                       console.log(result);
						var userData = JSON.parse(result);
                       
                       
                       if (userData.MESSAGE == "OK"){
							$("#message-profile").html('<center><b>PROFILE</center>');
							$("#profileName").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Name:</b></td><td class="text-left">'+userData.NAME.trim()+'</td></tr></table>');
							$("#profileEmail").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Email: </b></td><td  class="text-left"">'+userData.EMAIL.trim()+'</td></tr></table>');
							$("#profileMobile").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Mobile: </b></td><td  class="text-left">'+userData.MOBILE.trim()+'</td></tr></table>');
							$("#profileAddress").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Address: </b></td><td  class="text-left">'+userData.ADDR.trim()+'</td></tr></table>');
							$("#profileGender").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Gender: </b></td><td  class="text-left">'+userData.GENDER.trim()+'</td></tr></table>');
							$("#profileHeight").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Height: </b></td><td  class="text-left">'+userData.HEIGHT.trim()+'</td></tr></table>');
							$("#profileWeight").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Weight: </b></td><td  class="text-left">'+userData.WEIGHT.trim()+'</td></tr></table>');
							activate_page("#profile");
                       }
                       else
                       {
                           $("#message-profile").html('<center><b>'+userData.MESSAGE+'</center>');

                       }                   
         
//                        $("#message-login").html("<center>Foram encontrado "+drivers.length+" Driver(s)</center>");
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-login").html("<center>Server busy try again later...  "+status+"</center>");
                        console.log(jqXHR.responseText);
                        console.log(jqXHR.status);
 
                    },
                });
         
    }

	
	
function sendEmail()         
            

            {
                $("#messageReturnEmail").html("<center></center>");
                $("#message-signup").html("<center></center>");
                var uid = document.getElementById('iduser').value; 
                var manuf = document.getElementById('idmanufacturer').value; 
                var typeEmail = document.getElementById('typeEmail').value; 
                var subject = document.getElementById('emailSubject').value; 
                var message = document.getElementById('emailText').value; 
                console.log('sendEmail to:'+manuf+'type:'+typeEmail);
                $.ajax({
                    type: "GET",
                    url: getURL()+"send-emailcontact.php",
                    timeout: 8000,
					data: {"uid": uid,"subject": subject,"message": message,"manuf": manuf,"typeemail": typeEmail},
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
                        console.log('RESULT EMAIL:'+result);
                        var retemail = JSON.parse(result);
                        console.log('RESULT EMAIL:'+result);
                        $("#messageReturnEmail").html("<center>Message Sent.</center>");
                        $("#message-signup").html("<center>Message Sent.</center>");

						//activate_page("#pg-services");
         
                    },
                    error: function (jqXHR, status) {
                        $("#messageReturnEmail").html("<center>Server busy try again later...  "+status+"</center>");
                    },
                });
         
    } 

function sendEmailSignup()         
            

            {
                $("#message-signup").html("<center></center>");
                var signupemail = document.getElementById('signupemail').value; 
                var nome = document.getElementById('signupname').value; 
                var typeEmail = document.getElementById('typeEmail').value; 
                var subject = document.getElementById('signupsubject').value; 
                var message = document.getElementById('signupmessage').value; 
                console.log('type:'+typeEmail);
                $.ajax({
                    type: "GET",
                    url: getURL()+"send-emailcontact.php",
                    timeout: 8000,
                    data: {"signupemail": signupemail,"signupname": nome, "signupsubject": subject,"signupmessage": message,"typeemail": typeEmail},
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
                        console.log('RESULT EMAIL:'+result);
                        var retemail = JSON.parse(result);
                        console.log('RESULT EMAIL:'+result);
                        $("#message-signup").html("<center>Message Sent.</center>");

                        //activate_page("#pg-services");
         
                    },
                    error: function (jqXHR, status) {
                        $("#messageReturnEmail").html("<center>Server busy try again later...  "+status+"</center>");
                    },
                });
         
    } 



function showEmailPage(typeEmail)         
            {
        if (typeEmail == 'DPG'){  
            $("#typeEmail").val(typeEmail);      
            activate_page("#email-DPG");
        }

        if (typeEmail == 'MANUF'){  
            $("#typeEmail").val(typeEmail);     
            var manuf = document.getElementById('idmanufacturer').value;
            if (manuf != ''){  
            activate_page("#email-DPG");
            }
            else
            {alert('Select Manufacturer First.')}
        }

        if (typeEmail == 'SIGNUP'){  
            $("#typeEmail").val(typeEmail);      
            activate_page("#email-signup");
        }

        } 

