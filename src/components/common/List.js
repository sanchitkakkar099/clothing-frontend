import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { ChevronDown, Grid, Share } from "react-feather";
import Select from "react-select";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Col,
  Label,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";

// ** Table Header
// const CustomHeader = () => {
//   return (

//     // <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
//     //   <Row>
//     //     <Col xl="6" className="d-flex align-items-center p-0">
//     //       <div className="d-flex align-items-center w-100">
//     //         <label htmlFor="rows-per-page">Show</label>
//     //         <Input
//     //           className="mx-50"
//     //           type="select"
//     //           id="rows-per-page"
//     //           value={10}
//     //           style={{ width: "5rem" }}
//     //         >
//     //           <option value="10">10</option>
//     //           <option value="25">25</option>
//     //           <option value="50">50</option>
//     //         </Input>
//     //         <label htmlFor="rows-per-page">Entries</label>
//     //       </div>
//     //     </Col>
//     //     <Col
//     //       xl="6"
//     //       className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
//     //     >
//     //       <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
//     //         <label className="mb-0" htmlFor="search-invoice">
//     //           Search:
//     //         </label>
//     //         <Input id="search-invoice" className="ms-50 w-100" type="text" />
//     //       </div>

//     //       <div className="d-flex align-items-center table-header-actions">
//     //         <UncontrolledDropdown className="me-1">
//     //           <DropdownToggle color="secondary" caret outline>
//     //             <Share className="font-small-4 me-50" />
//     //             <span className="align-middle">Export</span>
//     //           </DropdownToggle>
//     //           <DropdownMenu>
//     //             <DropdownItem className="w-100">
//     //               <Grid className="font-small-4 me-50" />
//     //               <span className="align-middle">Excel</span>
//     //             </DropdownItem>
//     //           </DropdownMenu>
//     //         </UncontrolledDropdown>

//     //         <Button className="add-new-user" color="primary">
//     //           Add
//     //         </Button>
//     //       </div>
//     //     </Col>
//     //   </Row>
//     // </div>
//   );
// };
function List({ title }) {
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Year",
      selector: (row) => row.year,
    },
  ];

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];

  return (
    <Fragment>
      {/* <Card>
        <CardHeader>
          <CardTitle tag="h4">Filters</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
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
          </Row>
        </CardBody>
      </Card> */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle tag="h4">Filters</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="6">
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
            <Col md="3">
              <Label htmlFor="rows-per-page">Show Entries</Label>
              <Input type="select" id="rows-per-page" value={10}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </Input>
            </Col>
          </Row>
          <Row>
            <div className="react-dataTable">
              <DataTable
                noHeader
                subHeader
                sortServer
                pagination
                responsive
                paginationServer
                columns={columns}
                // onSort={handleSort}
                sortIcon={<ChevronDown />}
                className="react-dataTable"
                // paginationComponent={CustomPagination}
                data={data}
                // subHeaderComponent={<CustomHeader />}
              />
            </div>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
}

export default List;
