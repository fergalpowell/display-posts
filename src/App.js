import React from 'react';
import './App.css';
import Posts from './Posts.js'
import CircularProgress from '@material-ui/core/CircularProgress';


class App extends React.Component{
    constructor (){
        super();
        this.state = {
            postData: '',
            fetchingData: true,
        };
    }
    componentDidMount() {
      fetch("https://jsonplaceholder.typicode.com/posts")
          .then(res => res.json())
          .then(data => this.setState({postData: data}))
          .then(() => this.setState({fetchingData: false}));
    }

    render() {
        return (
            <div className="App">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <h1 id={"title"}>Fergal's Post App</h1>
                {this.state.postData ? this.state.postData.map(data => <Posts data={data}/>):<CircularProgress/>}
            </div>
        );
    }
}

export default App;
