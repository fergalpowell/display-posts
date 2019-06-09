import React from 'react';
import Comment from "./Comment";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import FavouriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import FavouriteIcon from "@material-ui/icons/Favorite"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


class Posts extends React.Component{
    constructor (){
        super();
        this.state = {
          commentData: '',
            newCommentData: [],
            commentDataLength: 0
        };
        this.toggleFavourite = this.toggleFavourite.bind(this);
    }

    getComments(id) {
      fetch("https://jsonplaceholder.typicode.com/comments?postId=" + id)
        .then(res => res.json())
        .then(data => {
            this.setState({commentData: data});
            this.setState({commendDataLength: data.length})
        });
    }

    addComment(){
        let body = document.getElementById("new-comment-input-" + this.props.data.id).value;
        if(body !== ""){
            let id = this.state.commentDataLength + 1;
            let name = "Fergal Powell";
            let email = "fergal.powell@gmail.com";
            let data = {"postId": this.props.data.id, "id": id, "name": name, "email": email, "body": body};
            this.state.newCommentData.push(data);
            this.setState({CommentDataLength: id});
            document.getElementById("new-comment-input-" + this.props.data.id).value = "";

            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'post',
                body: JSON.stringify(data)
            }).then(response => console.log(response));
            console.log(this.state.newCommentData);
        }
    }

    toggleFavourite(state){
        switch (state) {
            case 0:
                document.getElementById("favourite-border-" + this.props.data.id).style.display = "none";
                document.getElementById("favourite-" + this.props.data.id).style.display = "block";
                break;

            case 1:
                document.getElementById("favourite-border-" + this.props.data.id).style.display = "block";
                document.getElementById("favourite-" + this.props.data.id).style.display = "none";
                break;

            default:
                break;

        }
    }

    render(){
        return(
            <div>
                <Card className={"post-card"}>
                  <CardContent>
                      <Typography variant="h5" component="h2" style={{marginBottom: 10}}>
                          <MoreVertIcon style={{fontSize: 32, float: "right"}}/>
                          <Menu>
                              <MenuItem>Share</MenuItem>
                              <MenuItem>Delete</MenuItem>
                              <MenuItem>Report</MenuItem>
                          </Menu>
                          {this.props.data.title}
                    </Typography>
                    <Typography color="textPrimary" gutterBottom>
                      {this.props.data.body}
                    </Typography>
                  </CardContent>
                  <CardActions>
                      <ExpansionPanel className={"expand-comments"} onClick={()=> this.getComments(this.props.data.id)}>
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography >View Comments</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <Typography>
                            {this.state.commentData ? this.state.commentData.map(data =>
                                <Comment data={data}/>):<CircularProgress/>}
                            {this.state.newCommentData ? this.state.newCommentData.map(data =>
                                <Comment data={data}/>):""}
                            <div className={"new-comment-group"}>
                                <TextField
                                    id={"new-comment-input-" + this.props.data.id}
                                    label="New Comment"
                                    placeholder="What's on your mind...?"
                                    className={"new-comment"}
                                    multiline
                                    rows="4"
                                    margin="normal"
                                    variant="outlined"
                                />
                                <Button className={"submit-comment"}
                                        onClick={() => {this.addComment()}}
                                        variant="contained" color="primary">
                                    Submit
                                </Button>
                            </div>
                          </Typography>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                  </CardActions>
                    <FavouriteBorderIcon id={"favourite-border-" + this.props.data.id} color="error"
                                         onClick={()=> this.toggleFavourite(0)}
                                         style={{fontSize: 32}}/>
                    <FavouriteIcon id={"favourite-" + this.props.data.id} color="error"
                                   onClick={()=> this.toggleFavourite(1)}
                                   style={{display: "none", fontSize: 32}}/>
                </Card>
            </div>
        );
    }
}

export default Posts;