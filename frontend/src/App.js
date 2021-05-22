import React, { Component } from "react"
import axios from 'axios';
import './App.css';
import Modal from 'react-modal'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            user_email: "",
            responseMsg: "",
            responseHeader: "",
            modalIsOpen: false,
            user_list: [],
            show_subscribers: false,
            buttonName: "Show All Subscribers"
        }
    }
    componentDidMount(){
        axios.get('http://localhost:8000/subscribe/api/todos/')
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    }

    changeHandler = (event) => {
        this.setState({
            user_email: event.target.value,
            responseMsg: "NA"
        });
    }

    submitHandler = (e) => {
        e.preventDefault()
        var axios = require('axios');
        var FormData = require('form-data');
        var data = new FormData();
        data.append('user_email', this.state.user_email);

        var config = {
          method: 'post',
          url: 'http://localhost:8000/subscribe/api/todos/',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          },
          data : data
        };

        axios(config)
        .then(response => {
          console.log(JSON.stringify(response.data));
          this.setState({responseMsg: "You are subscribed to this newsletter", responseHeader: "Thank You"})
          this.setState({
                modalIsOpen:true
            })
        })
        .catch(error => {
          console.log(error.response.data.user_email);
          if(JSON.stringify(error.response.data.user_email)===JSON.stringify(["subscribed user with this user email already exists."])){
            this.setState({responseMsg: "This user is subscribed already", responseHeader: "Sorry"});
            this.setState({
                modalIsOpen:true
            });
          }
        });
    }

    ListUsers = (e) => {
        e.preventDefault()
        var axios = require('axios');
        var config = {
          method: 'get',
          url: 'http://localhost:8000/todo/list-users/',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          },
        };
        axios(config)
        .then(response => {
          console.log(JSON.stringify(response.data.users));
          this.setState({user_list: response.data.users})
        })
        .catch(error => {
          console.log(error);
        });
    }

    ClickFunction = (e) => {
        this.ListUsers(e);
        if(this.state.show_subscribers===false){
            this.setState({
                show_subscribers: true
            });
        }
        else{
            this.setState({
                show_subscribers: false
            });
        }
        if(this.state.buttonName==="Show All Subscribers"){
            this.setState({
                buttonName: "Hide Subscribers"
            })
        }
        else{
            this.setState({
                buttonName: "Show All Subscribers"
            })
        }
    }

    render() {
      return (
        <main className="content h-screen">
            <div>
                <button className="bg-red hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 mt-4 absolute border border-gray-400 rounded shadow" id="UserListButton" onClick={this.ClickFunction}>{this.state.buttonName}</button>
            </div>
            <div className="container">
                <p className="text-5xl">Get Exciting News to Your Inbox</p>
                <p className="add_line">Loopclub writes to his friends every week with new content</p>
                <form action={this.props.action}
                    method={this.props.method}
                    onSubmit={this.submitHandler}>
                    <div className="box-border h-20 p-4">
                      <div className="center">
                      <label htmlFor="user_email">Enter Your Email: </label>
                      <input type="email" name="user_email" id="user_email_input" onChange={this.changeHandler} className="placeholder-gray-500 placeholder-opacity-100" placeholder="&emsp;&emsp;&emsp;rohit@example.com"></input>
                      &emsp;
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded" type="submit"> Subscribe </button>
                      </div>
                    </div>
                </form>
            </div>
            <Modal className="ResponseModal" isOpen={this.state.modalIsOpen} ariaHideApp={false}>
                <div className="bg-blue bg-opacity-50 fixed inset-0 flex justify-center items-center">
                    <div className="bg-gray-200 mx-w-sm py-2 px-3 rounded shadow-xl text-gray-800 w-96 h-56">
                        <div className="flex justify-between items-center">
                            <h4 className="text-3xl font-bold">{this.state.responseHeader}</h4>
                            <button className="px-3 py-1 rounded hover:bg-red-300 hover:bg-opacity-50 hover:text-red-900" onClick={() => this.setState({modalIsOpen:false})}>x</button>
                        </div>
                        <div className=" w-92 h-32">
                            <p className="mt-12 text-justify text-xl">{this.state.responseMsg}</p>
                        </div>
                    </div>
                </div>
            </Modal>
            <div>
                {this.state.show_subscribers ?(
                  <div class="flex flex-col h-scree">
                    <div class="flex-grow overflow-auto w-1/5 h-screen left-3/4 absolute">
                       <table className="relative w-full border">
                          <thead>
                              <tr>
                                  <th className="border border-green-600 sticky top-0 px-6 py-3 text-red-900 bg-red-300">Subscribed Users</th>
                              </tr>
                          </thead>
                          <tbody>
                              {this.state.user_list.map(user => (
                                <tr key={user.id}>
                                  <td className="border border-green-600 px-6 py-4 text-center">{user.user_email}</td>
                                </tr>
                              ))}
                          </tbody>
                       </table>
                    </div>
                  </div>
                  ) : (
                    <div></div>
                  )
                }
            </div>
        </main>
      )
    }
  }

export default App;