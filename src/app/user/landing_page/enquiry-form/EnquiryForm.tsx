"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PersonIcon from "@mui/icons-material/Person";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import DateRangeIcon from "@mui/icons-material/DateRange";
import MessageIcon from "@mui/icons-material/Message";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../enquiry-form/enquiryForm.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Grid, MenuItem, Paper, Select } from "@mui/material";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { serverUrl } from "@/utils/helper";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TimeField } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useTranslation } from "react-i18next";

interface FormData {
  phoneNumber: string;
  email: string;
  startDate: Date;
  endDate: Date;
  name: string;
  brand: string;
  model: string;
  packages: string;
  message: string;
  pickUpLoc: string;
  dropLocation: string;
  deliveryMode: string;
  pickupTime: string;
  dropTime: string;
}

const schema = yup.object().shape({
  phoneNumber: yup.string().required("Phone Number is required"),
  email: yup.string().required("email is required"),
  startDate: yup.date().required("startDate is required"),
  endDate: yup
    .date()
    .required("endDate is required")
    .min(yup.ref("startDate"), "end date can't be before start date"),
  name: yup.string().required("name is required"),
  packages: yup.string().required("packages is required"),
  message: yup.string().required("message is required"),
  pickUpLoc: yup.string().required("pickUpLoc is required"),
  dropLocation: yup.string().required("dropLocation is required"),
  deliveryMode: yup.string().required("deliveryMode is required"),
  pickupTime: yup.string().required("pickupTime is required"),
  dropTime: yup.string().required("dropTime is required"),
});
const serverAPI = "https://api.injazrent.ae";
const localAPI = "http://localhost:4000";

