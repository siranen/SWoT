import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRoutines, deleteRoutine } from './RoutinesActions'
import { setTitle, showSnackbar } from '../app/AppActions'

import { red500 } from 'material-ui/styles/colors'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'

import RoutineCard from './RoutineCard'
import Spinner from '../shared/Spinner'

import AddFloatingActionButton from '../shared/AddFloatingActionButton'
import { CARD_WIDTH, INTENTS } from '../../constants'
import RoutineDialog from './RoutineDialog';

const styles = {
    grid: {
        display: 'grid',
        gridGap: 10,
        gridTemplateColumns: 'repeat(auto-fit, ' + CARD_WIDTH + 'px)'
    },
    icon: {
        height: 48,
        width: 48,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
}

class Routines extends Component {
    state = {
        api: {
            isExecuting: false,
            isErrored: false,
        }
    }

    componentWillMount() {
        this.props.setTitle('Routines');
        this.setState({ api: { ...this.state.api, isExecuting: true }})

        this.props.fetchRoutines()
            .then(response => {
                this.setState({ api: { isExecuting: false, isErrored: false }})
            }, error => {
                this.props.showSnackbar('Error fetching Routines: ' + error);
                this.setState({ api: { isExecuting: false, isErrored: true }})
            })
    }

    handleRoutineDelete = (routine) => {
        return new Promise((resolve, reject) => {
            this.props.deleteRoutine(routine.id)
            .then(response => {
                this.props.showSnackbar('Deleted Routine \'' + routine.name + '\'.')
                resolve(response);
            }, error => {
                this.props.showSnackbar('Error deleting Routine \'' + routine.name + '\': ' + error);
                reject(error);
            })
        })
    }

    render() {
        return (
            this.state.api.isExecuting ? <Spinner size={48}/> : 
                this.state.api.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                    <div>
                        <div style={styles.grid}>
                            {this.props.routines.map(r =>  
                                <RoutineCard 
                                    key={r.id} 
                                    routine={r} 
                                    onDelete={() => this.handleRoutineDelete(r)}
                                />
                            )}
                        </div>
                        <AddFloatingActionButton dialog={<RoutineDialog intent={INTENTS.ADD} />} />
                    </div>
        )
    }
} 

const mapStateToProps = (state) => ({
    routines: state.routines,
})

const mapDispatchToProps = {
    fetchRoutines,
    deleteRoutine,
    showSnackbar,
    setTitle,
}

export default connect(mapStateToProps, mapDispatchToProps)(Routines)