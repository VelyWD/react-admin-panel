import React from 'react';
import UserList from './components/UserList';
import UserAddForm from './components/UserAddForm';
import './App.css';
import PostList from './components/PostList';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      background: 'white',
      color: 'black',
      users: [],
      showUsers: true,
      showPosts: false
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if(!response.ok) {
            throw new Error("Response did not succeed.");
        }
        return response.json();
      })
      .then(data => {
        data = data.filter(user => user.id < 4);
        data.forEach(user => {
          user.isGoldClient = false;
          user.image = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.clipartkey.com%2Fmpngs%2Fm%2F152-1520367_user-profile-default-image-png-clipart-png-download.png&f=1&nofb=1&ipt=5dc48826da5645ef6e36453a0ffe3280db8016f6bedbcd762697d4ee4b667162&ipo=images';
          user.salary = '$' + Math.floor(Math.random() * 6500 + 1000);
        });
        this.setState({users: data});
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation: ", error);
      })
  }

  changeBgColor(event) {
    this.setState({background: event.target.value});
  }

  changeTextColor(event) {
    this.setState({color: event.target.value});
  }

  toggleShowUsers(event) {
    this.setState(prevState => {return {showUsers: !prevState.showUsers}})
  }

  toggleShowPosts(event) {
    this.setState(prevState => {return {showPosts: !prevState.showPosts}})
  }
  
  deleteUser(event, id) {
    this.setState(prevState => {
      return {
        users: prevState.users.filter(user => user.id != id)
      }
    })
  }

  getMaxId(users) {
    let maxId = 0;

    users.forEach(user => {
      if (user.id > maxId) {
        maxId = user.id;
      }
    });

    return maxId;
  }

  submitAddForm(event, name, email, isGoldClient, salary, image) {
    event.preventDefault();
    if(!email.includes('@') || !email.includes('.')) {
      alert("Adresa de email introdusa nu este valida.");
    }
    else if(name.length == 0) {
      alert("Numele nu poate fii gol.");
    }
    else {
      this.setState(prevState => {
        return {
          users: [
            ...prevState.users,
            {
              id: this.getMaxId(prevState.users) + 1,
              name,
              email,
              isGoldClient,
              salary,
              image
            }
          ]
        }
      });
    }
  }

  render() {
    return(
      <div className="app" style={{background: this.state.background, color: this.state.color}}>
        <h1>Admin panel - Proiectul 1</h1>
        <button onClick={(event) => this.toggleShowUsers(event)}>{this.state.showUsers ? 'Ascunde useri' : 'Afiseaza useri'}</button>
        <button onClick={(event) => this.toggleShowPosts(event)}>{this.state.showPosts ? 'Ascunde postari' : 'Afiseaza postari'}</button>
        <UserAddForm submitAddForm={(event, name, email, salary, image, isGoldClient) => this.submitAddForm(event, name, email, salary, image, isGoldClient)}/>
        {this.state.showUsers ?
          <UserList deleteUser={(event, id) => this.deleteUser(event, id)} users={this.state.users}/> :
          ""}
        {this.state.showPosts ?
          <PostList users={this.state.users}/> :
          ""}
        <p>Schimbati culoarea de fundal:</p>
        <input type="color" onChange={(event) => this.changeBgColor(event)}/>
        <p>Schimbati culoarea textului:</p>
        <input type="color" onChange={(event) => this.changeTextColor(event)}/>
      </div>
    );
  }
}

export default App;
