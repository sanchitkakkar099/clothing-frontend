import React, { useEffect } from 'react'
import { Button, Card, CardBody, CardHeader, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table }
from "reactstrap"; 

import { Controller, useForm }
from  "react-hook-form";  

function InventeryView({ modal, setModal, setProductsData, viewData }) {
  // console.log("viewData", viewData);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError
  } = useForm({
    defaultValues: viewData.reduce((acc, item, index) => {
      acc[`inventory_${index}`] = item.inventory_quantity;
      return acc;
    }, {})
  });
  const toggle = () => {
    setModal(!modal);
  }

  const onSubmit = data => {
    const productId = viewData[0]?.product_id;
    setProductsData(productsData => {
      const product = productsData.find(product => product.id === productId);
      console.log("pnfdn",product);
      return productsData; 
    });
    console.log('Updated Data:', data);
    // setModal(!modal);

  }

  useEffect(() => {
    reset(viewData.reduce((acc, item, index) => {
      acc[`inventory_${index}`] = item.inventory_quantity;
      return acc;
    }, {}))
  }, [viewData, reset])

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader className="text-center">
        Inventery Details
      </ModalHeader>
      <ModalBody >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Table bordered>
            <tbody>
              {viewData?.map((data, index) => (
                <tr key={index}>
                  <th style={{ width: "70%" }}>{data?.title}</th>
                  <td style={{ width: "30%" }}>
                    <Controller
                      name={`inventory_${index}`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          placeholder="Enter Inventory"
                          className="form-control"
                          {...field}
                          type="number"
                        />
                      )}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button type="submit" color="primary">Save Changes</Button>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color='secondary' onClick={toggle}>X</Button>
        <Button color='secondary' onClick={reset}>Reset</Button>
      </ModalFooter>
    </Modal>
  )
}

export default InventeryView
