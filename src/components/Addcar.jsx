import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import propTypes from 'react-table-v6/lib/propTypes';
 
export default function Addcar(props) {
  const [open, setOpen] = React.useState(false);
  
  const[car,setCar]=React.useState({
    brand:'',
    model:'',
    color:'',
    fuel:'',
    year:'',
    price:''
  });
 
  const handleClickOpen = () => {
    setOpen(true);
  };
 
  const handleClose = () => {
    
    setOpen(false);
  };
  
  const handelInputChange = (event) =>{
    
        setCar({...car, [event.target.name]: event.target.value
    })
  };

  const addcar =()=> {
    if(car.model===' ' || car.brand ==='' || car.color===' ' || car.fuel==='' || car.year ===' ' || car.price ==='')
    {
     return (alert(" Comepelt all the requried field to  Add a new car !!"))
    }
    else {
    props.saveCar(car);
    setCar({
    brand:'',
    model:'',
    color:'',
    fuel:'',
    year:'',
    price:''

    })

    
    handleClose();
  }
  }

  
  return(
    <div>
      <Button style={{margin: 10}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add New Car
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"> New Car</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Brand"
            name="brand"
            value={car.brand}
            onChange={(e) => handelInputChange(e)}
            fullWidth
          />
          <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Model"
          name="model"
          value={car.model}
          onChange={(e) => handelInputChange(e)}
          fullWidth
          />
          <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Color"
          name="color"
          value={car.color}
          onChange={(e) => handelInputChange(e)}
          fullWidth
          />
          <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Fuel"
          name="fuel"
          value={car.fuel}
          onChange={(e) => handelInputChange(e)}
          fullWidth
          />
          <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Year"
          name="year"
          value={car.year}
          onChange={(e) => handelInputChange(e)}
          fullWidth
          />
          <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Price"
          name="price"
          value={car.price}
          onChange={(e) => handelInputChange(e)}
          fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addcar} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>    
    </div>
  );
}