import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List  from '@material-ui/core/List'
import {ListItem, ListItemText} from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import auth from '../auth/auth-helper'
import {listByShop} from './api-order.js'
import ProductOrderEdit from './ProductOrderEdit'

const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5
  }),
  title: {
    margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 3}px ${theme.spacing.unit}px` ,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  subheading: {
    marginTop: theme.spacing.unit,
    color: '#434b4e',
    fontSize: '1.1em'
  },
  customerDetails: {
    paddingLeft: '36px',
    paddingTop: '16px',
    backgroundColor:'#f8f8f8'
  }
})
class ShopOrders extends Component {
  constructor({match}) {
    super()
    this.state = {
      open: 0,
      orders:[]
    }
    this.match = match
  }
  loadOrders = () => {
    const jwt = auth.isAuthenticated()
    listByShop({
      shopId: this.match.params.shopId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data)
      } else {
        this.setState({orders: data})
      }
    })
  }

  componentDidMount = () => {
    this.loadOrders()
  }

  handleClick = index => event => {
    this.setState({open: index})
  }

  updateOrders = (index, updatedOrder) => {
    let orders = this.state.orders
    orders[index] = updatedOrder
    this.setState({orders: orders})
  }

  render() {
    const {classes} = this.props
    return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Orders in {this.match.params.shop}
        </Typography>
        <List dense >
          {this.state.orders.map((order, index) => {
            return   <span key={index}>
              <ListItem button onClick={this.handleClick(index)}>
                <ListItemText primary={'Pedido # '+order._id} secondary={(new Date(order.created)).toDateString()}/>
                {this.state.open === index ? <ExpandLess /> : <ExpandMore />}
              </ListItem><Divider/>
              <Collapse component="li" in={this.state.open === index} timeout="auto" unmountOnExit>
                {/*<ProductOrderEdit shopId={this.match.params.shopId} order={order} orderIndex={index} updateOrders={this.updateOrders}/>*/}
                <div className={classes.customerDetails}>
                  <Typography type="subheading" component="h3" className={classes.subheading}>
                    Pedido realizado:
                  </Typography>
                  <Typography type="subheading" component="h3" color="primary"><strong>{order.customer_name}</strong> ({order.customer_email})</Typography>
                  <br/>
                </div>
              </Collapse>
              <Divider/>
            </span>})}
        </List>
      </Paper>
    </div>)
  }
}

ShopOrders.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ShopOrders)
