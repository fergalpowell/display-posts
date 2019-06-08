import React from 'react';
import Comment from "./Comment";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


class Posts extends React.Component{
    constructor (){
        super();
        this.state = {
          commentData: '',
        };
    }

    getComments(id) {
      fetch("https://jsonplaceholder.typicode.com/comments?postId=" + id)
        .then(res => res.json())
        .then(data => this.setState({commentData: data}));
    }

    render(){
        return(
            <div>
                <Card>
                  <CardContent>
                      <Typography variant="h5" component="h2">
                      {this.props.data.id}) {this.props.data.title}
                    </Typography>
                    <Typography color="textPrimary" gutterBottom>
                      {this.props.data.body}
                    </Typography>
                  </CardContent>
                  <CardActions>
                      <ExpansionPanel onClick={()=> this.getComments(this.props.data.id)}>
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography >View Comments</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <Typography>
                            {this.state.commentData ? this.state.commentData.map(data => <Comment data={data}/>):''}
                          </Typography>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                  </CardActions>
                </Card>
            </div>
        );
    }
}

export default Posts;