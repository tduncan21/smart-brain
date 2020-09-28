import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Loader from './components/Loader/Loader';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import History from './components/History/History';
import Particles from 'react-particles-js';
// import Emoji from './components/Emoji/Emoji';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 160,
      density: {
        enable: false
      }
    },
    size: {
      value: 5,
      random: true,
      anim: {
        speed: 2,
        size_min: 0.1
      }
    }
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "grab"
      },
      onclick: {
        enable: true,
        mode: "remove"
      }
    },
    modes: {
      grab: {
        line_linked: {
          opacity: 1
        },
        distance: 500
      }
    }
  },
  detect_on: "window"
}

const initialState = {
  input: '',
  loader: false,
  showHistory: false,
  imageUrl: '',
  box: {},
  route: 'home',
  isSignedIn: true,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      loader: false,
      showHistory: false,
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions;
    const image = document.getElementById('input-image');
    const width = Number(image.width);
    const height = Number(image.height);
    return clarifaiFace.map((face) => {
      return {
        leftCol: face.region_info.bounding_box.left_col * width,
        topRow: face.region_info.bounding_box.top_row * height,
        rightCol: width - (face.region_info.bounding_box.right_col * width),
        bottomRow: height - (face.region_info.bounding_box.bottom_row * height)
      };
    })
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    this.toggleLoader(true);
    fetch('https://cryptic-headland-91421.herokuapp.com/imageurl', { 
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
        if (response) {
          fetch('https://cryptic-headland-91421.herokuapp.com/image', { 
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(entries => this.setState(Object.assign(this.state.user, { entries: entries})));
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
        this.toggleLoader(false);
    }).catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  onToggleHistory = (showHistory) => {
    this.setState({showHistory: !showHistory.showHistory});
  }

  toggleLoader = (data) => {
    this.setState({loader: data});
  }

  render() {
    const { isSignedIn, imageUrl, route, box, showHistory, loader } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} onToggleHistory={this.onToggleHistory} showHistory={showHistory}/>
        {(route === 'home') 
        ? <div>            
            <Logo/>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/>
            {(showHistory) && <History />}
          </div>
        : (
            route === 'signin' || route === 'signout'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} toggleLoader={this.toggleLoader}/> 
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }   
        {(loader) && <Loader/>}

      </div>
      );
  }  
}

export default App;
