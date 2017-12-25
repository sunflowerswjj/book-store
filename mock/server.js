let http=require("http");
let fs=require("fs");
let url=require("url");
let sliders=require("./sliders");
let pageSize=6;

function read(cb) {
  fs.readFile("./book.json",function (err,data) {
    if(err||data.length==0){
      cb([]);
    }else {
      cb(JSON.parse(data));
    }
  })
}
function write(data,cb) {
  fs.writeFile("./book.json",JSON.stringify(data),cb)
};
http.createServer((req,res)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By",' 3.2.1');
  if(req.method=="OPTIONS") return res.end();/*让options请求快速返回*/

  let {pathname,query}=url.parse(req.url,true);
  if(pathname=="/sliders"){
      res.end(JSON.stringify(sliders));
      return;
    }

  if(pathname==="/hot"){
    read(function (books) {
      let hot=books.reverse().slice(0,6);
      res.setHeader("content-type","application/json;charset=utf-8");
     setTimeout(()=>{
       res.end(JSON.stringify(hot));
     },2000)
    })
    return;

  };
  if(pathname==="/page"){
    let offset=parseInt(query.offset);
    read(function (books) {
      let result=books.slice(offset,offset+pageSize);
      let hasMore=true;
      if(books.length<=offset+pageSize){
          hasMore=false;
      }
      res.end(JSON.stringify({hasMore,book:result}));

    })
    return;
  }
  if(pathname==="/book"){
    let id=parseInt(query.id);
    switch (req.method){
      case "GET":
        if(id){
          read(function (books) {
            let book=books.find(item=>item.bookId==id);
            res.setHeader("content-type","application/json;charset=utf-8");
            res.end(JSON.stringify(book));
          })

        }else {
          read(function (books) {
            res.setHeader("content-type","application/json;charset=utf-8");
            res.end(JSON.stringify(books.reverse()));
          })
        }
        break;
      case "POST":
        let str="";
        req.on("data",function (chunk) {
          str+=chunk;
        })
        read(function (books) {
          let book=JSON.parse(str);
          book.bookId=books.length>0?books[books.length-1].bookId+1:1;
          books.push(book);
          write(books,function () {
            res.end(JSON.stringify(books));
          })
        })
        break;
      case "PUT":
        if(id){
          let str="";
          req.on("data",function (chunk) {
            str+=chunk;
          })
          read(function (books) {
            let book=JSON.parse(str);
            books=books.map(item=>{
              if(item.bookId==id){
                return book
              }
              return item;
                })
            write(books,function () {
              res.end(JSON.stringify(books));
            })
          })
        }
        break;
      case "DELETE":
        if(id){
          read(function (books) {
              books=books.filter(item=>item.bookId!=id);
              write(books,function () {
                res.end(JSON.stringify({}));
              })
          })
        }
        break;
    }
  }

}).listen(5000);
