/*import {Component} from "react"
import Cookies from "js-cookie"
import {Navigate} from "react-router-dom"
class Register extends Component{
    state={
        isError:false,
        inputUserName:"",
        inputPassword:""
    }
    storeItem=(a)=>{
        
        const {inputUserName}=this.state
        Cookies.set(inputUserName,JSON.stringify(a),{expires:10})

    }
    registerUser= async (event)=>{
    event.preventDefault()
        const {inputUserName,inputPassword}=this.state
        const a={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({userName:inputUserName,password:inputPassword})
        }
        const b=await fetch ("http://localhost:3003/createrow",a)
        if (b.ok){
            const c=await b.json()
            this.storeItem(c.username)
            this.setState({isError:false,inputUserName:"",inputPassword:""})
        }
        else{
            this.setState({isError:true})     }

    }
    
    onChangeUserName=event=>{
        this.setState({inputUserName:event.target.value})
    }
    onChangePassword=event=>{
        this.setState({inputPassword:event.target.value})
    }
    render(){
        const {isError,inputPassword,inputUserName}=this.state
        const c=Cookies.get(inputUserName)
        if (c){
            return <Navigate to="/todo"/>
        }
        return (
            <>
            <div style={{backgroundColor:"green",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <form style={{backgroundColor:"white",height:"500px",width:"500px",display:"flex",flexDirection:"column",justifyContent:"center",padding:"10px",borderRadius:"20px"}} onSubmit={this.registerUser}>
                    <h1>Registration Form</h1>
                    <label for="username">
                        username
                    </label>
                    <input type="text" id="username" value={inputUserName} onChange={this.onChangeUserName}/>
                    <label for="password">
                        userpassword
                    </label>
                    <input type="password" id="password" value={inputPassword} onChange={this.onChangePassword}/>
                    <div>
                        <button type="submit" >Register</button>
                    
                    </div>


                </form>
                {isError && <p>User not valid</p>}

            </div>
            </>
        )
    }

}
export default Register*/
import { Component } from "react";
import Cookies from "js-cookie";
import { Navigate} from "react-router-dom";

class Register extends Component {
    state = {
        isError: false,
        inputUserName: "",
        inputPassword: ""
    };

    storeItem = (a) => {
    
        Cookies.set("hi", JSON.stringify(a), { expires: 10 });
    };

    registerUser = async (event) => {
        event.preventDefault();
        const { inputUserName, inputPassword } = this.state;
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userName: inputUserName, password: inputPassword })
        };
        const response = await fetch("http://localhost:3003/createrow", requestOptions);

    

        if (response.ok) {
            const result = await response.json();
            this.storeItem(result.username);
            this.setState({ isError: false, inputUserName: "", inputPassword: "" });
        } else {
            this.setState({ isError: true });
        }
    };

    onChangeUserName = (event) => {
        this.setState({ inputUserName: event.target.value });
    };

    onChangePassword = (event) => {
        this.setState({ inputPassword: event.target.value });
    };
    isUserValid=(a)=>{
        const c=Cookies.get(a)
        if (c){
            return <Navigate to="/todo"/>
        }
        else{
           return <Navigate to="/"/>
        }
    }
    render() {
        const { isError, inputPassword, inputUserName } = this.state;
        const cookieValue = Cookies.get(inputUserName);
        if (cookieValue) {
            return <Navigate to="/todo" />;
        }
        return (
            <div style={{ backgroundColor: "green", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <form style={{ backgroundColor: "white", height: "500px", width: "500px", display: "flex", flexDirection: "column", justifyContent: "center", padding: "10px", borderRadius: "20px" }} onSubmit={this.registerUser}>
                    <h1>Registration Form</h1>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={inputUserName} onChange={this.onChangeUserName} />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={inputPassword} onChange={this.onChangePassword} />
                    <div>
                        <button type="submit">Register</button>
                        <button onClick={()=>this.isUserValid("hi")}>login</button>
                    </div>
                </form>
                {isError && <p>User not valid</p>}
            </div>
        );
    }
}

export default Register;
