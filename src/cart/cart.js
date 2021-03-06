import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import CartItems from './Cart-items';
// import config from '../config/config'
import Checkout from './Checkout'


const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  }
})

class Cart extends Component {
  state = {
    checkout: false,
  }

  setCheckout = val =>{
    this.setState({checkout: val})
  }

  render() {
    const {classes} = this.props
    return (<div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={6} sm={6}>
          <CartItems checkout={this.state.checkout} setCheckout={this.setCheckout}/>
        </Grid>
        {this.state.checkout &&
          <Grid item xs={6} sm={6}>
            <Checkout/>
          </Grid>}
        </Grid>
      </div>)
  }
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Cart)
