import React, { Component } from 'react';

import { black } from 'material-ui/styles/colors'
import { AvPlayArrow, ActionSchedule, AvStop } from 'material-ui/svg-icons';
import { WORKOUT_AVATAR_COLOR } from '../../../constants';

const styles = {
    container: {
        position: 'relative',
        borderRadius: 0,
        border: 0,
        height: 24,
        display: 'block',
    },
    icon: {
        width: 14,
        height: 14,
        marginTop: 3,
        float: 'right'
    },
    title: {
        position: 'absolute',
        marginTop: 3,
        textOverflow: 'ellipsis',
        color: black,
        float: 'left',
        whiteSpace: 'pre',
        overflow: 'hidden',
        width: 'calc(100% - 25px)',
    }
}
class WorkoutsCalendarEvent extends Component {
    render() {
        let event = this.props.event;
        let icon = event.status === 'scheduled' ? <ActionSchedule style={styles.icon}/> : 
            event.status === 'started' ? <AvPlayArrow style={styles.icon}/> : <AvStop style={styles.icon}/>;

        return (
            <div>
                {React.Children.map(this.props.children, child =>
                    <div 
                        {...child.props}
                        style={{ ...styles.container, backgroundColor: WORKOUT_AVATAR_COLOR }}
                    >
                        <div style={styles.title}>{this.props.event.title}</div>{icon}
                    </div>
                )}
            </div>
        )
    }
}

export default WorkoutsCalendarEvent