import './App.css';
import axios from 'axios';
import React from "react";
import react from 'react';

class App extends react.Component{
  constructor(props){
    super(props);
    this.state={
      id:"",
      avatar:"",
      name:"",
      createdAt:"",
      button:"New User",
      userData:[]
    }
  }
  //Get data
  getdata=async()=>{
    try{
      const {data}=await axios.get("https://611f26339771bf001785c728.mockapi.io/users");
      this.setState({userData:data});
    }
    
    catch(err){
      console.log("Error Ocuured",err);
    }

  }
  //Delete Post
  deletePost=async(id)=>{
    try{
      await axios.delete(`https://611f26339771bf001785c728.mockapi.io/users/${id}`);
      var userData=[...this.state.userData]
      userData=userData.filter((post)=>post.id!==id);
      this.setState({userData});
    }
    catch(err){
      console.log("Error Occured",err);
    }
  }

  //Edit Post
  editPost=async()=>{
    const {id,name,avatar}=this.state;
    try{
      const {data:user}=await axios.put(`https://611f26339771bf001785c728.mockapi.io/users/${id}`,{
        name,
        avatar
      })
      var users=[...this.state.userData]
      const index=users.findIndex((user)=>user.id===id)
      users[index]=user;
      this.setState({userData:users,name:"",avatar:"",button:"Add User",id:""})
    }
    catch(err){
      console.log("Error Occured",err);
    }
  }

  //New Post

  newPost=async()=>{
    this.state.createdAt=new Date();
    const {name,avatar,createdAt}=this.state;
    try{
      const {data:user}=await axios.post(`https://611f26339771bf001785c728.mockapi.io/users`,{
      name,
      avatar,
      createdAt
      })
      console.log(user);
      var users=[...this.state.userData,user]
      this.setState({userData:users,avatar:"",name:""});
    }
    catch(err){
      console.log("Error Occurred",err);
    }
  }



  componentDidMount(){
    this.getdata();
  }
  handleChange=({target:{name,type,value}})=>{
    this.setState({[name]:value})
  }
  handleSubmit=(event)=>{
    event.preventDefault();
    if(this.state.id){
      this.editPost();
    }
    else{
      this.newPost();
    }
  }

  render(){
    return(
      <div>
      <header className="text-center title">CRUD Operation -React Js</header>
      <form onSubmit={this.handleSubmit} className="my-5">
      <div className="nameBox col-10 col-md-5">
      <label className="col-4  col-md-3"><strong>
      Name:</strong>
      </label>

      <input className="form-control input1" name="name" value={this.state.name} onChange={this.handleChange}></input>
      </div>

      <div className="nameBox col-10 col-md-5">
      <label className="col-4 col-md-3"><strong>
      Image Source:</strong>
      </label>

      <input className="form-control input2" name="avatar" value={this.state.avatar} onChange={this.handleChange}></input>
      </div>
      <div className="text-center col-10 col-md-5">
        <input 
          type="submit"
          value={this.state.button}
          className="btn btn-warning my-4"
        />
      </div>
      </form>
      <h2 className="text-center userTitle">USERS LIST</h2>
      <div className="outerBox">
        {this.state.userData.map((data)=>{
          return(
          <div className="userBox mx-4 my-4 py-3">
            <div className="imgBtn">
              <img  className="image" src={data.avatar} alt="image here"/>
              <div className="btnDiv">
                <button className="btn btn-secondary mx-5 my-2" onClick={()=>this.setState({...data,button:"Update Data"})}>Edit</button>
                <button className="btn btn-danger mx-5 " onClick={()=>this.deletePost(data.id)}>Delete</button>
              </div>
            </div>
          <div className="content my-4">
            <div className="name">
            <h4>Name:</h4><p className="value mx-2">{data.name}</p>
            </div>
            <div className="name">
            <h4 className="name">Joined: </h4><p className="value mx-2">{new Date(data.createdAt).toDateString()}</p>
            </div>
          </div>
          </div>)
          
        })}
      </div></div>
    );
  }
}

export default App;
