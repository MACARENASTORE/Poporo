import React from 'react';
import { Container, Row } from 'react-bootstrap';
import '../productos.css';
import DataGrid from '../../grid/grid';
import ConfirmationPrompts from '../../prompts/confirmation';
import { request } from '../../helper/helper';
import Loading from '../../loading/loading';
import MessagePrompt from '../../prompts/message';

const columns = [
  {
    dataField: "_id",
    text: "ID",
    hidden: true,
  },
  {
    dataField: "nombre",
    text: "Nombre",
  },
  {
    dataField: "proveedor",
    text: "Proveedor",
  },
  {
    dataField: "ean",
    text: "ean",
  },
  {
    dataField: "precio_pro",
    text: "Precio Proveedor",
  },
  
  {
    dataField: "precio_vent",
    text: "Precio",
  },
  {
    dataField: "imagen",
    text: " Imagen ",
  },
];

export default class ProductosBuscar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      idProducto: null,
      message: {
        text: '',
        show: false,
      },
      confirmation: {
        title: 'Eliminar producto',
        text: '¿Desea eliminar el producto?',
        show: false,
      },
    };
    this.onClickEditButton = this.onClickEditButton.bind(this);
    this.onClickDeleteButton = this.onClickDeleteButton.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }
  componentDidMount() {}
  onClickEditButton(row) {
    this.props.setIdProducto(row._id);
    this.props.changeTab('editar');
  }
  onClickDeleteButton(row) {
    this.setState({
      idProducto: row._id,
      confirmation: {
        ...this.state.confirmation,
        show: true,
      },
    });
  }
  onCancel() {
    this.setState({
      confirmation: {
        ...this.state.confirmation,
        show: false,
      },
    });
  }
  onConfirm() {
    this.setState(
      {
        confirmation: {
          ...this.state.confirmation,
          show: false,
        },
      },
      this.eliminarProducto()
    );
  }
  eliminarProducto() {
    this.setState({ loading: true });
    request
      .delete(`/productos/${this.state.idProducto}`)
      .then((response) => {
        this.setState({
          loading: false,
          message: {
            text: response.data.msg,
            show: true,
          },
        });
        this.setState({ loading: false });
        if (response.data.exito) this.reloadPage();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  reloadPage() {
    setTimeout(() => {
        window.location.reload();
    }, 2500);
}

  render() {
    return (
      <Container id='productos-buscar-container'>
        <ConfirmationPrompts
          show={this.state.confirmation.show}
          title={this.state.confirmation.title}
          text={this.state.confirmation.text}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
        />
        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={2500}
          onExited={this.onExitedMessage}
        />

        <Loading show={this.state.loading} />
        <Row>
          <h1>Buscar Productos</h1>
        </Row>
        <Row>
          <DataGrid
            url='/productos'
            columns={columns}
            showEditButton={true}
            showDeleteButton={true}
            onClickEditButton={this.onClickEditButton}
            onClickDeleteButton={this.onClickDeleteButton}
          />
        </Row>
      </Container>
    );
  }
}
