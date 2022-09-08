const http = require('http');
const fs= require('fs');
const requests= require('requests');

const homeFile= fs.readFileSync('Home.html','utf-8');

const replaceval=(tempval,orgval)=>{
            let temprature= tempval.replace('{%tempval%}',orgval.main.temp);
            temprature= temprature.replace('{%tempmin%}',orgval.main.temp_min);
            temprature= temprature.replace('{%tempmax%}',orgval.main.temp_max);
            temprature= temprature.replace('{%location%}',orgval.name);
            temprature= temprature.replace('{%country%}',orgval.sys.country);
            temprature= temprature.replace('{%tempstatus%}',orgval.weather[0].main);
            return temprature;
}

const server=http.createServer((req,res)=>{
        if(req.url==='/')
        {   
            //============================================================//
            requests("https://api.openweathermap.org/data/2.5/weather?q=pune&units=metric&appid=6bc2f1eb9fd65b47317e0328a11ab647")
            .on('data',  (chunk) =>{
                const objdata=JSON.parse(chunk);
                const ArrayData=[objdata];
            //   console.log(ArrayData[0].main.temp);//temp
            //   console.log(ArrayData[0].main.temp);//temp
            const realTimeData=ArrayData.map(val=>replaceval(homeFile,val)).join("");
            res.write(realTimeData);
            // console.log(realTimeData);

            })
            .on('end',  (err)=> {
              if (err) return console.log('connection closed due to errors', err);
              res.end();
             
              console.log('end');
            });
            //=======================================================//



            // res.writeHead(200,{'content-type':'text/html'});
            // res.write(homeFile);
            // res.end();
        }
}).listen(8000,'127.0.0.1',()=>{
    console.log('connected');
});
