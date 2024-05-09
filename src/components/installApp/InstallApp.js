import React, { useState, useEffect } from "react";
import { Edit, Eye, MoreVertical, Trash } from "react-feather";
import ReactPaginate from "react-paginate";
import { useAppInstallDataQuery } from "../../service";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Label,
  Row,
  Table,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { getInstallAppData } from "../../redux/installAppSlice";
import { useDispatch, useSelector } from "react-redux";
function InstallApp() {
  // const installAppDataList = useSelector((state) => state.installappList.installappList);
  const resinstallAppdata = useAppInstallDataQuery();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewData, setViewData] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  console.log("app install history data", resinstallAppdata);
  useEffect(() => {
    if (resinstallAppdata?.isSuccess) {
      dispatch(getInstallAppData(resinstallAppdata?.data));
    }
  }, [resinstallAppdata]);
  const handlePagination = (page) => {
    setCurrentPage(page?.selected + 1);
  };
  return (
    <div>
      <div className="app-user-list">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle tag="h4">Order List</CardTitle>
          </CardHeader>
          <CardBody>
            <Row className="mt-2">
              <Col md="12">
                <Table>
                  <thead>
                    <tr>
                      <th>Installed on shop</th>
                      <th>Installed/UnInstalled On</th>
                      <th>App Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resinstallAppdata &&
                    resinstallAppdata?.data?.length > 0 ? (
                      // Render table if resinstallAppdata is not empty
                      resinstallAppdata.data.map((vendor, index) => (
                        <tr key={index}>
                          <td>{vendor.shop_name.split(".")[0]}</td>{" "}
                          {/* Extract shop name before dot */}
                          <td>
                            {new Date(
                              parseInt(vendor.timestamp) * 1000
                            ).toLocaleDateString()}
                          </td>
                          <td>{vendor.isAppinstall?"Active":"Inactive"}</td>
                        </tr>
                      ))
                    ) : (
                      // Render "No Data Found" message if resinstallAppdata is empty
                      <tr>
                        <td className="text-center" colSpan={3}>
                          No Data Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </CardBody>
          <ReactPaginate
            breakLabel={"..."}
            previousLabel={""}
            nextLabel={""}
            pageCount={pageCount}
            forcePage={currentPage !== 0 ? currentPage - 1 : 0}
            activeClassName="active"
            onPageChange={(page) => handlePagination(page)}
            pageClassName={"page-item"}
            nextLinkClassName={"page-link"}
            nextClassName={"page-item next"}
            previousClassName={"page-item prev"}
            previousLinkClassName={"page-link"}
            pageLinkClassName={"page-link"}
            containerClassName={`pagination ${
              pageCount > 0 ? "" : "hidden"
            } react-paginate justify-content-end my-2 pe-1`}
          />
        </Card>
      </div>
    </div>
  );
}

export default InstallApp;
