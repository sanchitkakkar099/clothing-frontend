// VendorOrderContext.js
import React, {createContext,useState} from 'react';

const VendorOrderContext = createContext();

export const VendorOrderProvider = ({ children }) => {
  const [vendorOrder, setVendorOrder] = useState([]);

  return (
    <VendorOrderContext.Provider value={[ vendorOrder, setVendorOrder ]}>
      {children}
    </VendorOrderContext.Provider>
  );
};

export default VendorOrderContext;
