const express=require("express")
const app=express()
const {open}=require("sqlite")
const sqlite3=require("sqlite3")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const path=require("path")

const dbPath=path.join(__dirname,"userdetails.db")
let db
app.use(express.json())
const cors=require("cors")
app.use(cors())
const initialization= async ()=>{
    try{

    db= await open({filename:dbPath,
        driver:sqlite3.Database
    })
    app.listen(3003,(()=>{
        console.log("server is started")


    }))
    fun()
}
catch(e){
    console.log(e.message)
}

}
initialization()
const middleWare=(request,response,next)=>{
    const {authorization}=request.headers
    const auth=authorization
    const a=auth.split(" ")
    const k=a[1]
    if (auth===undefined){
        response.send("invalid user")
    }
    else{
        if (k===undefined){
            response.send("invalid user")

        }
        else{
            jwt.verify(k,"my_string",async(error,payload)=>{
                if (error){
                    response.send("invalid user")
                }
                else{
                    request=payload
                    next()
                }
            })
        }
    }


}
app.post("/login",async (request,response)=>{
    const {userName,password}=request.body
    const a=`select *
    from users
    where username="${userName}"`
    const b=await db.get(a)
    if (b===undefined){
        response.send("user not exist")
    }
    else{
        const c=await bcrypt.compare(password,b.password)
        if (c){
            const payload={username:userName}
            const d=jwt.sign(payload,"my_string")
            response.send({jwtToken:d})
           }
        else{
            response.send("invalid password")

        }
        
    }
})
const fun = async () => {
    try {
      const userData = await db.all(`SELECT * FROM users`);
      console.log(userData);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

app.post("/createrow",async (request,response)=>{
    const {userName,password}=request.body
    const c=await bcrypt.hash(password,10)
    const a=`insert into users (username,password)
    
    values ("${userName}","${c}")

    `
    const b=await db.run(a)
    response.status(200).send("successfully updated")
})
app.get("/user/:id",async (request,response)=>{
    const {id}=request.params
    const a=`select *
    from users
    where id="${id}";`
    const b= await db.get(a)
    response.send(b)
})
app.put("/update/:id",async (request,response)=>{
    const {id}=request.params
    const {userName}=request.body
    const a=`update users
    set username="${userName}"
    where id="${id}"`
    const b=await db.run(a)
    response.status(200).send("updated successfully")
})
app.delete("/delete/:id",middleWare,async (request,response)=>{
    const {id}=request.params
    const a=`delete from users
    where id="${id}";`
    const b=await db.run(a)
    response.send("deleted successfully")
})