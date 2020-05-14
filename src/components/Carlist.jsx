import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6'
import { makeStyles } from '@material-ui/core/styles';
import 'react-table-v6/react-table.css'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import Icon from '@material-ui/core';



import Addcar from './Addcar';
import Editcar from'./Editcar';
 export default function Carlist() {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] =useState('');
 
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
      .then(_ => {
        setMsg('Car Deleted')
        setOpen(true)})
      .catch(err => console.error(err))
    }
  }

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();
 

 
  const saveCar = (car)=>{
    fetch ('https://carstockrest.herokuapp.com/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      
      },
      body: JSON.stringify(car)
    })
    .then(_ =>getCars())
    .then(_ =>{setMsg("car added");
    setOpen(true);
  })
    .catch(err => console.error(err))

  };

  const updateCar =(link, car) => {
    console.log(link)
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      
      },
      body: JSON.stringify(car)
    })
    .then(_ => getCars())
    .then(_ => {
      setMsg('Car update')
      setOpen(true)
    })
    .catch(err => console.error(err))
   

  };

  const handleClose = () => {
    setOpen(false);
  }

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
      Cell: row => (<Button size="small" className ={classes.button} startIcon={<DeleteIcon />} 
      color="secondary" variant="contained" onClick={() => deleteCar(row.original._links.self.href)}>Delete</Button>),
      
    },
 
  ]
 
  return(
    <div>
      <Addcar  saveCar={saveCar}/>
      <p> Car List</p>
      <br/>
      <ReactTable defaultPageSize={10} filterable={true} data={cars} columns={columns} />
      <Snackbar 
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={msg}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      />
    </div>
  );
}