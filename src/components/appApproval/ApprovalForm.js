// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardHeader,
//   CardTitle,
//   Col,
//   Form,
//   FormFeedback,
//   Input,
//   Label,
//   Row,
// } from "reactstrap";
// import { Controller, useForm } from "react-hook-form";
// import Select from "react-select";
// import toast from "react-hot-toast";
// import { useLocation, useNavigate } from "react-router-dom";
// import {useChangeApprovalMutation } from "../../service";
// import { useSelector, useDispatch } from "react-redux"; // Import useDispatch

// function ApprovalForm() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { state: locationState } = location;
//     const dispatch = useDispatch(); // Initialize useDispatch hook
//     // const [reqCreateCity, resCreateCity] = useCityByIdQuery();
//     // const reqBloodTestDropdown] = useBloodTestDropdownQuery();
//     // const [reqBloodTestDropdown, resBloodTestDropdown] = useBloodTestDropdownMutation();
//     // const editData = useSelector((state) => state.bloodTestState.bloodTestEdit);
//     const cityDropdownQuery = useSelector(
//       (state) => state.cityState.cityDropdown
//     );
  
//     const wardDropdown = useSelector((state) => state.wardState.wardDropdown);
  
//     // const bloodTestDropdown = useSelector(
//     //   (state) => state.bloodTestState.bloodTestDropdown
//     // );
//     const [parentValue, setParentValue] = useState(null);
//     // const [bloodTestOptions, setBloodTestOptions] = useState([]);
//     // const[reqWardById,resWardMemberById] = useWardByIdQuery();
//     const [reqChangeapproval, resChangeapproval] = useChangeApprovalMutation();
    
//     const {
//       control,
//       handleSubmit,
//       formState: { errors },
//       reset,
//       setValue,
//       setError,
//     } = useForm();
//     useEffect(() => {
//       if (resWardMemberById?.isSuccess && resWardMemberById?.data?.data) {
//         reset({
//           ...resWardMemberById?.data?.data,
//           wname:{
//             label: resWardMemberById?.data?.data?.wname?.wname,
//             value: resWardMemberById?.data?.data?.wname?.wname,
//           },
//           cityname: {
//             label: resWardMemberById?.data?.data?.cityname?.cityname,
//             value: resWardMemberById?.data?.data?.cityname?._id,
//           },
//           isAct: {
//             label: resWardMemberById?.data?.data?.isAct ? "Active" : "Inactive",
//             value: resWardMemberById?.data?.data?.isAct,
//           },
//         });
//         dispatch(setWardMemberEdit({
//           ...resWardMemberById.data.data,
//           wname:{
//             label: resWardMemberById?.data?.data?.wname,
//             value: resWardMemberById?.data?.data?.wname?.wname,
//           },
//           cityname: {
//             label: resWardMemberById?.data?.data?.cityname?.cityname,
//             value: resWardMemberById?.data?.data?.cityname?._id,
//           },
//           isAct: {
//             label: resWardMemberById?.data?.data?.isAct ? "Active" : "Inactive",
//             value: resWardMemberById?.data?.data?.isAct,
//           },
          
//         }))
//       }
//     }, [resWardMemberById]);
  
//     useEffect(() => {
//       if (resChangeapproval?.isSuccess) {
//         toast.success(resChangeapproval?.data?.message, {
//           position: "top-center",
//           duration: 3000,
//         });
//         navigate("/wardmember-list");
//       }
//     }, [resChangeapproval?.isSuccess]);
  
//     // useEffect(() => {
//     //   if (resChangeapproval?.isError) {
//     //     toast.isError(resChangeapproval?.data?.message, {
//     //       position: "top-center",
//     //       duration: 3000,
//     //     });
//     //     navigate("/wardmember-form");
//     //   }
//     // }, [resChangeapproval?.isError]);
  
//     useEffect(() => {
//       console.log(resCityDropdown);
//       if (resCityDropdown?.isSuccess) {
//         dispatch(setCityDropdown(resCityDropdown?.data?.data));
//         console.log("categorydropdown response", resCityDropdown?.data?.data);
//       }
//     }, [resCityDropdown]);
  
//     useEffect(() => {
//       console.log("resWardDropDown", resWardDropdown);
//       dispatch(setWardDropdown(resWardDropdown?.data?.data));
//       console.log("wardDropdown Data", resWardDropdown);
//     }, [resWardDropdown]);
  
//     const onSubmit = async (state) => {
//       const payload = {
//         ...state,
//         cityname: state?.cityname?.value,
//         wname:state?.wname?.value,
//         wmembername: state?.wmembername,
//         isAct:state?.isAct?.value,
//         wmemberphone:state?.wmemberphone
//       };
//       reqChangeapproval(payload);
//     };
//   return (
//     <div>
//        <Card>
//         <CardHeader>
//         <CardTitle tag="h4"> {locationState?.isEdit ? " Edit Ward Member" : "Add Ward Member"}</CardTitle>
//         </CardHeader>
//         <CardBody>
//           <Form onSubmit={handleSubmit(onSubmit)}>
//             <Row>
//             <Col md="6" className="mb-1">
//                 <Label className="form-label" for="shopname">
//                   Shop Name
//                 </Label>
//                 <Controller
//                   id="shopname"
//                   name="shopname"
//                   control={control}
//                   rules={{ required: "shop Name is required" }}
//                   render={({ field }) => (
//                     <Input placeholder="Shop name" {...field} />
//                   )}
//                 />
//                 {errors?.shopname && (
//                   <FormFeedback>{errors?.shopname?.message}</FormFeedback>
//                 )}
//               </Col>
//               <Col md="6" className="mb-1">
//                 <Label className="form-label" for="Email">
//                   Owner Email
//                 </Label>
//                 <Controller
//                   id="Email"
//                   name="Email"
//                   control={control}
//                   rules={{ required: "Owner Emial is required" }}
//                   render={({ field }) => (
//                     <Input placeholder="Owner Email" {...field} />
//                   )}
//                 />
//                 {errors?.Email && (
//                   <FormFeedback>{errors?.Email?.message}</FormFeedback>
//                 )}
//               </Col>
//               <Col md="6" sm="12" className="mb-1">
//               <Label for="isApp">Current App Status</Label>
//               <Controller
//                 id="isApp"
//                 name="isApp"
//                 control={control}
//                 rules={{ required: "Member status is required" }}
//                 render={({ field: { onChange, value } }) => (
//                   <Select
//                     isClearable
//                     options={[
//                       { label: "Approved", value: "true" },
//                       { label: "Disapproved", value: "false" },
//                     ]}
//                     className="react-select"
//                     classNamePrefix="select"
//                     onChange={(selectedOption) => {
//                       onChange(selectedOption);
//                     }}
//                     value={value ? value : null}
//                   />
//                 )}
//               />
//               {errors.isApp && (
//                 <FormFeedback>{errors?.isApp?.message}</FormFeedback>
//               )}
//             </Col> 
//               <Col md="12" className="d-flex justify-content-end">
//                 <Button
//                   type="reset"
//                   color="secondary"
//                   className="me-1"
//                   onClick={() => navigate("/wardmember-list")}
//                   outline
//                 >
//                   Back
//                 </Button>
//                 <Button
//                   type="reset"
//                   color="danger"
//                   className="me-1"
//                   onClick={() => reset()}
//                   outline
//                 >
//                   Reset
//                 </Button>
//                 <Button type="submit" color="primary">
//                   Submit
//                 </Button>
//               </Col>
//             </Row>
//           </Form>
//         </CardBody>
//       </Card>
//     </div>
//   )
// }

// export default ApprovalForm
