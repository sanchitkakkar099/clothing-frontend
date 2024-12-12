import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Button,
  Row,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledDropdown,
  CardFooter,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

import ReactPaginate from "react-paginate";
import { MdImage } from "react-icons/md";
import toast from "react-hot-toast";
import InventeryView from "../inventory/InventoryView";
// import MetafieldView from "../components/MetafieldView";
import { useDispatch, useSelector } from "react-redux";
import { useStoreInfoDataMutation,useCreateProductMutation } from "../../service";
function ProductList() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Select Category");
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [createButton, setCreateButton] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [metaFieldmodal, setMetaFieldmodal] = useState(false);
  const [viewData, setViewData] = useState([]);
  // const [metaViewData, setMetaViewData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productsData, setProductsData] = useState();
  const [page_info, setPage_info] = useState("");
  const [reqproductData, resproductData] = useStoreInfoDataMutation();
  const [reqCreateProduct,resCreateProduct] = useCreateProductMutation();
  const userInfo = useSelector((state) => state?.authState.userInfo);
  const storeName = userInfo?.storename;

    // Toggle dropdown visibility
    const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
    useEffect(() => {
        console.log("Selected category updated:", selectedCategory);
        setSelectedCategory(selectedCategory);
        // Perform any logic here that depends on the updated state
      }, [selectedCategory]);

    // Handle category selection
    const handleCategorySelect = (category) => {
      setSelectedCategory(category);
      console.log("selectedCategory",selectedCategory);
    };

  useEffect(() => {
    async function fetchData() {
      try {
        const reqdata = {
          storeDomain: userInfo?.storename,
        };
        const productData = await reqproductData(reqdata);
        setProductsData(productData?.data?.products);
        console.log("productData", productData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }

    fetchData();
  }, [reqproductData]);
  console.log("userInfo", userInfo);

  const toggleModal = () => {
    // console.log("toggle modal is called")
    setIsModalOpen(!isModalOpen);
  };

  //   useEffect(() => {
  //     setProductsData(products?.productsData);
  //   }, [products]);

  //   // console.log("data", productsData);
  const handleCheckboxChange = (e, data) => {
    console.log("data",data);
    if (
      selectedProducts.some(
        (selectedProduct) => selectedProduct?.id === data?.id
      )
    ) {
      setSelectedProducts(
        selectedProducts.filter(
          (selectedProduct) => selectedProduct?.id !== data?.id
        )
      );
    } else if (!data?.isParentCreated) {
      setSelectedProducts([...selectedProducts, data]);
    }
  };

  const handleAllCheckboxChange = (e) => {
    // console.log(e.target.checked);
    if (e.target.checked) {
      setSelectedProducts([]);
      // console.log("all seletr", productsData);
      for (const product of productsData) {
        if (!product?.isParentCreated) {
          setSelectedProducts((prev) => [...prev, product]);
          setAllChecked(true);
        }
      }
    } else if (!e.target.checked) {
      setSelectedProducts([]);
    }
  };

  //   const WebhookCall = async () => {
  //     const response = await fetch("/api/webhook/all");
  //     if (response.ok) {
  //       // console.log("response", response);
  //     }
  //   };

  const onViewAction = (e, st) => {
    setModal(true);
    setViewData(st);
  };

  //   // const onMetaViewAction = (e, st) => {
  //   //   setModal(true);
  //   //   setMetaViewData(st);
  //   // };
    const handelCreate = async () => {
      console.log("userInfo?.isAppapproved",userInfo?.isAppapproved);
      if (!userInfo?.isAppapproved) {
        toast.error("App approval Pending", {
          position: "top-center",
          duration: 3000,
        });
        return;
      }
      if(selectedCategory === "Select Category"){
        toast.error("Select category type for selcted product from top", {
            position: "top-center",
            duration: 4000,
          });
          return;
      }
      setCreateButton(true);
      // console.log("product selected through checkbox",selectedProducts);
      if (!selectedProducts.length) {
        toast.error("Select Product to Create", {
          position: "top-center",
          duration: 3000,
        });
        setCreateButton(false);
        return;
      }
      console.log("selectedProducts",selectedProducts);
      const reqData = {
        Products: selectedProducts,
        storename: storeName,
        selectedCategory: selectedCategory
      }
      console.log("reqData",reqData);
      setCreateButton(false);
      const response = await reqCreateProduct(reqData);
     console.log("responsedata",response)
      if (response?.data?.length > 0) {
        setCreateButton(false);
        setSelectedProducts([]);
        // refetchProducts();
        toast.success("Product Created Successfully", {
          position: "top-center",
          duration: 3000,
        });
      } else {
        setCreateButton(false);
        toast.error(response?.error?.data?.message, {
          position: "top-center",
          duration: 4000,
        });
        setSelectedProducts([]);
      }
      if (!response.success && response.error === "App is Deactivated") {
        console.log("app is deactivated");
        setCreateButton(false);
        toast.error("Please activate the app", {
          position: "top-center",
          duration: 3000,
        });
        setError("Activate the app to continue");
        toggleModal();
      }
    //    else {
    //     setCreateButton(false);
    //     toast.error("Somethings went wrong", {
    //       position: "buttom-center",
    //       duration: 3000,
    //     });
    //   }
    };
  //   useEffect(() => {
  //     if (products?.productCount?.count % 12 === 12) {
  //       setPageCount(products?.productCount?.count / 12);
  //     } else {
  //       setPageCount(Math.floor(products?.productCount?.count / 12 + 1));
  //     }
  //   }, [products?.productCount?.count]);

  //   useEffect(() => {
  //     // console.log("page_info", page_info);
  //   }, [page_info]);

  const handlePaginationNext = () => {
    setSelectedProducts([]);
    // console.log(data?.Pagination?.pageInfo?.nextPage?.query?.page_info)
    // setPage_info(products?.Pagination?.nextPage?.query?.page_info);
  };
  const handlePaginationPrevious = () => {
    setSelectedProducts([]);
    // console.log(data?.Pagination?.pageInfo?.nextPage?.query?.page_info)
    // setPage_info(products?.Pagination?.prevPage?.query?.page_info);
  };
  //   console.log("productdata", productsData);
  //   console.log("state data", state);
    // Effect to run whenever `selectedCategory` updates
    // useEffect(() => {
    //     console.log("Selected category updated:", selectedCategory);
    //     setSelectedCategory(selectedCategory);
    //     // Perform any logic here that depends on the updated state
    //   }, [selectedCategory]);
  return (
    <>
      <Card>
        <CardHeader className="d-flex justify-content-left">
          <CardTitle tag="h4">Products List</CardTitle>
          <div className="h5 ms-3">
            {selectedProducts.length > 0 &&
              `${selectedProducts.length} selected`}
          </div>
          {/* Dropdown */}
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle caret color="primary">
            {selectedCategory}
          </DropdownToggle>
          <DropdownMenu>
            {["Top", "Bottoms", "Jeans", "Outerwear", "Footwear","MenShirt","MenJeans","MenOuterwear"].map((category, index) => (
              <DropdownItem key={index} onClick={() => handleCategorySelect(category)}>
                {category}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        </CardHeader>
        <CardBody>
          <Row className="mt-2">
            <Col md="12">
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>
                      <Input
                        type="checkbox"
                        onChange={(e) => handleAllCheckboxChange(e)}
                        checked={selectedProducts.length > 0 && allChecked}
                      />
                    </th>
                    <th></th>
                    <th>Product</th>
                    <th>Is Created in Parent</th>
                    <th>Status</th>
                    <th>Inventry</th>
                    <th>Vender</th>
                  </tr>
                </thead>
                <tbody>
                  {productsData &&
                  Array.isArray(productsData) &&
                  productsData.length > 0 ? (
                    productsData?.map((us, i) => {
                      return (
                        <tr key={i}>
                          <td
                            style={{
                              position: "relative",
                              ...(us?.isParentCreated
                                ? { pointerEvents: "none" }
                                : {}),
                            }}
                          >
                            <Input
                              type="checkbox"
                              checked={selectedProducts.some(
                                (selectedProduct) =>
                                  selectedProduct?.id === us?.id
                              )}
                              onChange={(e) => handleCheckboxChange(e, us)}
                            />
                          </td>
                          <td>
                            {us?.image?.src ? (
                              <img
                                alt={us?.image?.alt}
                                src={us?.image?.src}
                                width={35}
                                height={35}
                                style={{ borderRadius: "5px" }}
                              />
                            ) : (
                              <MdImage />
                            )}
                          </td>
                          <td>{us?.title}</td>
                          <td>
                            <Badge
                              color={us?.isParentCreated ? "success" : "info"}
                              pill
                            >
                              {us?.isParentCreated ? "Yes" : "No"}
                            </Badge>
                          </td>
                          <td>
                            <Badge
                              color={
                                us?.status === "active"
                                  ? "success"
                                  : us?.status === "draft"
                                  ? "info"
                                  : "secondary"
                              }
                              pill
                            >
                              {us?.status}
                            </Badge>
                          </td>
                          <td>
                            <Button
                              onClick={(e) => onViewAction(e, us?.variants)}
                              color="success"
                              size="sm"
                            >
                              show
                            </Button>
                          </td>
                          <td>{us?.vendor}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td className="text-center" colSpan={7}>
                        Loading....
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
            <div className="d-flex justify-content-end">
              <Button
                type="submit"
                color="primary"
                disabled={createButton}
                onClick={handelCreate}
              >
                Create
              </Button>
            </div>
          </Row>
        </CardBody>
        <CardFooter className="d-flex justify-content-end">
          {/* 
                <Button
                    type="submit"
                    className='me-5'
                    color="success"
                    onClick={WebhookCall}
                >
                    Webhook
                </Button> */}
          <Button
            type="submit"
            className="me-5"
            color="success"
            disabled={!productsData?.Pagination?.prevPage}
            onClick={handlePaginationPrevious}
          >
            Previous
          </Button>
          <Button
            type="submit"
            color="success"
            disabled={!productsData?.Pagination?.nextPage}
            onClick={handlePaginationNext}
          >
            Next
          </Button>
        </CardFooter>
      </Card>
      <InventeryView
        modal={modal}
        setModal={setModal}
        setProductsData={setProductsData}
        viewData={viewData}
      />
      {/* <MetafieldView
        modal={modal}
        setModal={setModal}
        setProductsData={setProductsData}
        metaViewData={metaViewData}
      /> */}
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Product Creation Error</ModalHeader>
        <ModalBody>{error}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ProductList;
