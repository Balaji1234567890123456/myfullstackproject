import {Component} from "react"
class Todo extends Component{
    state={
        userInput:"",
        userList:[]
    }
    onClickAdd=()=>{
        const {userInput}=this.state
        const a={
            userInput,
        }
        this.setState(prevState=>({userList:[...prevState.userList,a]}))
    }
    render(){
        const {userInput,userList}=this.state
        return (
            <>
            <div style={{display:"flex"}}>
            <input type="text" placeholder="enter text" value={userInput} />
            <button onClick={this.onClickAdd}>Add</button>
            </div>
            <ul style={{display:"flex",flexDirection:"column"}}>
                {
                    userList.map(eachItem=><><li style={{listStyleType:"none"}}><div style={{display:"flex",justifyContent:"space-between"}}><h1>{eachItem.userInput
                    }</h1>
                    <button>delete</button></div></li></>
                )
                }
            </ul>
            </>
        )
    }
}
export default Todo