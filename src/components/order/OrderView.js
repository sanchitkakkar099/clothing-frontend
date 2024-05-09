import { React, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
function OrderView({ modal, setModal, viewData }) {
  const [currentPage, setCurrentPage] = useState(0);   
  const itemsPerPage = 6;

  const toggle = () => {
    setModal(!modal);
  };
          
  const pageCount = Math.ceil(viewData?.Order_Info?.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);  
  };                      
  const slicedData = viewData?.Order_Info?.slice(offset, offset + itemsPerPage);
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader className="text-center">Order's Details</ModalHeader>
      <ModalBody>
        <Table bordered>
          <thead>
            <tr>
              <th>Vendor Name</th>
              <th>Product Name</th> 
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {slicedData?.map((cs, index) => (
              
              <tr key={index}>
                <td style={{ width: "80%" }}>{`${cs?.vendor}`}</td>
                <td style={{ width: "80%" }}>{`${cs?.title}`}</td>
                <td style={{ width: "80%" }}>{`${cs?.price}`}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {pageCount > 1 && (
          <ReactPaginate
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName={"pagination justify-content-end my-2 pe-1"}
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}      
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            activeClassName={"active"}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            pageClassName={"page-item"} 
            pageLinkClassName={"page-link"} 
            breakClassName={"page-item"} 
            breakLinkClassName={"page-link"}
          />
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default OrderView;
