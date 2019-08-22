import React, { Component } from 'react';
import './App.css';
import { Container, Button, Alert } from 'react-bootstrap';
import ProductList from './ProductList';
import AddProduct from './AddProduct';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddProduct: false,
      error: null,
      response: {},
      product: {},
      isEditProduct: false
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onCreate() {
    this.setState({ isAddProduct: true });
  }

  onFormSubmit(data) {
    let apiUrl;

    if(this.state.isEditProduct){
      apiUrl = 'http://localhost/dev/tcxapp/reactapi/editProduct';
    } else {
      apiUrl = 'http://localhost/dev/tcxapp/reactapi/createProduct';
    }

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      myHeaders
    };

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(result => {
        this.setState({
          response: result,
          isAddProduct: false,
          isEditProduct: false
        })
      },
      (error) => {
        this.setState({ error });
      }
    )
  }

  editProduct = productId => {

    const apiUrl = 'http://localhost/dev/tcxapp/reactapi/getProduct';
    const formData = new FormData();
    formData.append('productId', productId);

    const options = {
      method: 'POST',
      body: formData
    }

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            product: result,
            isEditProduct: true,
            isAddProduct: true
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  render() {

    let productForm;
    if(this.state.isAddProduct || this.state.isEditProduct) {
      productForm = <AddProduct onFormSubmit={this.onFormSubmit} product={this.state.product} />
    }

    return (
      <div className="App">
        <Container>
          <h1 style={{textAlign:'center'}}>React Tutorial</h1>
          {!this.state.isAddProduct && <Button variant="primary" onClick={() => this.onCreate()}>Add Product</Button>}
          {this.state.response.status === 'success' && <div><br /><Alert variant="info">{this.state.response.message}</Alert></div>}
          {!this.state.isAddProduct && <ProductList editProduct={this.editProduct}/>}
          { productForm }
          {this.state.error && <div>Error: {this.state.error.message}</div>}
        </Container>
      </div>
    );
  }
}

export default App;