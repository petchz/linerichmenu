// import lib
import React, { Component } from "react";
import "../App.css";
import DataTable from "react-data-table-component";
import {
  Header,
  Loader,
  Input,
  Button,
  Form,
  Modal,
  Image,
  Icon,
} from "semantic-ui-react";

import linerichmenu from "../functions/linerichmenu";

const CustomLoader = () => (
  <div id="loader" className="customload">
    <div>
      <Loader size="massive" active indeterminate>
        <Header as="h2" className="prompt">
          <br />
          กำลังโหลด...
          <Header.Subheader className="subheader">
            กรุณารอสักครู่
            <span role="img" aria-label="please">
              {" "}
              ✌️
            </span>
          </Header.Subheader>
        </Header>
      </Loader>
    </div>
  </div>
);

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      access_token: "",
      modal: false,
      addmodal: false,
      menu: "",
      image: null,
      imagetype: "",
      imagmodal: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  componentDidMount() {
    if (localStorage.token == null) {
      this.setState({ loading: false, modal: true, access_token: "" });
    } else {
      linerichmenu.menulist(localStorage.token).then((res) => {
        this.setState({
          data: res.data.richmenus,
          loading: false,
          modal: false,
          access_token: localStorage.token,
        });
      });
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  getdata() {
    linerichmenu.menulist(localStorage.token).then((res) => {
      this.setState({
        data: res.data.richmenus,
        loading: false,
      });
    });
  }

  submit = (e) => {
    this.setState({ loading: true, modal: false });
    linerichmenu.verify(this.state.access_token).then((res) => {
      if (res === true) {
        this.getdata();
      } else {
        this.setState({ loading: false, modal: true });
      }
    });
  };

  new = (e) => {
    this.setState({ loading: true, addmodal: false });
    linerichmenu
      .newmenu({
        access_token: this.state.access_token,
        menu: this.state.menu,
      })
      .then((res) => {
        this.getdata();
      });
  };

  addimage(menuid) {
    this.setState({ loading: true });
    linerichmenu
      .addimage({
        access_token: this.state.access_token,
        menuid: menuid,
        image: this.state.image,
        imagetype: this.state.image,
      })
      .then((res) => {
        console.log(res);
      });
  }

  del(menuid) {
    this.setState({ loading: true });
    linerichmenu
      .delmenu({
        access_token: this.state.access_token,
        menuid: menuid,
      })
      .then((res) => {
        this.getdata();
      });
  }

  copy(menuid) {
    var textField = document.createElement("textarea");
    textField.innerText = menuid;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    alert("Copied: " + menuid);
  }

  onChangeHandler = (event) => {
    this.setState({
      image: event.target.files[0],
      imagetype: event.target.files[0].type,
    });
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src);
    };
  };

  getimage(menuid) {
    linerichmenu
      .getimage({
        access_token: this.state.access_token,
        menuid: menuid,
      })
      .then((res) => {
        console.log(res);
        this.setState({ test: res });
      });
  }

  render() {
    return (
      <div className="viewpage">
        <Header
          as="h2"
          floated="left"
          className="prompt"
          style={{ marginTop: "0.75em" }}
        >
          LINE Rich Menu Manager
        </Header>
        <DataTable
          onRowClicked={(row) => this.copy(row.richMenuId)}
          noHeader={true}
          highlightOnHover={true}
          pointerOnHover={true}
          columns={[
            {
              name: "Name",
              selector: "name",
            },
            {
              name: "Menu ID",
              selector: "richMenuId",
            },
            {
              name: "Size",
              cell: (row) => row.size.width + " x " + row.size.height,
            },
            {
              cell: (row) => (
                <div>
                  <Button
                    color="red"
                    size="small"
                    icon
                    onClick={() => this.del(row.richMenuId)}
                  >
                    <Icon name="trash alternate outline" />
                  </Button>
                </div>
              ),
              button: true,
            },
          ]}
          data={this.state.data}
          progressPending={this.state.loading}
          progressComponent={<CustomLoader />}
          subHeader={true}
          subHeaderAlign={"right"}
          subHeaderComponent={
            <div style={{ display: "flex", alignItems: "center" }}>
              <Modal
                className="prompt"
                onClose={() => this.setState({ addmodal: false, image: null })}
                onOpen={() => this.setState({ addmodal: true })}
                open={this.state.addmodal}
                trigger={
                  <Button
                    className="prompt"
                    color="green"
                    loading={this.state.loading}
                    disabled={this.state.loading}
                    style={{ margin: "5px" }}
                  >
                    Add Rich Menu
                  </Button>
                }
              >
                <Modal.Header className="prompt">Add Rich Menu</Modal.Header>
                <Modal.Content>
                  <Form>
                    <Form.TextArea
                      rows={25}
                      label="Code"
                      placeholder="Put 
                        your code here."
                      name="menu"
                      value={this.state.menu}
                      onChange={this.handleChange}
                    />
                    <Form.Field>
                      <label>Image</label>
                      <Image
                        id="output"
                        alt="preview"
                        size="large"
                        hidden={this.state.image != null ? false : true}
                      />
                      <Input
                        type="file"
                        name="image"
                        accept=".png, .jpg"
                        onChange={this.onChangeHandler}
                      />
                    </Form.Field>
                  </Form>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    className="prompt"
                    color="black"
                    onClick={() =>
                      this.setState({ addmodal: false, image: null })
                    }
                  >
                    Cancel
                  </Button>
                  <Button
                    className="prompt"
                    color="black"
                    onClick={() => this.new()}
                    positive
                  >
                    Submit
                  </Button>
                </Modal.Actions>
              </Modal>
              <Modal
                className="prompt"
                onClose={() => this.setState({ modal: false })}
                onOpen={() => this.setState({ modal: true })}
                open={this.state.modal}
                size="small"
                trigger={
                  <Button
                    className="prompt"
                    color="blue"
                    loading={this.state.loading}
                    disabled={this.state.loading}
                    style={{ margin: "5px" }}
                  >
                    Edit Token
                  </Button>
                }
              >
                <Modal.Header className="prompt">
                  Enter LINE Access Token
                </Modal.Header>
                <Modal.Content>
                  <Form>
                    <Form.Field>
                      <label>Access Token</label>
                      <Input
                        name="access_token"
                        value={this.state.access_token}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                  </Form>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    className="prompt"
                    color="black"
                    onClick={() => this.setState({ modal: false })}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="prompt"
                    content="Confirm"
                    labelPosition="right"
                    icon="checkmark"
                    positive
                    onClick={() => this.submit()}
                  />
                </Modal.Actions>
              </Modal>
            </div>
          }
          pagination
          className="prompt"
        />
      </div>
    );
  }
}
