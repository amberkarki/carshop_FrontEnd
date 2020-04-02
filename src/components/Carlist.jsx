import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6'
import { makeStyles } from '@material-ui/core/styles';
import 'react-table-v6/react-table.css'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import Snackbar from '@material-ui/core/Snackbar';



import Addcar from './Addcar';
import Editcar from'./Editcar';
 
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
 
  const saveCar = (car)=>{
    fetch ('https://carstockrest.herokuapp.com/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      
      },
      body: JSON.stringify(car)
    })
    .then(res=>getCars())
    .catch(err => console.error(err))

  };

  const updateCar =(car, link) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      
      },
      body: JSON.stringify(car)
    })
    .then(res=>getCars())
    .catch(err => console.error(err))
   

  };




  const columns = [
   

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
      filterable:false,
      sortable:false,
      width:115,
      
      Cell: row => <Editcar updateCar={updateCar} car = {row.original} useStyles={useStyles} />
        },
    {
      filterable:false,
      sortable:false,
      width:115,
      accessor: '_links.self.href',
      Cell:  ({value})=> (<Button size="small" className ={classes.button} startIcon={<DeleteIcon />} 
      color="secondary" variant="contained" onClick={() => deleteCar(value)}>Delete</Button>),
      
    },
 
  ]
 
  return(
    <div>
      <Addcar  saveCar={saveCar}/>
      <br/>
      <ReactTable defaultPageSize={10} filterable={true} data={cars} columns={columns} />
      <Snackbar 
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message='Your Car is Deleted !!!'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      />
    </div>
  );
}