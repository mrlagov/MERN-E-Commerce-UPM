import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import {ListItem, ListItemAvatar} from '@material-ui/core/';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {list} from './api-shop.js';
import {Link} from 'react-router-dom';

const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 3
  }),
  title: {
    margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 2}px`,
    color: theme.palette.protectedTitle,
    textAlign: 'center',
    fontSize: '1.2em'
  },
  avatar:{
    width: 100,
    height: 100
  },
  subheading: {
    color: theme.palette.text.secondary
  },
  shopTitle: {
    fontSize: '1.2em',
    marginBottom: '5px'
  },
  details: {
    padding: '24px'
  }
})
class Shops extends Component {
  state = {
      shops:[]
  }
  loadShops = () => {
    list().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({shops: data})
      }
    })
  }
  componentDidMount = () => {
    this.loadShops()
  }
  render() {
    const {classes} = this.props
    return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Tiendas
        </Typography>
        <List dense>
          {this.state.shops.map((shop, i) => {
            return <Link to={"/shops/"+shop._id} key={i}>
              <Divider/>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}  src={'http://localhost:3000/api/shops/logo/'+shop._id}/>
                </ListItemAvatar>
                <div className={classes.details}>
                  <Typography type="headline" component="h2" color="primary" className={classes.shopTitle}>
                    {shop.name}
                  </Typography>
                  <Typography type="subheading" component="h4" className={classes.subheading}>
                    {shop.description}
                  </Typography>
                </div>
              </ListItem>
              <Divider/>
            </Link>})}
        </List>
      </Paper>
    </div>)
  }
}
Shops.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Shops)
