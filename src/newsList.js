import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const NewsList = observer(
    class NewsList extends Component {
        render() {
            return (<div>
                {this.props.cryptoModel.news.map(n => n &&
                    <Card className={this.props.classes.card}>
                        <CardMedia
                            className={this.props.classes.media}
                            image={n.originalImageUrl}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="headline" component="h2">
                                {n.title}<Button variant="outlined" color="primary" aria-label="add" href={n.url} size="small">More</Button>
                            </Typography>
                            <Typography component="p">
                                {n.description}
                            </Typography>
                        </CardContent>
                    </Card>)
                }</div>)
        }
    }
);

export default NewsList;

