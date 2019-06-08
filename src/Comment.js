import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class Comment extends React.Component{
    render(){
        return(
            <div>
                <Paper>
                    <Typography variant="p" component="p">
                      {this.props.data.body}
                    </Typography>
                    <Typography color="textSecondary" component="p">
                      {this.props.data.name} - {this.props.data.email}
                    </Typography>
                </Paper>
            </div>
        );
    }
}

export default Comment;