import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import {CardActions, CardContent} from '@material-ui/core/'
import Button from '@material-ui/core/Button'
import PublishIcon from "@material-ui/icons/Publish";
import auth from '../auth/auth-helper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {create} from './api-shop.js'
import {Link, Redirect} from 'react-router-dom'
import swal from 'sweetalert'

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle,
    fontSize: '1em'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2
  },
  input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  }
})

class NewShop extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      image: [],
      redirect: false,
      error: ''
    }
  }
  componentDidMount = () => {
    this.shopData = new FormData()
  }
  handleChange = name => event => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    this.shopData.set(name, value)
    this.setState({ [name]: value })
  }
  clickSubmit = () => {
    const jwt = auth.isAuthenticated()
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, this.shopData).then((data) => {
      if (data.error==='11000 duplicate key error collection: e-commerce-aplication.shops index: nameYa existe') swal ({
        title: "Error",
        text: 'Nombre ya existentente',
        icon: "error",
        button: "Ok",
      });
      else{
          if (data.error) { 
            swal ({
              title: "Error",
              text:data.error,
              icon: "error",
              button: "Ok",
            });
            this.setState({error: data.error})
          } else {
            this.setState({error: '', redirect: true})
          }
        }
    })
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={'/seller/shops'}/>)
    }
    const {classes} = this.props
    return (<div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Tienda Nueva
          </Typography>
          <br/>
          <input accept="image/*" onChange={this.handleChange('image')} className={classes.input} id="icon-button-file" type="file" />
          <label htmlFor="icon-button-file">
            <Button variant="raised" color="secondary" component="span">
              Subir Logo
              <PublishIcon/>
            </Button>
          </label> <span className={classes.filename}>{this.state.image ? this.state.image.name : ''}</span><br/>
          <TextField id="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal"/><br/>
          <TextField
            id="multiline-flexible"
            label="Description"
            multiline
            rows="2"
            value={this.state.description}
            onChange={this.handleChange('description')}
            className={classes.textField}
            margin="normal"
          /><br/>
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Submit</Button>
          <Link to='/seller/shops' className={classes.submit}><Button variant="raised">Cancelar</Button></Link>
        </CardActions>
      </Card>
    </div>)
  }
}

NewShop.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NewShop)
