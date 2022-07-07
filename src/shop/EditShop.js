import React, {Component} from 'react';
import auth from '../auth/auth-helper';
import Card from '@material-ui/core/Card';
import  {CardActions, CardContent}  from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import PublishIcon from "@material-ui/icons/Publish";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {read, update} from './api-shop.js';
import {Redirect} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import MyProducts from '.././product/MyProducts';
import swal from 'sweetalert'

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    textAlign: 'center',
    paddingBottom: theme.spacing.unit * 2
  },
  title: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  subheading: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  }
})

class EditShop extends Component {
  constructor({match}) {
    super()
    this.state = {
      name: '',
      description: '',
      image: [],
      owner: '',
      redirect: false,
      error: ''
    }
    this.match = match
  }

  componentDidMount = async () => {
    this.shopData = new FormData()
    const jwt = auth.isAuthenticated()
    await read({
      shopId: this.match.params.shopId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        const reader = new FileReader();
        this.setState({_id: data._id, name: data.name, image: data.image, description: data.description, owner: data.owner})
      }
    })
  }

  clickSubmit = () => {
    const jwt = auth.isAuthenticated()
    update({
      shopId: this.match.params.shopId
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
  handleChange = name => event => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    this.shopData.set(name, value)
    this.setState({ [name]: value })
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={'/seller/shops'}/>)
    }
    const {classes} = this.props
    return (<div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={6} sm={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography type="headline" component="h2" className={classes.title}>
                Editar Tienda
              </Typography>
              <br/>
              <Avatar src={"http://localhost:3000/api/shops/logo/"+this.state._id} className={classes.bigAvatar}/><br/>
              <input accept="image/*" onChange={this.handleChange('image')} className={classes.input} id="icon-button-file" type="file" />
              <label htmlFor="icon-button-file">
                <Button variant="raised" color="default" component="span">
                  Cambiar Logo
                  <PublishIcon/>
                </Button>
              </label> <span className={classes.filename}>{this.state.image ? this.state.image.name : ''}</span><br/>
              <TextField id="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal"/><br/>
              <TextField
                id="multiline-flexible"
                label="Description"
                multiline
                rows="3"
                value={this.state.description}
                onChange={this.handleChange('description')}
                className={classes.textField}
                margin="normal"
              /><br/>
              <br/>
            </CardContent>
            <CardActions>
              <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Actualizar</Button>
            </CardActions>
          </Card>
          </Grid>
          <Grid item xs={6} sm={6}>
            <MyProducts shopId={this.match.params.shopId}/>
          </Grid>
        </Grid>
    </div>)
  }
}

EditShop.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditShop)
