import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6'
import { makeStyles } from '@material-ui/core/styles';
import 'react-table-v6/react-table.css'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import Snackbar from '@material-ui/core/Snackbar';
import SaveIcon from '@material-ui/icons/Save';


import Addcar from './Addcar';
 
export default function Carlist() {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);
 
  useEffect(() => {
    getCars();
  }, [])
 
  const getCars = () => {
    fetch('https://carstockrest.herokuapp.com/cars')
    .then(response => response.json())
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.error(err))
  }
 
  const deleteCar = (link) => {
    if (window.confirm('Are you sure?')) {
      fetch(link, {method: 'DELETE'})
      .then(_ => getCars())
      .then(_ => setOpen(true))
      .catch(err => console.error(err))
    }
  }

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();
 
  const handleClose = () => {
    setOpen(false);
  }
 




  const columns = [
    {
      Cell: row => (<Button size="small" className ={classes.button} startIcon={<SaveIcon />} color="primary" variant="contained" >Edit</Button>)
    },

    {
      Header: 'Brand',
      accessor: 'brand'
    },
    {
      Header: 'Model',
      accessor: 'model'
    },
    {
      Header: 'Color',
      accessor: 'color'
    },
    {
      Header: 'Year',
      accessor: 'year'
    },
    {
      Header: 'Fuel',
      accessor: 'fuel'
    },
    {
      Header: 'Price',
      accessor: 'price'
    },
    {
      Cell: row => (<Button size="small" className ={classes.button} startIcon={<DeleteIcon />} color="secondary" variant="contained" onClick={() => deleteCar(row.original._links.self.href)}>Delete</Button>)
    },
    
  ]
 
  return(
    <div>
      <Addcar />
      <br/>
      <ReactTable defaultPageSize={10} filterable={true} data={cars} columns={columns} />
      <Snackbar 
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message='Car deleted'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      />
    </div>
  );
}