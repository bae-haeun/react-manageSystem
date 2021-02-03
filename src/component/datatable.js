
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import style from '../app.css'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from './historyDialog'

class datatable extends Component {

    handleClickOpen() {

        this.setState({

            open: true

        });

    }



    render() {
        return (
            <Paper>
                <TableContainer>
                    <Grid container alignItems="center">
                        <Typography claassName="font-weight-bold" variant="h6" id="tableTitle" component="div">
                            업무 수행 내역
                    </Typography>
                        <Divider orientation="vertical" flexItem />
                        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                            내역 추가
                    </Button>

                    </Grid>
                </TableContainer>
            </Paper>
        );
    }
}

export default datatable;



