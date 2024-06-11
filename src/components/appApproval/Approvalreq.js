import React, { useState, useEffect } from "react";
import {useShopifyAppapprovalQuery,useChangeApprovalMutation} from "../../service"
import { getapproval } from "../../redux/approvalSlice";
import { Edit, Eye, MoreVertical, Trash } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
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
function Approvalreq() {
    const navigate = useNavigate();
    const [searchFields, setSearchFields] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [modal, setModal] = useState(false);
    const [viewData, setViewData] = useState(null);
    const approaval_data = useShopifyAppapprovalQuery();
    const [pageCount, setPageCount] = useState(0);
    const dispatch = useDispatch();

    const [reqChangeapproval, resChangeapproval] = useChangeApprovalMutation();
    useEffect(() => {
        if (approaval_data?.isSuccess) {
          dispatch(getapproval(approaval_data?.data));
        //   setPageCount(approaval_data?.data);
        }
      }, [approaval_data]);
      console.log("approval requests",approaval_data);

      useEffect(() => {
        if (resChangeapproval?.isSuccess) {
          toast.success(resChangeapproval?.data?.message, {
            position: "top-center",
            duration: 3000,
          });
          navigate('/approval-requests', { replace: true });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }, [resChangeapproval?.isSuccess]);

      const handlePagination = (page) => {
        setCurrentPage(page?.selected + 1);
      };
    
      const handleSearchField = (e) => {
        setSearchFields(e.target.value);
      };

      const handleapprovalchange = async(e,label,us) => {
        e.preventDefault();
        console.log("Edit data", us);
        console.log("label",label);
        const labelvalue = label === 'Approved'?'true':'false'
        const payload = {
            email:us.email,
            shopname: us.shopname,
            isAppapproved:labelvalue
        }
        console.log("payload value",payload);
        reqChangeapproval(payload);
      }
  return (
    <div>
        <div className="app-user-list">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle tag="h4">App Approval Request List</CardTitle>
          </CardHeader>
          <CardBody>
            {/* <Row>
              <Col md="6" className="d-flex">
                <div className="w-50 me-1">
                  <Label for="ward-select">Search</Label>
                  <Input
                    id="search-invoice"
                    type="text"
                    onChange={(e) => handleSearchField(e)}
                  />
                </div>
              </Col>
            </Row> */}

            <Row className="mt-2">
              <Col md="12">
                <Table>
                  <thead>
                    <tr>
                      <th>Shopname</th>
                      <th>Owner Email</th>
                      <th>Approval Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(approaval_data?.data?.data) &&
                        approaval_data?.data?.data?.length > 0 ? (
                            approaval_data?.data?.data.map((cs, i) => {
                        return (
                          <tr key={i}>
                            <td>{cs?.shopname}</td>
                            <td>{cs?.email}</td>
                            <td>{cs?.isAppapproved?"Approved":"Approval Pending"}</td>
                            <td>
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  className="icon-btn hide-arrow"
                                  color="transparent"
                                  size="sm"
                                  caret
                                >
                                  <MoreVertical size={15} />
                                </DropdownToggle>
                                <DropdownMenu>
                                <DropdownItem
                                    onClick={(e) => handleapprovalchange(e,'Approved', cs)}
                                  >
                                    <span className="align-middle">Approved</span>
                                  </DropdownItem>
                                  <DropdownItem
                                        onClick={(e) => handleapprovalchange(e, 'Disapproved',cs)}
                                      >
                                        <span className="align-middle">
                                          Disapproved
                                        </span>
                                      </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td className="text-center" colSpan={7}>
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
  )
}

export default Approvalreq
