import React from 'react';
import { Table, Button } from 'react-bootstrap';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      products: []
    }
  }

  componentDidMount() {
    const apiUrl = 'http://localhost:8192/v1/student/';

    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            products: result
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  render() {
    const { error, products} = this.state;

    if(error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
      return(
        <div>
          <h2>Product List</h2>
          <Table>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Product Name</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.product_name}</td>
                  <td>{product.sku}</td>
                  <td>{product.price}</td>
                  <td><Button variant="info" onClick={() => this.props.editProduct(product.id)}>Edit</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )
    }
  }
}

export default ProductList;