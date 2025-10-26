"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  InputAdornment,
  DialogActions,
  Select,
  Input,
  MenuItem,
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  FormControl,
  InputLabel,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import DateRangeIcon from "@mui/icons-material/DateRange";
import MessageIcon from "@mui/icons-material/Message";
import "../enquiry-form/enquiryForm.css";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
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

interface FormData {
  carName: string;
  phoneNumber: string;
  email: string;
  startDate: Date;
  endDate: Date;
  name: string;
  message: string;
  pickUpLoc: string;
  dropLocation: string;
  packages: string;
  deliveryMode: string;
  pickupTime: string;
  dropTime: string;
}

const schema = yup.object().shape({
  carName: yup.string().required("Car Name is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  email: yup.string().required("email is required"),
  startDate: yup.date().required("startDate is required"),
  endDate: yup
    .date()
    .required("endDate is required")
    .min(yup.ref("startDate"), "end date can't be before start date"),
  packages: yup.string().required("area is required"),
  name: yup.string().required("name is required"),
  message: yup.string().required("message is required"),
  pickUpLoc: yup.string().required("pickUpLoc is required"),
  dropLocation: yup.string().required("dropLocation is required"),
  deliveryMode: yup.string().required("deliveryMode is required"),
  pickupTime: yup.string().required("pickupTime is required"),
  dropTime: yup.string().required("dropTime is required"),
});

const serverAPI = "https://api.injazrent.ae";
const localAPI = "http://localhost:4000";

const BookNow: React.FC<{ details: any }> = (props) => {
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
  const { details } = props;
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmiti = async () => {
    const data: any = getValues();
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
      handleClose();
      reset();
      const carData = { carDetails: details, enquiryData: data };
      localStorage.setItem("bookingData", JSON.stringify(carData));
      router.push(`/pages/bookingScreen`);
    } catch (error) {
      console.error("Error submitting data:", error);
      handleClose();
      reset();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error submitting data. Please try again later.",
      });
    }
  };

  const currentTime = dayjs();

  const deliveryMode = watch("deliveryMode");
  const [showAdditionalCharges, setShowAdditionalCharges] = useState(false);

  useEffect(() => {
    if (deliveryMode === "Self Pickup Delivery") {
      setValue("pickUpLoc", "Self Pickup Location");
      setValue("dropLocation", "Self Pickup Location");
    } else {
      setValue("pickUpLoc", "");
      setValue("dropLocation", "");
    }
  }, [deliveryMode, setValue]);

  const handleDeliveryModeChange = (event: any) => {
    const selectedMode = event.target.value;
    setValue("deliveryMode", selectedMode);
    setShowAdditionalCharges(selectedMode === "Door Step Delivery");
  };

  // const [showAdditionalCharges, setShowAdditionalCharges] = React.useState(
  //   false
  // );
  // const [deliveryMode, setDeliveryMode] = React.useState('');
  // const [pickupLocation, setPickupLocation] = React.useState('');
  // const [dropLocation, setDropLocation] = React.useState('');

  // React.useEffect(() => {
  //   setValue('deliveryMode', deliveryMode); // Update form control value
  //   // Set default pickup and drop locations based on delivery mode
  //   if (deliveryMode === 'Self Pickup Delivery') {
  //     setPickupLocation('pickup location ');
  //     setDropLocation('Drop location');
  //   } else {
  //     setPickupLocation('');
  //     setDropLocation('');
  //   }
  // }, [setValue, deliveryMode]);

  // const handleDeliveryModeChange = (event: any) => {
  //   const selectedMode = event.target.value;
  //   setDeliveryMode(selectedMode);
  //   setShowAdditionalCharges(selectedMode === "Door Step Delivery");
  // };

  // React.useEffect(() => {
  //   // Set default values when the component mounts
  //   setValue('pickUpLoc', pickupLocation);
  //   setValue('dropLocation', dropLocation);
  // }, []);

  return (
    <div className="dialog_css">
      <Button
        variant="contained"
        onClick={handleClickOpen}
        className="booknow_btn"
      >
        book Now
      </Button>
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            maxHeight: "90vh",
            overflow: "auto"
          }
        }}
      >
        <form onSubmit={handleSubmit(onSubmiti)}>
          <DialogTitle
            sx={{ 
              textAlign: "center", 
              fontWeight: 700, 
              color: "#01437D",
              fontSize: "1.8rem",
              padding: "24px 24px 16px 24px",
              background: "linear-gradient(135deg, #01437D 0%, #0c3b69 100%)",
              color: "white",
              borderRadius: "12px 12px 0 0"
            }}
          >
            <Typography variant="h4" component="h2" sx={{ fontWeight: 700, color: "white" }}>
              Booking
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", mt: 1 }}>
              Complete your car rental booking
            </Typography>
          </DialogTitle>
          
          <DialogContent sx={{ padding: "24px", backgroundColor: "#fafafa" }}>
            <Paper 
              elevation={0} 
              sx={{ 
                padding: 3, 
                borderRadius: 2, 
                backgroundColor: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        autoFocus
                        label="Full Name"
                        id="name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        size="medium"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon sx={{ color: "#01437D" }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: "#f8f9fa",
                            '&:hover fieldset': {
                              borderColor: "#01437D",
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: "#01437D",
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: "#01437D",
                          },
                        }}
                        error={formState.errors?.name ? true : false}
                        helperText={formState.errors?.name?.message}
                        {...register("name", { required: true })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="carName"
                    control={control}
                    defaultValue={`${details?.brand} - ${details?.model} - ${details?.year}`}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Car Selection"
                        id="carName"
                        type="text"
                        fullWidth
                        variant="outlined"
                        size="medium"
                        disabled
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <TimeToLeaveIcon sx={{ color: "#01437D" }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: "#f0f0f0",
                            '& fieldset': {
                              borderColor: "#e0e0e0",
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: "#01437D",
                          },
                        }}
                        error={formState.errors?.carName ? true : false}
                        helperText={formState.errors?.carName?.message}
                        {...register("carName", { required: true })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" size="medium">
                    <InputLabel sx={{ color: "#01437D" }}>Package</InputLabel>
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
                          variant="outlined"
                          size="medium"
                          label="Package"
                          startAdornment={
                            <InputAdornment position="start">
                              <HomeRepairServiceIcon
                                sx={{ color: "#01437D", ml: 1 }}
                              />
                            </InputAdornment>
                          }
                          sx={{
                            borderRadius: 2,
                            backgroundColor: "#f8f9fa",
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: "#01437D",
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: "#01437D",
                            },
                            '& .MuiSelect-icon': {
                              color: "#01437D",
                            },
                          }}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 200,
                                borderRadius: 8,
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              },
                            },
                          }}
                        >
                          <MenuItem disabled value="">
                            <span style={{ color: "#80808096" }}>Select Package</span>
                          </MenuItem>
                          <MenuItem
                            value={`DAILY AED ${details?.discountedPriceDaily} / DAY`}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                DAILY
                              </Typography>
                              <Typography variant="body2" sx={{ color: "#01437D", ml: 1 }}>
                                (AED {details?.discountedPriceDaily} / DAY)
                              </Typography>
                            </Box>
                          </MenuItem>
                          <MenuItem
                            value={`WEEKLY AED ${details?.discountedPriceWeekly} / WEEK`}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                WEEKLY
                              </Typography>
                              <Typography variant="body2" sx={{ color: "#01437D", ml: 1 }}>
                                (AED {details?.discountedPriceWeekly} / WEEK)
                              </Typography>
                            </Box>
                          </MenuItem>
                          <MenuItem
                            value={`MONTHLY AED ${details?.discountedPriceMonthly} / MONTH`}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                MONTHLY
                              </Typography>
                              <Typography variant="body2" sx={{ color: "#01437D", ml: 1 }}>
                                (AED {details?.discountedPriceMonthly} / MONTH)
                              </Typography>
                            </Box>
                          </MenuItem>
                        </Select>
                      )}
                    />
                    {formState.errors.packages && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                        {formState.errors.packages.message}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" size="medium">
                    <InputLabel sx={{ color: "#01437D" }}>Car Delivery Mode</InputLabel>
                    <Controller
                      name="deliveryMode"
                      control={control}
                      defaultValue=""
                      rules={{ required: "deliveryMode Mode is required" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          displayEmpty
                          fullWidth
                          label="Car Delivery Mode"
                          variant="outlined"
                          size="medium"
                          onChange={handleDeliveryModeChange}
                          startAdornment={
                            <InputAdornment position="start">
                              <HomeRepairServiceIcon
                                sx={{ color: "#01437D", ml: 1 }}
                              />
                            </InputAdornment>
                          }
                          sx={{
                            borderRadius: 2,
                            backgroundColor: "#f8f9fa",
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: "#01437D",
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: "#01437D",
                            },
                            '& .MuiSelect-icon': {
                              color: "#01437D",
                            },
                          }}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 200,
                                borderRadius: 8,
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              },
                            },
                          }}
                        >
                          <MenuItem disabled value="">
                            <span style={{ color: "#80808096" }}>
                              Select Delivery Mode
                            </span>
                          </MenuItem>
                          <MenuItem value="Door Step Delivery">
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              Door Step Delivery
                            </Typography>
                          </MenuItem>
                          <MenuItem value="Self Pickup Delivery">
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              Self Pickup Delivery
                            </Typography>
                          </MenuItem>
                        </Select>
                      )}
                    />
                    {formState.errors.deliveryMode && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                        {formState.errors?.deliveryMode?.message}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ 
                    padding: "8px 12px", 
                    backgroundColor: "#f8f9fa", 
                    borderRadius: 2,
                    border: "1px solid #e0e0e0",
                    '&:hover': {
                      borderColor: "#01437D",
                    },
                    '&:focus-within': {
                      borderColor: "#01437D",
                      boxShadow: "0 0 0 2px rgba(1, 67, 125, 0.1)",
                    }
                  }}>
                    <Typography variant="body2" sx={{ color: "#01437D", mb: 1, fontWeight: 500 }}>
                      Phone Number
                    </Typography>
                    <Controller
                      name="phoneNumber"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <PhoneInput
                          {...field}
                          specialLabel={""}
                          country="ae"
                          preferredCountries={["ae", "ru", "us"]}
                          placeholder="Phone Number"
                          inputStyle={{
                            border: "none",
                            backgroundColor: "transparent",
                            fontSize: "16px",
                            padding: "8px 0",
                            width: "100%",
                          }}
                          buttonStyle={{
                            border: "none",
                            backgroundColor: "transparent",
                          }}
                          containerStyle={{
                            width: "100%",
                          }}
                        />
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email"
                        id="email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        size="medium"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon sx={{ color: "#01437D" }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: "#f8f9fa",
                            '&:hover fieldset': {
                              borderColor: "#01437D",
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: "#01437D",
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: "#01437D",
                          },
                        }}
                        error={formState.errors?.email ? true : false}
                        helperText={formState.errors?.email?.message}
                        {...register("email", { required: true })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="pickUpLoc"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Pick up Location"
                        id="pickUpLoc"
                        type="text"
                        fullWidth
                        variant="outlined"
                        size="medium"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnIcon sx={{ color: "#01437D" }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: "#f8f9fa",
                            '&:hover fieldset': {
                              borderColor: "#01437D",
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: "#01437D",
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: "#01437D",
                          },
                        }}
                        error={formState.errors?.pickUpLoc ? true : false}
                        helperText={formState.errors?.pickUpLoc?.message}
                        {...register("pickUpLoc", { required: true })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="dropLocation"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Drop Location"
                        id="dropLocation"
                        type="text"
                        fullWidth
                        variant="outlined"
                        size="medium"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnIcon sx={{ color: "#01437D" }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: "#f8f9fa",
                            '&:hover fieldset': {
                              borderColor: "#01437D",
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: "#01437D",
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: "#01437D",
                          },
                        }}
                        error={formState.errors?.dropLocation ? true : false}
                        helperText={formState.errors?.dropLocation?.message}
                        {...register("dropLocation", { required: true })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Pick Up Date"
                        id="pick-up"
                        type="date"
                        fullWidth
                        variant="outlined"
                        size="medium"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <DateRangeIcon sx={{ color: "#01437D" }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: "#f8f9fa",
                            '&:hover fieldset': {
                              borderColor: "#01437D",
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: "#01437D",
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: "#01437D",
                          },
                        }}
                        error={formState.errors?.startDate ? true : false}
                        helperText={formState.errors?.startDate?.message}
                        {...register("startDate", { required: true })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Pick Off Date"
                        id="pick-off"
                        type="date"
                        fullWidth
                        variant="outlined"
                        size="medium"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <DateRangeIcon sx={{ color: "#01437D" }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: "#f8f9fa",
                            '&:hover fieldset': {
                              borderColor: "#01437D",
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: "#01437D",
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: "#01437D",
                          },
                        }}
                        error={formState.errors?.endDate ? true : false}
                        helperText={formState.errors?.endDate?.message}
                        {...register("endDate", { required: true })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="pickupTime"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Pickup Time"
                        id="pickupTime"
                        type="time"
                        fullWidth
                        variant="outlined"
                        size="medium"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccessTimeIcon sx={{ color: "#01437D" }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: "#f8f9fa",
                            '&:hover fieldset': {
                              borderColor: "#01437D",
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: "#01437D",
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: "#01437D",
                          },
                        }}
                        error={formState.errors?.pickupTime ? true : false}
                        helperText={formState.errors?.pickupTime?.message}
                        {...register("pickupTime", { required: true })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="dropTime"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Drop Time"
                        id="dropTime"
                        type="time"
                        fullWidth
                        variant="outlined"
                        size="medium"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccessTimeIcon sx={{ color: "#01437D" }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: "#f8f9fa",
                            '&:hover fieldset': {
                              borderColor: "#01437D",
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: "#01437D",
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: "#01437D",
                          },
                        }}
                        error={formState.errors?.dropTime ? true : false}
                        helperText={formState.errors?.dropTime?.message}
                        {...register("dropTime", { required: true })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="message"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Message"
                        id="message"
                        type="text"
                        fullWidth
                        variant="outlined"
                        size="medium"
                        multiline
                        rows={3}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                              <MessageIcon sx={{ color: "#01437D" }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: "#f8f9fa",
                            '&:hover fieldset': {
                              borderColor: "#01437D",
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: "#01437D",
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: "#01437D",
                          },
                        }}
                        error={formState.errors?.message ? true : false}
                        helperText={formState.errors?.message?.message}
                        {...register("message", { required: true })}
                      />
                    )}
                  />
                </Grid>
                {showAdditionalCharges && (
                  <Grid item xs={12}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        padding: 2, 
                        backgroundColor: "#fff3cd", 
                        border: "1px solid #ffeaa7",
                        borderRadius: 2,
                        mt: 2
                      }}
                    >
                      <Typography variant="h6" color="error" sx={{ fontWeight: 600, mb: 2 }}>
                        ⚠️ Additional Charges Notice
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="body2">
                          <strong>Abu Dhabi city delivery:</strong> <span style={{ color: "green", fontWeight: 600 }}>AED 52.50</span>
                        </Typography>
                        <Typography variant="body2">
                          <strong>Abu Dhabi airport delivery:</strong> <span style={{ color: "green", fontWeight: 600 }}>AED 90</span>
                        </Typography>
                        <Typography variant="body2">
                          <strong>Dubai city delivery:</strong> <span style={{ color: "green", fontWeight: 600 }}>AED 52.50</span>
                        </Typography>
                        <Typography variant="body2">
                          <strong>Dubai airport delivery:</strong> <span style={{ color: "green", fontWeight: 600 }}>AED 90</span>
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </DialogContent>

          <DialogActions sx={{ 
            padding: "24px", 
            backgroundColor: "#fafafa",
            justifyContent: "center",
            gap: 2
          }}>
            <Button
              variant="outlined"
              color="error"
              size="large"
              onClick={handleClose}
              sx={{
                borderRadius: 2,
                padding: "12px 32px",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "16px",
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  backgroundColor: "rgba(211, 47, 47, 0.04)",
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              size="large"
              sx={{
                backgroundColor: "#01437D",
                borderRadius: 2,
                padding: "12px 32px",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "16px",
                boxShadow: "0 4px 12px rgba(1, 67, 125, 0.3)",
                '&:hover': {
                  backgroundColor: "#012a4a",
                  boxShadow: "0 6px 16px rgba(1, 67, 125, 0.4)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Submit Booking
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default BookNow;
