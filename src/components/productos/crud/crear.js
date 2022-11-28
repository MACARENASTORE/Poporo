import React from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import "../productos.css";
import { request } from "../../helper/helper";
import Loading from "../../loading/loading";
import MessagePrompt from "../../prompts/message";
import { onUploadfiles } from "../../helper/onUploadFile";

export default class ProductosCrear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      message: {
        text: "",
        show: false,
      },
      loading: false,
      producto: {
        nombre: "",
        proveedor: "",
        ean: "",
        precio_pro: "",
        precio_vent: "",
        imagen: [],
      },
    };
    this.onExitedMessage = this.onExitedMessage.bind(this);
  }
  setValue(inicioe, value) {
    this.setState({
      producto: {
        ...this.state.producto,
        [inicioe]: value,
      },
    });
  }

  async guardarProductos() {
    this.setState({ loading: true });
    const fotos = await onUploadfiles(this.state.producto.imagen);
    this.setState({
      producto: {
        ...this.state.producto,
      imagen: fotos[0],
      },
    });
    request
      .post("/productos", this.state.producto)
      .then((response) => {
        if (response.data.exito) {
          this.setState({
            rediret: response.data.exito,
            message: {
              text: response.data.msg,
              show: true,
            },
          });
        }
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: true });
      });
  }
  onExitedMessage() {
    if (this.state.rediret) this.props.changeTab("buscar");
  }
  render() {
    return (
      <Container id="productos-crear-container">
        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={2500}
          onExited={this.onExitedMessage}
        />
        <Loading show={this.state.loading} />
        <Row>
          <h1>Crear productos</h1>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("nombre", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Proveedor</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("proveedor", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>EAN</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("ean", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Precio proveedor</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("precio_pro", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("precio_vent", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="file"
                accept="image/png,image/jpeg"
                onChange={(e) => this.setValue("imagen", e.target.files)}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={() => console.log(this.guardarProductos())}
            >
              Guardar producto
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
