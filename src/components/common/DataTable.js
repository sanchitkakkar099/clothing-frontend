import React from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Label,
  Input,
  Table,
  Button,
} from "reactstrap";

function DataTable({ tableTitle, addBtnTitle, formUrl }) {
  const navigate = useNavigate();
  const handleNavigateToForm = (e, url) => {
    e.preventDefault();
    navigate(url);
  };
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle tag="h4">{tableTitle}</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md="5">
            <Label for="status-select">Search</Label>
            <Input id="search-invoice" type="text" />
          </Col>
          <Col md="3">
            <Label for="status-select">Status</Label>
            <Select
              isClearable
              options={[
                { label: "Active", value: "active" },
                { label: "In Active", value: "in-active" },
              ]}
              className="react-select"
              classNamePrefix="select"
            />
          </Col>
          <Col md="4" className="mt-2 d-flex justify-content-end">
            <Button
              color="primary"
              onClick={(e) => handleNavigateToForm(e, formUrl)}
            >
              {addBtnTitle}
            </Button>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col md="12">
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default DataTable;
