import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import  {ListItem, ListItemText} from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import auth from '../auth/auth-helper'
import {downloadAPIproduct, listByUser} from './api-order.js'
import {Link} from 'react-router-dom'

const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: '12px 24px',
    padding: theme.spacing.unit * 3,
    backgroundColor: '#3f3f3f0d'
  }),
  title: {
    margin: `${theme.spacing.unit * 2}px 0 12px ${theme.spacing.unit}px` ,
    color: theme.palette.openTitle
  }
})
class MyOrders extends Component {
  state = {
      orders:[]
  }

  loadOrders = () => {
    const jwt = auth.isAuthenticated()
    listByUser({
      userId: jwt.user._id
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({orders: data})
      }
    })
  }

  downloadAPIproduct = (FileName) => {
    const jwt = auth.isAuthenticated()
    downloadAPIproduct({
      filename: FileName
    }, {t: jwt}).then((data) => {
      if (data.error) {
        console.log(data.error)
      }
    })
  }

  componentDidMount = () => {
    this.loadOrders()
  }

  render() {
    const {classes} = this.props
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Tus Pedidos
        </Typography>
        <List dense>
          {this.state.orders.map((order, i) => {
            return <span key={i}>
                      <Link to={"/order/"+order._id}>
                        <ListItem button>
                          <ListItemText primary={<strong>{"Order # "+order._id}</strong>} secondary={(new Date(order.created)).toDateString()}/>
                        </ListItem>
                      </Link>
                      <Divider/>
                    </span>})}
        </List>
      </Paper>
    )
  }
}

MyOrders.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MyOrders)
