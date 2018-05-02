import React, { Component } from 'react';
import { connect } from 'react-redux';

import { red500 } from 'material-ui/styles/colors'
import CircularProgress from 'material-ui/CircularProgress'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'

import { fetchWorkout, updateWorkout, deleteWorkout } from '../workouts/WorkoutsActions'
import { showSnackbar } from '../app/AppActions';

import WorkoutCard from './WorkoutCard'
import WorkoutReportCard from './WorkoutReportCard'

const initialState = {
    workout: undefined,
    stepIndex: 0,
    api: {
        isExecuting: false,
        isErrored: false,
    }
}

const styles = {
    icon: {
        height: 48,
        width: 48,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
}

class Workout extends Component {
    state = initialState;

    componentWillMount = () => {
        this.setState({ api: { ...this.state.api, isExecuting: true }})
        
        fetchWorkout(this.props.match.params.id)
        .then(response => {
            this.setState({ 
                workout: response.data,
                api: { isExecuting: false, isErrored: false }
            })
        }, error => {
            this.setState({ 
                workout: undefined,
                api: { isExecuting: false, isErrored: true }
            })
        })
    }

    handleWorkoutChange = (workout, notify = { show: false, caption: ''}) => {
        return new Promise((resolve, reject) => {
            this.props.updateWorkout(workout)
            .then(response => {
                if (notify.show) {
                    this.props.showSnackbar(notify.caption);
                }

                resolve(response);
            }, error => {
                this.props.showSnackbar('Error updating Workout')
                reject(error);
            })
        })
    }

    handleWorkoutDelete = (workout) => {
        return new Promise((resolve, reject) => {
            this.props.deleteWorkout(workout.id)
            .then(response => {
                this.props.showSnackbar('Deleted Workout');
                resolve(response);
            }, error => {
                this.props.showSnackbar('Error deleting Workout');
                reject(error);
            })
        })
    }

    handleWorkoutReset = (workout, notify = { show: false, caption: ''}) => {
        delete workout.startTime;
        delete workout.endTime;
        delete workout.notes;

        workout.routine.exercises.forEach(e => {
            delete e.startTime;
            delete e.endTime;
            delete e.notes;

            e.metrics.forEach(m => {
                delete m.value;
            });
        });

        return this.handleWorkoutChange(workout, notify);
    }

    handleWorkoutExerciseChange = (workout, exercise, notify = { show: false, caption: ''}) => {
        workout.routine.exercises = workout.routine.exercises.map(e => {
            return e.sequence === exercise.sequence && e.id === exercise.id ? exercise : e;
        });

        return this.handleWorkoutChange(workout, notify);
    }

    render() {
        return (
            this.state.api.isExecuting ? <CircularProgress style={styles.icon} /> : 
                this.state.api.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                    this.state.workout === undefined ? <span>Invalid Workout Id.</span> : 
                    this.state.workout.endTime === undefined ?
                            <WorkoutCard
                                workout={this.state.workout}
                                onWorkoutChange={this.handleWorkoutChange}
                                onExerciseChange={(exercise) => this.handleWorkoutExerciseChange(this.state.workout, exercise)}
                                onDelete={() => this.handleWorkoutDelete(this.state.workout)}
                                onReset={() => this.handleWorkoutReset(this.state.workout)}
                            /> :
                            <WorkoutReportCard workout={this.state.workout}/>
        )
    }
}

const mapStateToProps = (state) => ({
    workouts: state.workouts
})

const mapDispatchToProps = {
    updateWorkout,
    deleteWorkout,
    showSnackbar,
}

export default connect(mapStateToProps, mapDispatchToProps)(Workout)