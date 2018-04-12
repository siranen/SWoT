import React, { Component } from 'react'

class WorkoutReport extends Component {
    render() {
        return (
            <ul>
                {this.props.workout.routine.exercises.map(e => 
                    <li>
                        {e.name}
                        <ul>
                            {e.metrics.map(m => 
                                <li>{m.name + (m.uom ? ' (' + m.uom + ')' : '') + ': ' + m.value}</li>
                            )}
                        </ul>
                    </li>
                )}
            </ul>
        )
    }
}

export default WorkoutReport