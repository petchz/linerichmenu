// import lib
import React, { Component } from "react";
import "../App.css";
import DataTable from "react-data-table-component";
import { Header, Loader, Input, Button, Form, Modal } from "semantic-ui-react";

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

const dataColumn = [
  {
    name: "Menu ID",
    selector: "richMenuId",
    sortable: true,
  },
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "Size",
    cell: (row) => row.size.width + " x " + row.size.height,
  },
  {
    cell: (row) => (
      <Button size="mini" className="prompt">
        Settings
      </Button>
    ),
    button: true,
  },
];

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      access_token: "",
      modal: false,
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

  submit = (e) => {
    this.setState({ loading: true, modal: false });
    linerichmenu.verify(this.state.access_token).then((res) => {
      if (res === true) {
        linerichmenu.menulist(this.state.access_token).then((res) => {
          this.setState({
            data: res.data.richmenus,
            loading: false,
            modal: false,
          });
        });
      } else {
        this.setState({ loading: false, modal: true });
      }
    });
  };

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
          noHeader={true}
          highlightOnHover={true}
          pointerOnHover={true}
          title="ระบบรายงานผล REG CHECKIN KKU"
          columns={dataColumn}
          data={this.state.data}
          progressPending={this.state.loading}
          progressComponent={<CustomLoader />}
          // onRowClicked={(row) => window.location.replace(`/view/${row.uid}`)}
          subHeader={true}
          subHeaderAlign={"right"}
          subHeaderComponent={
            <div style={{ display: "flex", alignItems: "center" }}>
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
