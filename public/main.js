const form=document.getElementById('vote-form');

form.addEventListener('submit',(e)=>{
    const choice=document.querySelector('input[name=os]:checked').value;
    const data={os:choice};
    fetch('http://localhost:5000/poll',{
        method:'post',
        body:JSON.stringify(data),
        headers:new Headers({'Content-type':'application/json'})
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err));

    e.preventDefault();
});

fetch('http://localhost:5000/poll')
.then(res=>res.json())
.then(data=>{
const votes=data.votes;
const totalVotes=votes.length;
const votesCount=votes.reduce((acc,vote)=>
((acc[vote.os]=(acc[vote.os]||0)+parseInt(vote.points)),acc),{});


let dataPoints=[
    {label:'Window',y:votesCount.Window},
    {label:'Macos',y:votesCount.Macos},
    {label:'Linux',y:votesCount.Linux},
    {label:'Other',y:votesCount.Other}
];

const chartContainer=document.getElementById('chartContainer');
if(chartContainer){
    const chart=new CanvasJS.Chart('chartContainer',{
        animationEnabled:true,
        theme:'theme1',
        title:{
            text:'os result'
        },
        data:[{
            type:'column',
            dataPoints:dataPoints
        }]
    });
    chart.render();

//pusher
Pusher.logToConsole = true;

var pusher = new Pusher('58a2283386b387fb57a0', {
  cluster: 'ap2',
  forceTLS: true
});

var channel = pusher.subscribe('os-poll');
channel.bind('os-vote', function(data) {
 datapoints= dataPoints.map(x=>{
      if(x.label===data.os){
          x.y+=data.points;
          return x;
      }else{
          return x;
      }
  });
  chart.render();
});


}

});


