import app from "./app.ts";
const port = Number(process.env.PORT);


app.listen(port,()=>{
    console.log ("Backend is running")
})