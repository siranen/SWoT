import React, { Component } from 'react';

import {Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import Avatar from 'material-ui/Avatar';

class RoutineCard extends Component {
    state = {
    }

    render() {
        return (
            <div style={styles.container}>
                <Card zDepth={2} style={styles.card}>
                    <CardHeader
                        title={this.props.routine.name}
                        style={{marginBottom: -20}}
                    />
                    <CardText style={styles.text}>
                        <List>
                            <Subheader>Exercises</Subheader>
                            {this.props.routine.exercises ? this.props.routine.exercises.map(m =>                     
                                <ListItem
                                    key={m.name}
                                    leftIcon={<ActionAssignment/>}
                                    primaryText={m.name}
                                    secondaryText={m.uom ? m.uom : ''}
                                />
                            ) : ''}
                        </List>
                    </CardText>
                    <CardActions style={styles.actions}>
                        <FlatButton>Edit</FlatButton>
                        <FlatButton>Delete</FlatButton>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default RoutineCard

const styles = {
    container: {
        height: '100%'
    },
    card: {
        width: 400,
        height: '100%',
        position: 'relative'
    },
    text: {
        marginBottom: 40
    },
    actions: {
        position: 'absolute',
        bottom: 0
    },
    link: {
        cursor: 'pointer',
    },
    metric: {
    },
    exitIconButton: {
        border: 0,
        width: 16,
        height: 16,
    },
    exitIcon: {
        width: 16,
        height: 16,
        marginTop: -10,
        marginLeft: -5,
        marginBottom: -3,
        color: '#808080'
    }
}