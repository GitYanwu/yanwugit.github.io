var query = new AV.Query("Counter");
//     query.find().then((result) => {
//         if(result && result.length > 0){
//           // 遍历赋值
//           for(var i=0;i<result.length;i++){
//             var postTitle = result[i]._serverData.title;
//             var postDate = result[i]._serverData.date;
//             var postTime = result[i]._serverData.time;
//             var id= "postTime_" + String(postTitle) + String(postDate); 
//             document.getElementById(id).innerHTML = postTime;
//           }
//         }
//     });