function EnquiryForm() {
  const {t}= useTranslation();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState,
    getValues,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBrand("");
    setSelectedModel("");
    reset();
  };

  const onSubmiti = async () => {
    const data = getValues();
    data.brand = selectedBrand;
    data.model = selectedModel;
    try {
      const response = await axios.post(serverUrl + "/user/createInquiry", {
        ...data,
      });
      Swal.fire({
        icon: "success",
        title: "!! Success !!",
        text: `Your Booking has been Sent Successfully.Here is your BookingId: ${response?.data?.result?.bookingId} 
              You will get the confirmation on your email: ${response?.data?.result?.email} and your number: ${response?.data?.result?.phoneNumber}.`,
      });
      reset();
      selectedBrand;
      handleClose();
    } catch (error) {
      console.error("Error submitting data:", error);
      reset();
      handleClose();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error submitting data. Please try again later.",
      });
    }
  };

  const [modelDrop, setModelDrop] = useState([]);
  const [modelDropByBrand, setModelDropByBrand] = useState([]);
  const [brand, setBrand] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  useEffect(() => {
    axios
      .get(serverUrl + "/user/getAllCarModel")
      .then((res) => {
        setModelDrop(res.data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });

    axios
      .get(serverUrl + "/user/getAllBrands")
      .then((res) => {
        setBrand(res.data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, []);

  useEffect(() => {
    if (!selectedBrand) {
      setModelDropByBrand(modelDrop);
    } else {
      const filteredModels = modelDrop.filter(
        (item: any) => item.Brand.toLowerCase() === selectedBrand.toLowerCase()
      );
      setModelDropByBrand(filteredModels);
    }
  }, [selectedBrand, modelDrop]);

  const handleBrandChange = (e: any) => {
    const brandValue = e.target.value;
    setSelectedBrand(brandValue);
    setSelectedModel(""); // Clear selected model when brand changes
  };

  const handleModelChange = (e: any) => {
    const modelValue = e.target.value;
    setSelectedModel(modelValue);
  };

  const currentTime = dayjs();

  const deliveryMode = watch("deliveryMode");
  const [showAdditionalCharges, setShowAdditionalCharges] = useState(false);

  useEffect(() => {
    if (deliveryMode === 'Self Pickup Delivery') {
      setValue('pickUpLoc', 'Self Pickup Location');
      setValue('dropLocation', 'Self Pickup Location');
    } else {
      setValue('pickUpLoc', '');
      setValue('dropLocation', '');
    }
  }, [deliveryMode, setValue]);

  const handleDeliveryModeChange = (event:any) => {
    const selectedMode = event.target.value;
    setValue("deliveryMode", selectedMode);
    setShowAdditionalCharges(selectedMode === 'Door Step Delivery');
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        className="enquiry_btn"
      >
        {t("landingPage:navbar.enquiry")}
      </Button>
      <Box className="css_model">
        <Dialog className="css_model" open={open} onClose={handleClose}>
          <form onSubmit={handleSubmit(onSubmiti)}>
            <DialogTitle
              sx={{ textAlign: "center", fontWeight: "700", color: "#0c3b69" }}
            >
              Enquiry
            </DialogTitle>
            <Grid container>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <DialogContent>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        autoFocus
                        placeholder="Name"
                        id="name"
                        type="text"
                        fullWidth
                        variant="standard"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon sx={{ color: "#0c3b69" }} />
                            </InputAdornment>
                          ),
                        }}
                        error={formState.errors?.name ? true : false}
                        helperText={formState.errors?.name?.message}
                        {...register("name", { required: true })}
                      />
                    )}
                  />
                </DialogContent>
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <DialogContent>
                  <Controller
                    name="brand"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        {...field}
                        displayEmpty
                        fullWidth
                        variant="standard"
                        size="small"
                        value={selectedBrand}
                        onChange={(e) => handleBrandChange(e)}
                        input={
                          <Input
                            startAdornment={
                              <InputAdornment position="start">
                                <EmojiTransportationIcon
                                  sx={{ color: "#0c3b69" }}
                                />
                              </InputAdornment>
                            }
                          />
                        }
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 200,
                            },
                          },
                        }}
                      >
                        <MenuItem disabled value="">
                          <span style={{ color: "#80808096" }}>Brand</span>
                        </MenuItem>
                        {brand.map((item: any) => (
                          <MenuItem key={item.name} value={item.name}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </DialogContent>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <DialogContent>
                  <Controller
                    name="model"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        {...field}
                        displayEmpty
                        fullWidth
                        variant="standard"
                        size="small"
                        value={selectedModel}
                        onChange={(e) => handleModelChange(e)}
                        input={
                          <Input
                            startAdornment={
                              <InputAdornment position="start">
                                <DashboardIcon sx={{ color: "#0c3b69" }} />
                              </InputAdornment>
                            }
                          />
                        }
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 200,
                            },
                          },
                        }}
                      >
                        <MenuItem disabled value="">
                          <span style={{ color: "#80808096" }}>Model</span>
                        </MenuItem>
                        {modelDropByBrand.map((item: any) => (
                          <MenuItem key={item._id} value={item.Name}>
                            {item.Name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </DialogContent>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                {" "}
                <DialogContent>
                  <Controller
                    name="packages"
                    control={control}
                    defaultValue=""
                    rules={{ required: "packages is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        displayEmpty
                        fullWidth
                        variant="standard"
                        size="small"
                        input={
                          <Input
                            startAdornment={
                              <InputAdornment position="start">
                                <HomeRepairServiceIcon
                                  sx={{ color: "#0c3b69" }}
                                />
                              </InputAdornment>
                            }
                          />
                        }
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 200,
                            },
                          },
                        }}
                      >
                        <MenuItem disabled value="">
                          <span style={{ color: "#80808096" }}>Package</span>
                        </MenuItem>
                        <MenuItem value="DAILY">DAILY</MenuItem>
                        <MenuItem value="WEEKLY">WEEKLY</MenuItem>
                        <MenuItem value="MONTHLY">MONTHLY</MenuItem>
                      </Select>
                    )}
                  />
                  {formState.errors.packages && (
                    <p
                      style={{ color: "red", margin: "0px", fontSize: "12px" }}
                    >
                      {formState.errors.packages.message}
                    </p>
                  )}
                </DialogContent>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                {" "}
                <DialogContent>
                  <Controller
                    name="deliveryMode"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Car Delivery Mode is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        displayEmpty
                        fullWidth
                        variant="standard"
                        size="small"
                        onChange={handleDeliveryModeChange}
                        input={
                          <Input
                            startAdornment={
                              <InputAdornment position="start">
                                <HomeRepairServiceIcon
                                  sx={{ color: "#0c3b69" }}
                                />
                              </InputAdornment>
                            }
                          />
                        }
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 200,
                            },
                          },
                        }}
                      >
                        <MenuItem disabled value="">
                          <span style={{ color: "#80808096" }}>
                            Car Delivery Mode
                          </span>
                        </MenuItem>
                        <MenuItem value="Door Step Delivery">
                          Door Step Delivery
                        </MenuItem>
                        <MenuItem value="Self Pickup Delivery">
                          Self Pickup Delivery
                        </MenuItem>
                      </Select>
                    )}
                  />
                  {formState.errors.deliveryMode && (
                    <p
                      style={{ color: "red", margin: "0px", fontSize: "12px" }}
                    >
                      {formState.errors?.deliveryMode?.message}
                    </p>
                  )}
                </DialogContent>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Box sx={{ padding: "20px 24px" }} className="phoneNumberField">
                  {/* <DialogContent> */}
                  <Controller
                    name="phoneNumber"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <PhoneInput
                        inputClass="phoneNumberField"
                        {...field}
                        specialLabel={""}
                        country="ae"
                        preferredCountries={["ae", "ru", "us"]}
                        placeholder="Phone Number"
                      />
                      // <TextField
                      //   {...field}
                      //   // autoFocus
                      //   placeholder="Phone"
                      //   id="phone"
                      //   type="text"
                      //   fullWidth
                      //   variant="standard"
                      //   size="small"
                      //   InputProps={{
                      //     startAdornment: (
                      //       <InputAdornment position="start">
                      //         <PhoneIcon sx={{ color: "#0c3b69" }} />
                      //       </InputAdornment>
                      //     ),
                      //   }}
                      //   error={formState.errors?.phoneNumber ? true : false}
                      //   helperText={formState.errors?.phoneNumber?.message}
                      //   {...register("phoneNumber", { required: true })}
                      // />
                    )}
                  />
                  {/* </DialogContent> */}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <DialogContent>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        // autoFocus
                        placeholder="Email"
                        id="email"
                        type="text"
                        fullWidth
                        variant="standard"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon sx={{ color: "#0c3b69" }} />
                            </InputAdornment>
                          ),
                        }}
                        error={formState.errors?.email ? true : false}
                        helperText={formState.errors?.email?.message}
                        {...register("email", { required: true })}
                      />
                    )}
                  />
                </DialogContent>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <DialogContent>
                  <Controller
                    name="pickUpLoc"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        // autoFocus
                        placeholder="Pick up Location"
                        id="pickUpLoc"
                        type="text"
                        fullWidth
                        variant="standard"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnIcon sx={{ color: "#0c3b69" }} />
                            </InputAdornment>
                          ),
                        }}
                        error={formState.errors?.pickUpLoc ? true : false}
                        helperText={formState.errors?.pickUpLoc?.message}
                        {...register("pickUpLoc", { required: true })}
                      />
                    )}
                  />
                </DialogContent>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <DialogContent>
                  <Controller
                    name="dropLocation"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        // autoFocus
                        placeholder="Drop Location"
                        id="dropLocation"
                        type="text"
                        fullWidth
                        variant="standard"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnIcon sx={{ color: "#0c3b69" }} />
                            </InputAdornment>
                          ),
                        }}
                        error={formState.errors?.dropLocation ? true : false}
                        helperText={formState.errors?.dropLocation?.message}
                        {...register("dropLocation", { required: true })}
                      />
                    )}
                  />
                </DialogContent>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <DialogContent>
                  <Controller
                    name="message"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        // autoFocus
                        placeholder="Message"
                        id="message"
                        type="text"
                        fullWidth
                        variant="standard"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MessageIcon sx={{ color: "#0c3b69" }} />
                            </InputAdornment>
                          ),
                        }}
                        error={formState.errors?.message ? true : false}
                        helperText={formState.errors?.message?.message}
                        {...register("message", { required: true })}
                      />
                    )}
                  />
                </DialogContent>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <DialogContent>
                  <Controller
                    name="startDate"
                    control={control}
                    //   defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        // autoFocus
                        label="Pick Up Date"
                        placeholder="Pick Up"
                        id="pick-up"
                        type="date"
                        fullWidth
                        variant="standard"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <DateRangeIcon sx={{ color: "#0c3b69" }} />
                            </InputAdornment>
                          ),
                        }}
                        error={formState.errors?.startDate ? true : false}
                        helperText={formState.errors?.startDate?.message}
                        {...register("startDate", { required: true })}
                      />
                    )}
                  />
                </DialogContent>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <DialogContent>
                  <Controller
                    name="endDate"
                    control={control}
                    //   defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        // autoFocus
                        label="Pick Off Date"
                        placeholder="Pick Off"
                        id="pick-off"
                        type="date"
                        fullWidth
                        variant="standard"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <DateRangeIcon sx={{ color: "#0c3b69" }} />
                            </InputAdornment>
                          ),
                        }}
                        error={formState.errors?.endDate ? true : false}
                        helperText={formState.errors?.endDate?.message}
                        {...register("endDate", { required: true })}
                      />
                    )}
                  />
                </DialogContent>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <DialogContent>
                  <Controller
                    name="pickupTime"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Pickup Time"
                        placeholder="pickupTime"
                        id="pickupTime"
                        type="time"
                        fullWidth
                        variant="standard"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccessTimeIcon sx={{ color: "#0c3b69" }} />
                            </InputAdornment>
                          ),
                        }}
                        error={formState.errors?.pickupTime ? true : false}
                        helperText={formState.errors?.pickupTime?.message}
                        {...register("pickupTime", { required: true })}
                      />
                    )}
                  />
                </DialogContent>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <DialogContent>
                  <Controller
                    name="dropTime"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Drop Time"
                        placeholder="dropTime"
                        id="dropTime"
                        type="time"
                        fullWidth
                        variant="standard"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccessTimeIcon sx={{ color: "#0c3b69" }} />
                            </InputAdornment>
                          ),
                        }}
                        error={formState.errors?.dropTime ? true : false}
                        helperText={formState.errors?.dropTime?.message}
                        {...register("dropTime", { required: true })}
                      />
                    )}
                  />
                </DialogContent>
              </Grid>
              {showAdditionalCharges && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <DialogContent>
                  <h5 style={{ color: "red" }}>
                    Note:- Please pay attention here
                  </h5>
                  <h6>
                    Abu Dhabi city delivery additional charges is{" "}
                    <span style={{ color: "green" }}>AED 52.50</span>
                  </h6>
                  <h6>
                    Abu Dhabi airport delivery additional charges is
                    <span style={{ color: "green" }}> AED 90</span>
                  </h6>
                  <h6>
                    Dubai city delivery additional charges is{" "}
                    <span style={{ color: "green" }}>AED 52.50</span>
                  </h6>
                  <h6>
                    Dubai airport delivery additional charges is{" "}
                    <span style={{ color: "green" }}>AED 90</span>
                  </h6>
                </DialogContent>
              </Grid>
              )
            }
            </Grid>
            <DialogActions sx={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" size="small">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </>
  );
}

export default EnquiryForm;
