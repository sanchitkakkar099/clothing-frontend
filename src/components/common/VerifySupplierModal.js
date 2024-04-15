import React, { useState } from "react";
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function VerifySupplierModal({
    supplierModal,
    setSupplierModal,
    modalDetails,
    confirmAction,
}) {
    const [cdlPrice, setCdlPrice] = useState(false);
    const [dycPrice, setDycPrice] = useState(false);
    const [gtrPrice, setGtrPrice] = useState(false);


    const closeModal = () => {
        setSupplierModal(false);
    };

    const handleChangePrice = (e) => {
        setDycPrice(e?.target?.name === "dynacareprice");
        setCdlPrice(e?.target?.name === "CDLprice");
        setGtrPrice(e?.target?.name === "GTRprice");
    }

    const confirmActionSubmit = (e) =>{
        setTimeout(()=>{
            console.log(e?.target?.name);
            confirmAction(e?.target?.name);
            setSupplierModal(false)
        },300);
    }
    return (
        <Modal isOpen={supplierModal} centered toggle={() => closeModal()}>
            <ModalHeader style={{ display: "block", width: "100%" }}>
                Please select one supplier
                <Button color='secondary' onClick={() => closeModal()} className='pr-3 d-flex justify-content-right'>X</Button>
            </ModalHeader>
            <ModalBody>
                <Col md="12" className="d-flex justify-content-center">
                    <div className="w-30  ml-0 m-2">
                        <FormGroup check>
                            <Input type="checkbox" name="CDLprice" onClick={(e) => confirmActionSubmit(e)} />
                            <Label check>CDL</Label>
                        </FormGroup>
                    </div>
                    <div className="w-30 m-2 ml-0">
                        <FormGroup check>
                            <Input type="checkbox" name="dynacareprice" onClick={(e) => confirmActionSubmit(e)} />
                            <Label check>DYN</Label>
                        </FormGroup>
                    </div>
                    <div className="w-30 m-2 ml-0">
                        <FormGroup check>
                            <Input type="checkbox" name="GTRprice" onClick={(e) => confirmActionSubmit(e)} />
                            <Label check>GTR</Label>
                        </FormGroup>
                    </div>
                </Col>
            </ModalBody>
            <ModalFooter>
                {/* <Button color="primary" onClick={() => confirmActionSubmit()}>
                    Submit
                </Button> */}
            </ModalFooter>
        </Modal>
    );
}

export default VerifySupplierModal;
