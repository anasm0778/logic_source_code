"use client";
import {
  Box,
  Button,
  CardMedia,
  Collapse,
  Container,
  Grid,
  IconButton,
  Tabs,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../../adminpage/pages/createdCars/CreatedCars.css";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { serverUrl } from "@/utils/helper";
import NavFooter from "@/utils/Na_Fo";
import Image from "next/image";
import SwipeableViews from "react-swipeable-views";
import DriverEligibility from "@/components/DriverEligibility";
import {
  AppBarMain,
  AppBarMainBox,
  AppBarTabs,
  BookButtonBox1,
  BookButtonMain,
  BookingTypo,
  BookingTypo1,
  CarChargeBox1,
  CarChargeTypo1,
  CarDetailsBoxCss,
  CarDetailscontentBox,
  DailyWeeklyBox1,
  DailyWeeklyTypo1,
  FieldsBox,
  HighlightBox,
  HightlightTypo,
  InsuranceTypo1,
  MainBoxBooking,
  MonthlyTypo1,
  MonthlyTypo2,
  PriceBrakeBox1,
  PriceBrakeBox2,
  PriceBrakeTypo1,
  PriceBrakeTypo2,
  TabBoxMain,
  TitleTypo,
  TitleTypo2,
} from "./styleData";
import TextFieldComp from "./TextFieldComp";
import Swal from "sweetalert2";
import ExpandMoreIcon from "@mui/icons-material/Add";
import ExpandLessIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <TabBoxMain>
          <Box>{children}</Box>
        </TabBoxMain>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

interface getCarData {
  _id: string;
  brand: string;
  model: string;
  category: string;
  year: string;
  image: string;
  location: string[];
  vehicleType: string;
  cheapestCar: string;
  status: string;
  services: string[];
  description: string;
  actualPriceDaily: string;
  discountedPriceDaily: string;
  actualPriceWeekly: string;
  discountedPriceWeekly: string;
  actualPriceMonthly: string;
  discountedPriceMonthly: any;
  transmission: string;
  engineCapacity: string;
  laggageBootCapacity: string;
  securityDeposit: string;
  cashType: string[];
  paiInsuranceDaily: string;
  paiInsuranceWeekly: string;
  paiInsuranceMonthly: any;
  paymentType: string[];
  seater: string;
  requirementsForUAEResidents: string[];
  requirementsForTourists: string[];
  externalImage: string[];
  babySeatChargeDaily: string;
  babySeatChargeWeekly: string;
  babySeatChargeMonthly: string;
  freeDailyKM: string;
  freeWeeklyKM: string;
  freeMonthlyKM: string;
  cdwDaily: string;
  cdwWeekly: string;
  cdwMonthly: string;
  keyFeatures: any;
  deliveryChargeDaily: string;
  deliveryChargeWeekly: string;
  deliveryChargeMonthly: string;
  additionalMileageCharge: string;
  excessClaimCharge: string;
  salikTollCharge: string;
  airportPickupCharge: string;
  airportDeliveryCharge: string;
  carProvider: string;
  branchLocation: string;
  isOfferApplied: string;
  offerType: string;
  oneMonthPriceOf2500Km: any;
  oneMonthPriceOf5000Km: any;
  threeMonthPriceOf2500Km: any;
  threeMonthPriceOf5000Km: any;
  fuel: string;
  maxPower: string;
  torque: string;
  sixMonthPriceOf2500Km: any;
  sixMonthPriceOf5000Km: any;
  eightMonthPriceOf2500Km: any;
  nineMonthPriceOf2500Km: any;
  nineMonthPriceOf5000Km: any;
}

const CreatedCar = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("verify");
  const router = useRouter();

  const [data, setData] = useState<getCarData>({
    _id: "",
    brand: "",
    model: "",
    category: "",
    year: "",
    image: "",
    location: [],
    vehicleType: "",
    cheapestCar: "",
    status: "",
    services: [],
    description: "",
    actualPriceDaily: "",
    discountedPriceDaily: "",
    actualPriceWeekly: "",
    discountedPriceWeekly: "",
    actualPriceMonthly: "",
    discountedPriceMonthly: 0,
    transmission: "",
    engineCapacity: "",
    laggageBootCapacity: "",
    securityDeposit: "",
    cashType: [],
    paiInsuranceDaily: "",
    paiInsuranceWeekly: "",
    paiInsuranceMonthly: 0,
    paymentType: [],
    seater: "",
    requirementsForUAEResidents: [],
    requirementsForTourists: [],
    externalImage: [],
    babySeatChargeDaily: "",
    babySeatChargeWeekly: "",
    babySeatChargeMonthly: "",
    freeDailyKM: "",
    freeWeeklyKM: "",
    freeMonthlyKM: "",
    cdwDaily: "",
    cdwWeekly: "",
    cdwMonthly: "",
    keyFeatures: [],
    deliveryChargeDaily: "",
    deliveryChargeWeekly: "",
    deliveryChargeMonthly: "",
    additionalMileageCharge: "",
    excessClaimCharge: "",
    salikTollCharge: "",
    airportPickupCharge: "",
    airportDeliveryCharge: "",
    carProvider: "",
    branchLocation: "",
    isOfferApplied: "",
    offerType: "",
    oneMonthPriceOf2500Km: 0,
    oneMonthPriceOf5000Km: 0,
    threeMonthPriceOf2500Km: 0,
    threeMonthPriceOf5000Km: 0,
    sixMonthPriceOf2500Km: 0,
    sixMonthPriceOf5000Km: 0,
    eightMonthPriceOf2500Km: 0,
    fuel: "",
    maxPower: "",
    torque: "",
    nineMonthPriceOf2500Km: 0,
    nineMonthPriceOf5000Km: 0,
  });

  const [selectedPrice, setSelectedPrice] = useState(0); // state for selected price
  const [selectedInsuarance, setSelectedInsuarance] = useState(0); // state for selected insuarance
  const [insuranceBoxColor, setInsuranceBoxColor] = useState(""); // state for insuarance box color
  const [monthlyBoxColor, setMonthlyBoxColor] = useState(""); // state for insuarance box color
  const [mileage, setMileage] = useState(0); // state for selected milage
  const [selectedCount, setSelectedCount] = useState(1); // state for selected count
  const [selectedMileage, setSelectedMileage] = useState(
    typeof window !== "undefined" ? sessionStorage.getItem("subscription") ?? "" : ""
  ); // state for selected mileage box color
  const [dailyWeekly, setDailyWeekly] = useState(
    typeof window !== "undefined" ? sessionStorage.getItem("subscription") ?? "" : ""
  ); // state for daily weekly box
  const [userfullName, setUserFullName] = useState("");
  const [userphoneNumber, setUserPhoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userStartDate, setUserStartDate] = useState("");
  const [userCarDeliveryTime, setUserCarDeliveryTime] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [daysWeeks, setDaysWeeks] = useState("");
  const [selectedDaysPrice, setSelectedDaysPrice] = useState(0);
  const [bookingDaysWeeks, setBookingDaysWeeks] = useState(
    "Please select above"
  );
  const [insuDailyWeekly, setInsuDailyWeekly] = useState(0);
  const [bookingMonth, setBookingMonth] = useState("Please select above");

  const handleBoxClick = (price: any, count: any, monthText: any) => {
    // Check if mileage is selected before allowing monthly duration selection
    if (!selectedMileage) {
      setError("Please select a mileage option (2500 KM or 5000 KM) before choosing a monthly duration.");
      return;
    }
    
    setError(""); // Clear any previous errors
    setSelectedPrice(price); // update selected price
    setSelectedCount(count);
    setMonthlyBoxColor(monthText);
    setSelectedDaysPrice(0);
    setBookingDaysWeeks("");
    setBookingMonth(monthText);
    
    // Recalculate insurance cost if Full Cover is already selected
    let insuranceCost = 0;
    if (insuranceBoxColor === "Full Cover") {
      insuranceCost = parseFloat(data?.cdwMonthly ?? 0) * count;
      setSelectedInsuarance(insuranceCost);
      setInsuDailyWeekly(insuranceCost);
    } else {
      // Reset insurance if no option is selected
      setSelectedInsuarance(0);
      setInsuDailyWeekly(0);
    }
    
    // Debug logging for monthly duration change
    console.log("Monthly Duration Change Debug:", {
      monthText,
      count,
      insuranceBoxColor,
      insuranceCost,
      cdwMonthly: data?.cdwMonthly,
    });
  };
  const handleInsauranceBoxClick = (price: any, monthText: any) => {
    setInsuranceBoxColor(monthText);
    
    // Calculate insurance cost based on booking type and duration
    let insuranceCost = 0;
    if (monthText === "Full Cover") {
      if (dailyWeekly === "monthly") {
        // For monthly bookings, multiply by the number of months selected
        insuranceCost = parseFloat(data?.cdwMonthly ?? 0) * selectedCount;
      } else if (dailyWeekly === "dailyAndWeekly") {
        if (daysWeeks === "days") {
          insuranceCost = parseFloat(data?.cdwDaily ?? 0) * selectedCount;
        } else if (daysWeeks === "weeks") {
          insuranceCost = parseFloat(data?.cdwWeekly ?? 0) * selectedCount;
        }
      }
    }
    
    // Set both insurance variables to the calculated total cost
    setSelectedInsuarance(insuranceCost); // This is used in monthly price breakdown
    setInsuDailyWeekly(insuranceCost);   // This is used in daily/weekly price breakdown
    
    // Debug logging for insurance calculation
    console.log("Insurance Click Debug:", {
      monthText,
      dailyWeekly,
      daysWeeks,
      selectedCount,
      insuranceCost,
      cdwDaily: data?.cdwDaily,
      cdwWeekly: data?.cdwWeekly,
      cdwMonthly: data?.cdwMonthly,
      perMonthRate: parseFloat(data?.cdwMonthly ?? 0),
      totalForMonths: parseFloat(data?.cdwMonthly ?? 0) * selectedCount,
    });
  };
  const handleSelectedDaysBoxClick = (
    price: any,
    itemText: any,
    count: any
  ) => {
    // Check if insurance is selected before allowing day selection
    if (!insuranceBoxColor) {
      setError("Please select an insurance option (Standard Cover or Full Cover) before choosing the number of days.");
      return;
    }
    
    setError(""); // Clear any previous errors
    setSelectedDaysPrice(price);
    setBookingDaysWeeks(itemText);
    setSelectedCount(count);
    setMonthlyBoxColor("");
    
    // Recalculate insurance cost if Full Cover is selected
    let insuranceCost = 0;
    if (insuranceBoxColor === "Full Cover") {
      if (daysWeeks === "days") {
        insuranceCost = parseFloat(data?.cdwDaily ?? 0) * count;
      } else if (daysWeeks === "weeks") {
        insuranceCost = parseFloat(data?.cdwWeekly ?? 0) * count;
      }
    }
    
    setInsuDailyWeekly(insuranceCost);
    
    // Debug logging for days/weeks selection
    console.log("Days/Weeks Selection Debug:", {
      itemText,
      count,
      daysWeeks,
      insuranceBoxColor,
      insuranceCost,
      cdwDaily: data?.cdwDaily,
      cdwWeekly: data?.cdwWeekly,
    });
  };

  const handleMileageBoxClick = (mileage: any) => {
    // const mileageCost = mileage === "5000 KM" ? 300 * selectedCount : 0;
    const mileageCost = mileage === "5000 KM Mileage" ? 300 : 0;
    setMileage(mileageCost); // update additional mileage cost
    setSelectedMileage(mileage);
    setMonthlyBoxColor("");
    setSelectedPrice(0);
    setInsuranceBoxColor("");
    setSelectedInsuarance(0);
    setBookingMonth("Please Select Above");
    setError(""); // Clear any previous errors
  };

  const handleDailyWeekly = (text: any) => {
    setDailyWeekly(text);
    setSelectedPrice(0);
    setSelectedCount(1);
    setSelectedInsuarance(0);
    setInsuranceBoxColor("");
    setMonthlyBoxColor("");
    setMileage(0);
    setSelectedMileage("");
    setDaysWeeks("");
    setBookingDaysWeeks("Please select above");
    setBookingMonth("Please select above");
    setInsuDailyWeekly(0);
    setSelectedDaysPrice(0);
  };
  const handleDaysWeeks = (text: any) => {
    setDaysWeeks(text);
    setSelectedDaysPrice(0);
    setBookingDaysWeeks("Please select above");
    setSelectedInsuarance(0);
    setInsuranceBoxColor("");
    setMonthlyBoxColor("");
    setSelectedCount(1);
    setInsuDailyWeekly(0);
    
    // Debug logging for days/weeks switch
    console.log("Days/Weeks Switch Debug:", {
      text,
      previousInsuranceBoxColor: insuranceBoxColor,
      previousInsuDailyWeekly: insuDailyWeekly,
    });
  };

  useEffect(() => {
    if (id) {
      axios
        .get(serverUrl + `/user/getCar/${id}`)
        .then((res) => {
          //  ;
          setData(res.data.data);
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const [phoneemail, setPhoneEmail] = useState({});
  useEffect(() => {
    axios
      .get(serverUrl + "/admin/getAllsettings")
      .then((res) => {
        setPhoneEmail(res.data.data[0]);
        console.log(res.data.data[0], "phoneEmail");
      })
      .catch((err) => {
        console.log(err, "...error");
      });
  }, []);

  const phoneData: any = phoneemail;

  const carDetailsBox = [
    { image: "/Seat.png", title: "Capacity", text: data?.seater },
    {
      image: "/Cruise control.png",
      title: "Transmission",
      text: "Cruise control",
    },
    { image: "/Abs.png", title: "Braking System", text: "ABS Brakes" },
    { image: "/Airbag.png", title: "Safety", text: "Dual Front Airbags" },
  ];

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const highlights = [
    { text: "Engine", value: `${data?.engineCapacity}L Engine` },
    { text: "Transmission", value: data?.transmission },
    { text: "Fuel", value: data?.fuel ? data?.fuel : "Petrol" },
    { text: "Seats", value: data?.seater },
  ];
  const technicalDetails = [
    { text: "Max Power", value: data?.maxPower ? data?.maxPower : "100 HP" },
    { text: "Torque", value: data?.torque ? data?.torque : "14 NM" },
    { text: "Laggage Boot Capacity", value: data.laggageBootCapacity },
    { text: "Category", value: data?.category },
  ];

  const monthlyBooking = [
    {
      monthText: "9 Months",
      savingAmount: "100",
      price:
        selectedMileage === "5000 KM Mileage"
          ? parseFloat(data?.nineMonthPriceOf5000Km || 0)
          : parseFloat(data?.nineMonthPriceOf2500Km || 0),
      count: 9,
    },
    {
      monthText: "6 Months",
      savingAmount: "80",
      price:
        selectedMileage === "5000 KM Mileage"
          ? parseFloat(data?.sixMonthPriceOf5000Km || 0)
          : parseFloat(data?.sixMonthPriceOf2500Km || 0),
      count: 6,
    },
    {
      monthText: "3 Months",
      savingAmount: "60",
      price:
        selectedMileage === "5000 KM Mileage"
          ? parseFloat(data?.threeMonthPriceOf5000Km || 0)
          : parseFloat(data?.threeMonthPriceOf2500Km || 0),
      count: 3,
    },
    {
      monthText: "1 Month",
      savingAmount: "40",
      price:
        selectedMileage === "5000 KM Mileage"
          ? parseFloat(data?.oneMonthPriceOf5000Km || 0)
          : parseFloat(data?.oneMonthPriceOf2500Km || 0),
      count: 1,
    },
  ];

  const insuranceBox = [
    {
      monthText: "Standard Cover",
      savingAmount: "No additional cost",
      price: 0,
    },
    {
      monthText: "Full Cover",
      savingAmount: `+ AED ${
        dailyWeekly === "monthly"
          ? parseFloat(data?.cdwMonthly || 0)
          : dailyWeekly === "dailyAndWeekly"
          ? parseFloat(data?.cdwDaily || 0)
          : ""
      }${dailyWeekly === "monthly" ? "/Month" : dailyWeekly === "dailyAndWeekly" ? "/Day" : ""}`,
      price: dailyWeekly === "monthly"
        ? parseFloat(data?.cdwMonthly || 0) // This is the per-month rate
        : dailyWeekly === "dailyAndWeekly"
        ? parseFloat(data?.cdwDaily || 0) // This is the per-day rate
        : 0,
    },
  ];

  // Debug logging to help troubleshoot price calculations
  console.log("Monthly Booking Prices Debug:", {
    selectedMileage,
    monthlyBookingPrices: monthlyBooking.map(item => ({
      month: item.monthText,
      price: item.price,
      is5000KM: selectedMileage === "5000 KM Mileage"
    })),
    carData: {
      nineMonthPriceOf2500Km: data?.nineMonthPriceOf2500Km,
      nineMonthPriceOf5000Km: data?.nineMonthPriceOf5000Km,
      sixMonthPriceOf2500Km: data?.sixMonthPriceOf2500Km,
      sixMonthPriceOf5000Km: data?.sixMonthPriceOf5000Km,
      threeMonthPriceOf2500Km: data?.threeMonthPriceOf2500Km,
      threeMonthPriceOf5000Km: data?.threeMonthPriceOf5000Km,
      oneMonthPriceOf2500Km: data?.oneMonthPriceOf2500Km,
      oneMonthPriceOf5000Km: data?.oneMonthPriceOf5000Km,
    }
  });

  // Debug logging for insurance
  console.log("Insurance Debug:", {
    dailyWeekly,
    daysWeeks,
    selectedInsuarance,
    insuranceBoxColor,
    insuDailyWeekly,
    insuranceBoxPrices: insuranceBox.map(item => ({
      monthText: item.monthText,
      price: item.price,
      savingAmount: item.savingAmount
    })),
    carInsuranceData: {
      cdwDaily: data?.cdwDaily,
      cdwWeekly: data?.cdwWeekly,
      cdwMonthly: data?.cdwMonthly,
    }
  });
  const monthlyMilageBox = [
    { monthText: "2500 KM Mileage", savingAmount: "No additional cost" },
    {
      monthText: "5000 KM Mileage",
      savingAmount: `Additional cost applicable`,
    },
  ];
  const dailyWeeklyAndMonthlyBox = [
    { bookFor: "Daily & Weekly", text: "dailyAndWeekly" },
    { bookFor: "Monthly", text: `monthly` },
  ];

  const daysWeeksBox = [
    { bookFor: "Days", text: "days" },
    { bookFor: "Weeks", text: `weeks` },
  ];

  const daysBooking = [
    {
      dayText: "1 Day",
      price: parseFloat(data?.discountedPriceDaily),
      count: 1,
    },
    {
      dayText: "2 Days",
      price: parseFloat(data?.discountedPriceDaily) * 2,
      count: 2,
    },
    {
      dayText: "3 Days",
      price: parseFloat(data?.discountedPriceDaily) * 3,
      count: 3,
    },
    {
      dayText: "4 Days",
      price: parseFloat(data?.discountedPriceDaily) * 4,
      count: 4,
    },
    {
      dayText: "5 Days",
      price: parseFloat(data?.discountedPriceDaily) * 5,
      count: 5,
    },
    {
      dayText: "6 Days",
      price: parseFloat(data?.discountedPriceDaily) * 6,
      count: 6,
    },
  ];
  const weeksBooking = [
    {
      dayText: "1 Week",
      price: parseFloat(data?.discountedPriceWeekly),
      count: 1,
    },
    {
      dayText: "2 Weeks",
      price: parseFloat(data?.discountedPriceWeekly) * 2,
      count: 2,
    },
    {
      dayText: "3 Weeks",
      price: parseFloat(data?.discountedPriceWeekly) * 3,
      count: 3,
    },
  ];

  const totalCarInsauAmt = selectedPrice + selectedInsuarance;

  const vatFivePercent = (totalCarInsauAmt * 5) / 100;

  const totalAmountmonthly = totalCarInsauAmt + vatFivePercent;

  const vatFivePercentDailyWeekly = selectedDaysPrice + insuDailyWeekly;

  const vatAmountDailyWeekly = (vatFivePercentDailyWeekly * 5) / 100;

  const totalAmountDailyWeekly =
    vatFivePercentDailyWeekly + vatAmountDailyWeekly;

  const handleMonthlyWhatsappClick = (
    carDetails: any,
    userphoneNumber: any,
    userfullName: any,
    userEmail: any,
    userCity: any,
    userStartDate: any,
    userCarDeliveryTime: any
  ) => {
    if (
      !userfullName ||
      !userphoneNumber ||
      !userEmail ||
      !userCity ||
      !userStartDate ||
      !userCarDeliveryTime
    ) {
      setError("Please enter all fields.");
      return;
    }
    setError("");
    const { brand, model, year, _id } = carDetails;
    // const baseUrl =
    //   "https://logicrent.ae/user/landing_page/get_car_details?verify=";
    // const url = `${baseUrl}${_id}`;
    // const whatsappMessage = `Hi, \nI’m ${userfullName} contacting you through Injazrent.ae. \nI’d like to rent the INJAZ Car. \nFull Name :- ${userfullName}. \nPhone No :- ${userphoneNumber}. \nEmail :-${userEmail}. \nCity :- ${userCity}. \nStart Date :- ${userStartDate}. \nCar Delivery Time :- ${userCarDeliveryTime}. \nCar :- ${brand} ${model} ${year}. \nBooking ${bookingMonth
    //   .replace(/\d+/, "")
    //   .trim()} :- ${bookingMonth}. \nCar Rental Charges in AED :- ${
    //   selectedPrice > 0 ? selectedPrice : 0
    // }. \nInsuarance Charges in AED :- ${
    //   selectedInsuarance > 0 ? selectedInsuarance : 0
    // }. \nMileage Charges in AED :- ${mileage}. \nVAT Charges (5%) in AED :- ${vatFivePercent}. \nTotal Amount :- ${totalAmountmonthly}. \n${url}. \nIs it available?`;
    // const whatsappLink = `https://wa.me/${
    //   phoneData?.phoneNumber ? phoneData?.phoneNumber : "+971529487046"
    // }?text=${encodeURIComponent(whatsappMessage)}`;

    try {
      setLoading(true); // Start loading

      const response: any = axios.post(
        "https://logicrent.ae/api/user/createInquiry",
        {
          carName: brand + " " + model + " " + year,
          startDate: userStartDate,
          phoneNumber: userphoneNumber,
          message: userCity,
          name: userfullName,
          email: userEmail,
          packages: bookingMonth,
          pickupTime: userCarDeliveryTime,
        }
      );
      setLoading(false); // End loading
      Swal.fire({
        icon: "success",
        title: "!! Success !!",
        text: `Your Booking has been Sent Successfully.Here is your BookingId: ${response?.data?.result?.bookingId} 
              You will get the confirmation on your email: ${response?.data?.result?.email} and your number: ${response?.data?.result?.phoneNumber}.`,
      });
      router.push("/");
    } catch (err) {
      setLoading(false); // End loading
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error submitting data. Please try again later.",
      });
    }
    // console.log(whatsappMessage);
    debugger;
  };
  const handleDailyAndWeeklyWhatsappClick = (
    carDetails: any,
    userphoneNumber: any,
    userfullName: any,
    userEmail: any,
    userCity: any,
    userStartDate: any,
    userCarDeliveryTime: any
  ) => {
    if (
      !userfullName ||
      !userphoneNumber ||
      !userEmail ||
      !userCity ||
      !userStartDate ||
      !userCarDeliveryTime
    ) {
      setError("Please enter all fields.");
      return;
    }
    setError("");
    const { brand, model, year, _id } = carDetails;
    // const baseUrl =
    //   "https://logicrent.ae/user/landing_page/get_car_details?verify=";
    // const url = `${baseUrl}${_id}`;
    // const whatsappMessage = `Hi, \nI’m ${userfullName} contacting you through Injazrent.ae. \nI’d like to rent the INJAZ Car. \nFull Name :- ${userfullName}. \nPhone No :- ${userphoneNumber}. \nEmail :-${userEmail}. \nCity :- ${userCity}. \nStart Date :- ${userStartDate}. \nCar Delivery Time :- ${userCarDeliveryTime}. \nCar :- ${brand} ${model} ${year}. \nBooking ${bookingDaysWeeks
    //   .replace(/\d+/, "")
    //   .trim()} :- ${bookingDaysWeeks}. \nCar Free KM :- ${
    //   daysWeeks === "days"
    //     ? parseFloat(data?.freeDailyKM) * selectedCount
    //     : "0" && daysWeeks === "weeks"
    //     ? parseFloat(data?.freeWeeklyKM) * selectedCount
    //     : "0"
    // }. \nCar Rental Charges in AED :- ${selectedDaysPrice}. \nCar Insurance Charges in AED :- ${insuDailyWeekly}. \nVAT Charges (5%) in AED :- ${vatAmountDailyWeekly}. \nTotal Amount :- ${totalAmountDailyWeekly}. \n${url} \nIs it available?`;
    // const whatsappLink = `https://wa.me/${
    //   phoneData?.phoneNumber ? phoneData?.phoneNumber : "+971529487046"
    // }?text=${encodeURIComponent(whatsappMessage)}`;

    try {
      setLoading(true); // Start loading

      const response: any = axios.post(
        "https://logicrent.ae/api/user/createInquiry",
        {
          carName: brand + " " + model + " " + year,
          startDate: userStartDate,
          phoneNumber: userphoneNumber,
          message: userCity,
          name: userfullName,
          email: userEmail,
          packages: bookingDaysWeeks,
          pickupTime: userCarDeliveryTime,
        }
      );
      setLoading(false); // End loading
      Swal.fire({
        icon: "success",
        title: "!! Success !!",
        text: `Your Booking has been Sent Successfully.Here is your BookingId: ${response?.data?.result?.bookingId} 
              You will get the confirmation on your email: ${response?.data?.result?.email} and your number: ${response?.data?.result?.phoneNumber}.`,
      });
      router.push("/");
    } catch (err) {
      setLoading(false); // End loading
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error submitting data. Please try again later.",
      });
    }
  };

  const textFieldData = [
    {
      value: userfullName,
      onChange: (e: any) => setUserFullName(e.target.value),
      errors: !userfullName && error !== "",
      placeholder: "Full Name",
      type: "text",
      variant: "outlined",
    },
    {
      value: userphoneNumber,
      onChange: (e: any) => setUserPhoneNumber(e.target.value),
      errors: !userphoneNumber && error !== "",
      placeholder: "No +9710000000000",
      type: "text",
      variant: "outlined",
    },
    {
      value: userEmail,
      onChange: (e: any) => setUserEmail(e.target.value),
      errors: !userEmail && error !== "",
      placeholder: "Email",
      type: "text",
      variant: "outlined",
    },
    {
      value: userCity,
      onChange: (e: any) => setUserCity(e.target.value),
      errors: !userCity && error !== "",
      placeholder: "City",
      type: "text",
      variant: "outlined",
    },
    {
      value: userStartDate,
      onChange: (e: any) => setUserStartDate(e.target.value),
      errors: !userStartDate && error !== "",
      placeholder: "Start Date",
      type: "date",
      variant: "outlined",
    },
    {
      value: userCarDeliveryTime,
      onChange: (e: any) => setUserCarDeliveryTime(e.target.value),
      errors: !userCarDeliveryTime && error !== "",
      placeholder: "Car Delivery Time",
      type: "time",
      variant: "outlined",
    },
  ];

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const fullInsuranceText =
    "What is full insurance? Full Insurance covers everything without an excess charge - even if you are deemed at fault, as long as corresponding police report is submitted.";

  return (
    <>
      <NavFooter />
      {/* Beautiful Back to Home Button - Sticky above car content */}
      <Box
        sx={{
          position: "sticky",
          top: 20,
          zIndex: 1000,
          marginBottom: 3,
          paddingLeft: 2,
          paddingTop: 2,
        }}
      >
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push("/")}
          sx={{
            backgroundColor: "#01437D",
            color: "white",
            borderRadius: "25px",
            padding: "12px 28px",
            fontSize: "16px",
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 6px 20px rgba(1, 67, 125, 0.4)",
            transition: "all 0.3s ease",
            minWidth: "160px",
            "&:hover": {
              backgroundColor: "#012a4a",
              transform: "translateY(-3px)",
              boxShadow: "0 8px 25px rgba(1, 67, 125, 0.5)",
            },
          }}
        >
          Back to Home
        </Button>
      </Box>
      <section className="createdCars">
        <Container maxWidth="xl">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
              <div className="createdCarsTop">
                <div className="imageHead">
                  <BookingTypo variant="h6">
                    {data?.brand} {data?.model} {data?.year}
                  </BookingTypo>
                </div>
                <div className="createdImg">
                  <CardMedia
                    component="img"
                    height={350}
                    sx={{ objectFit: "contain" }}
                    image={data?.externalImage[0]}
                    alt="carImage"
                  />
                </div>
              </div>
              <div className="createdCarsTop" style={{ borderRadius: "10px" }}>
                <div
                  style={{
                    marginTop: "1rem",
                    // display: "flex",
                    // justifyContent: "space-between",
                    // alignItems: "center",
                  }}
                  className="imageHead"
                >
                  <BookingTypo variant="h6">
                    Car Details{" "}
                    <IconButton onClick={toggleExpand}>
                      {expanded ? (
                        <ExpandLessIcon sx={{ color: "white" }} />
                      ) : (
                        <ExpandMoreIcon sx={{ color: "white" }} />
                      )}
                    </IconButton>
                  </BookingTypo>
                </div>
                {/* Collapsible content */}
                <Collapse in={expanded}>
                  <CarDetailsBoxCss>
                    <Grid container spacing={1}>
                      {carDetailsBox.map((item) => (
                        <Grid key={item.title} item xs={6} sm={2}>
                          <CarDetailscontentBox>
                            <Image
                              src={item.image}
                              alt={item.title}
                              width={25}
                              height={25}
                            />
                            <TitleTypo variant="subtitle1">
                              {item.title}
                            </TitleTypo>
                            <TitleTypo2 variant="subtitle1">
                              {item.text}
                            </TitleTypo2>
                          </CarDetailscontentBox>
                        </Grid>
                      ))}
                    </Grid>
                  </CarDetailsBoxCss>
                </Collapse>
                <section className="tabSecMem">
                  <AppBarMainBox>
                    <AppBarMain position="static">
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        TabIndicatorProps={{
                          style: {
                            backgroundColor: "white", // Custom color
                          },
                        }}
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                      >
                        <AppBarTabs label="Pricing" {...a11yProps(0)} />
                        <AppBarTabs label="Specification and Features" {...a11yProps(1)} />
                        <AppBarTabs
                          label="Rental Terms"
                          {...a11yProps(2)}
                        />
                      </Tabs>
                    </AppBarMain>
                    <Box>
                      <TabPanel value={value} index={0} dir={theme.direction}>
                        <Box sx={{ padding: "20px" }}>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: "1.5rem",
                              marginBottom: "20px",
                              color: "#01437D",
                            }}
                            variant="h5"
                          >
                            PRICING
                          </Typography>
                          
                          <Box sx={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                            {/* Daily Pricing */}
                            <Box
                              sx={{
                                flex: "1",
                                minWidth: "200px",
                                padding: "20px",
                                borderRadius: "10px",
                                border: "2px solid #e0e0e0",
                                backgroundColor: "#ffffff",
                                textAlign: "center",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  border: "2px solid #01437D",
                                  backgroundColor: "#f8f9fa",
                                  transform: "translateY(-2px)",
                                  boxShadow: "0 4px 12px rgba(1, 67, 125, 0.15)",
                                },
                              }}
                            >
                              <Typography
                                sx={{
                                  textDecoration: "line-through",
                                  color: "#666",
                                  fontSize: "1rem",
                                  marginBottom: "5px",
                                }}
                              >
                                AED {data?.actualPriceDaily || "341"}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "1.8rem",
                                  fontWeight: 600,
                                  color: "#ff6b35",
                                  marginBottom: "5px",
                                }}
                              >
                                AED {data?.discountedPriceDaily ? 
                                  (parseInt(data.discountedPriceDaily) > 10000 ? 
                                    Math.round(parseInt(data.discountedPriceDaily) / 1000) : 
                                    data.discountedPriceDaily) : 
                                  "199"}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "0.9rem",
                                  color: "#666",
                                }}
                              >
                                / day
                              </Typography>
                            </Box>

                            {/* Weekly Pricing */}
                            <Box
                              sx={{
                                flex: "1",
                                minWidth: "200px",
                                padding: "20px",
                                borderRadius: "10px",
                                border: "2px solid #e0e0e0",
                                backgroundColor: "#ffffff",
                                textAlign: "center",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  border: "2px solid #01437D",
                                  backgroundColor: "#f8f9fa",
                                  transform: "translateY(-2px)",
                                  boxShadow: "0 4px 12px rgba(1, 67, 125, 0.15)",
                                },
                              }}
                            >
                              <Typography
                                sx={{
                                  textDecoration: "line-through",
                                  color: "#666",
                                  fontSize: "1rem",
                                  marginBottom: "5px",
                                }}
                              >
                                AED {data?.actualPriceWeekly || "2100"}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "1.8rem",
                                  fontWeight: 600,
                                  color: "#ff6b35",
                                  marginBottom: "5px",
                                }}
                              >
                                AED {data?.discountedPriceWeekly ? 
                                  (parseInt(data.discountedPriceWeekly) > 10000 ? 
                                    Math.round(parseInt(data.discountedPriceWeekly) / 1000) : 
                                    data.discountedPriceWeekly) : 
                                  "1250"}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "0.9rem",
                                  color: "#666",
                                }}
                              >
                                / week
                              </Typography>
                            </Box>

                            {/* Monthly Pricing */}
                            <Box
                              sx={{
                                flex: "1",
                                minWidth: "200px",
                                padding: "20px",
                                borderRadius: "10px",
                                border: "2px solid #e0e0e0",
                                backgroundColor: "#ffffff",
                                textAlign: "center",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  border: "2px solid #01437D",
                                  backgroundColor: "#f8f9fa",
                                  transform: "translateY(-2px)",
                                  boxShadow: "0 4px 12px rgba(1, 67, 125, 0.15)",
                                },
                              }}
                            >
                              <Typography
                                sx={{
                                  textDecoration: "line-through",
                                  color: "#666",
                                  fontSize: "1rem",
                                  marginBottom: "5px",
                                }}
                              >
                                AED {data?.actualPriceMonthly || "5000"}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "1.8rem",
                                  fontWeight: 600,
                                  color: "#ff6b35",
                                  marginBottom: "5px",
                                }}
                              >
                                AED {data?.discountedPriceMonthly ? 
                                  (parseInt(data.discountedPriceMonthly) > 10000 ? 
                                    Math.round(parseInt(data.discountedPriceMonthly) / 1000) : 
                                    data.discountedPriceMonthly) : 
                                  "3850"}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "0.9rem",
                                  color: "#666",
                                }}
                              >
                                / month
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </TabPanel>
                      <TabPanel value={value} index={1} dir={theme.direction}>
                        <Box sx={{ padding: "20px" }}>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: "1.5rem",
                              marginBottom: "20px",
                              color: "#01437D",
                            }}
                            variant="h5"
                          >
                            SPECIFICATION AND FEATURES
                          </Typography>
                          
                          {/* Specifications Section */}
                          <Box sx={{ marginBottom: "30px" }}>
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: "1.2rem",
                                marginBottom: "15px",
                                color: "#333",
                              }}
                              variant="h6"
                            >
                              Specifications
                            </Typography>
                            
                            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                <Typography sx={{ fontWeight: 500, color: "#666" }}>Brand:</Typography>
                                <Typography sx={{ fontWeight: 600, color: "#333" }}>{data?.brand || "N/A"}</Typography>
                              </Box>
                              
                              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                <Typography sx={{ fontWeight: 500, color: "#666" }}>Model:</Typography>
                                <Typography sx={{ fontWeight: 600, color: "#333" }}>{data?.model || "N/A"}</Typography>
                              </Box>
                              
                              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                <Typography sx={{ fontWeight: 500, color: "#666" }}>Category:</Typography>
                                <Typography sx={{ fontWeight: 600, color: "#333" }}>{data?.category || "N/A"}</Typography>
                              </Box>
                              
                              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                <Typography sx={{ fontWeight: 500, color: "#666" }}>Vehicle Type:</Typography>
                                <Typography sx={{ fontWeight: 600, color: "#333" }}>{data?.vehicleType || "N/A"}</Typography>
                              </Box>
                              
                              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                <Typography sx={{ fontWeight: 500, color: "#666" }}>Year:</Typography>
                                <Typography sx={{ fontWeight: 600, color: "#333" }}>{data?.year || "N/A"}</Typography>
                              </Box>
                              
                              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                <Typography sx={{ fontWeight: 500, color: "#666" }}>Engine Size:</Typography>
                                <Typography sx={{ fontWeight: 600, color: "#333" }}>{data?.engineCapacity || "N/A"}</Typography>
                              </Box>
                              
                              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                <Typography sx={{ fontWeight: 500, color: "#666" }}>Transmission:</Typography>
                                <Typography sx={{ fontWeight: 600, color: "#333" }}>{data?.transmission || "N/A"}</Typography>
                              </Box>
                              
                              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                <Typography sx={{ fontWeight: 500, color: "#666" }}>Fuel Type:</Typography>
                                <Typography sx={{ fontWeight: 600, color: "#333" }}>{data?.fuel || "N/A"}</Typography>
                              </Box>
                              
                              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                <Typography sx={{ fontWeight: 500, color: "#666" }}>Seats No:</Typography>
                                <Typography sx={{ fontWeight: 600, color: "#333" }}>{data?.seater || "N/A"}</Typography>
                              </Box>
                              
                              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                <Typography sx={{ fontWeight: 500, color: "#666" }}>Max Power:</Typography>
                                <Typography sx={{ fontWeight: 600, color: "#333" }}>{data?.maxPower || "N/A"}</Typography>
                              </Box>
                              
                              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                <Typography sx={{ fontWeight: 500, color: "#666" }}>Torque:</Typography>
                                <Typography sx={{ fontWeight: 600, color: "#333" }}>{data?.torque || "N/A"}</Typography>
                              </Box>
                              
                              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                <Typography sx={{ fontWeight: 500, color: "#666" }}>Luggage Boot Capacity:</Typography>
                                <Typography sx={{ fontWeight: 600, color: "#333" }}>{data?.laggageBootCapacity || "N/A"}</Typography>
                              </Box>
                            </Box>
                          </Box>
                          
                          {/* Features Section */}
                          <Box>
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: "1.2rem",
                                marginBottom: "15px",
                                color: "#333",
                              }}
                              variant="h6"
                            >
                              Features
                            </Typography>
                            
                            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                              {data?.keyFeatures && Array.isArray(data.keyFeatures) && data.keyFeatures.length > 0 ? (
                                data.keyFeatures.filter(feature => feature && feature.trim() !== "").map((feature: string, index: number) => (
                                  <Box key={index} sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                    <Typography sx={{ fontWeight: 500, color: "#666" }}>{feature}:</Typography>
                                    <Typography sx={{ fontWeight: 600, color: "#333" }}>✓</Typography>
                                  </Box>
                                ))
                              ) : (
                                <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                  <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                    <Typography sx={{ fontWeight: 500, color: "#666" }}>Bluetooth:</Typography>
                                    <Typography sx={{ fontWeight: 600, color: "#333" }}>✓</Typography>
                                  </Box>
                                  <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                    <Typography sx={{ fontWeight: 500, color: "#666" }}>Aux:</Typography>
                                    <Typography sx={{ fontWeight: 600, color: "#333" }}>✓</Typography>
                                  </Box>
                                  <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                    <Typography sx={{ fontWeight: 500, color: "#666" }}>Air Bags:</Typography>
                                    <Typography sx={{ fontWeight: 600, color: "#333" }}>✓</Typography>
                                  </Box>
                                </Box>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </TabPanel>
                      <TabPanel value={value} index={2} dir={theme.direction}>
                        <Box sx={{ padding: "20px" }}>
                          {/* Driver Eligibility & Insurance Component */}
                          <DriverEligibility
                            carCategory={data?.category}
                            securityDeposit={data?.securityDeposit}
                            noSecurityDeposit={data?.noSecurityDeposit}
                            cdwDaily={data?.cdwDaily}
                            cdwWeekly={data?.cdwWeekly}
                            cdwMonthly={data?.cdwMonthly}
                          />

                          {/* Additional Rental Terms */}
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: "1.5rem",
                              marginBottom: "20px",
                              color: "#01437D",
                            }}
                            variant="h5"
                          >
                            ADDITIONAL TERMS
                          </Typography>

                          <Box sx={{ marginBottom: "20px" }}>
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: "1.1rem",
                                marginBottom: "10px",
                                color: "#333",
                              }}
                            >
                              Free Mileage
                            </Typography>
                            <Typography sx={{ fontSize: "1rem", color: "#666", marginBottom: "5px" }}>
                              Daily: {data?.freeDailyKM || "200"} KM
                            </Typography>
                            <Typography sx={{ fontSize: "1rem", color: "#666", marginBottom: "5px" }}>
                              Weekly: {data?.freeWeeklyKM || "1400"} KM
                            </Typography>
                            <Typography sx={{ fontSize: "1rem", color: "#666", marginBottom: "15px" }}>
                              Monthly: {data?.freeMonthlyKM || "6000"} KM
                            </Typography>
                          </Box>

                          <Box sx={{ marginBottom: "20px" }}>
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: "1.1rem",
                                marginBottom: "10px",
                                color: "#333",
                              }}
                            >
                              Additional Charges
                            </Typography>
                            <Typography sx={{ fontSize: "1rem", color: "#666", marginBottom: "5px" }}>
                              Extra Mileage: AED {data?.additionalMileageCharge || "1"} per KM
                            </Typography>
                            <Typography sx={{ fontSize: "1rem", color: "#666", marginBottom: "5px" }}>
                              Salik Toll: AED {data?.salikTollCharge || "5"} per toll
                            </Typography>
                            <Typography sx={{ fontSize: "1rem", color: "#666", marginBottom: "5px" }}>
                              Delivery Charge: AED {data?.deliveryChargeDaily || "50"} per day
                            </Typography>
                            <Typography sx={{ fontSize: "1rem", color: "#666", marginBottom: "15px" }}>
                              Airport Pickup: AED {data?.airportPickupCharge || "100"}
                            </Typography>
                          </Box>
                        </Box>
                      </TabPanel>
                    </Box>
                  </AppBarMainBox>
                </section>
              </div>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <MainBoxBooking>
                <BookingTypo1 variant="h6">Booking Length</BookingTypo1>
                <Grid container spacing={1}>
                  {dailyWeeklyAndMonthlyBox.map((item, index) => (
                    <Grid item xs={6} sm={6} key={index}>
                      <DailyWeeklyBox1
                        onClick={() => handleDailyWeekly(item.text)} // update total on box click
                        sx={{
                          backgroundColor:
                            dailyWeekly === item.text ? "orange" : "white",
                        }}
                      >
                        <DailyWeeklyTypo1 variant="subtitle1">
                          {item.bookFor}
                        </DailyWeeklyTypo1>
                      </DailyWeeklyBox1>
                    </Grid>
                  ))}
                  {dailyWeekly === "dailyAndWeekly" && (
                    <>
                      {daysWeeksBox.map((item, index) => (
                        <Grid item xs={6} sm={6} key={index}>
                          <DailyWeeklyBox1
                            onClick={() => handleDaysWeeks(item.text)} // update state of daysWeeks
                            sx={{
                              marginTop: "0.5rem",
                              backgroundColor:
                                daysWeeks === item.text ? "orange" : "white",
                            }}
                          >
                            <DailyWeeklyTypo1 variant="subtitle1">
                              {item.bookFor}
                            </DailyWeeklyTypo1>
                          </DailyWeeklyBox1>
                        </Grid>
                      ))}
                    </>
                  )}
                  {daysWeeks === "days" && (
                    <>
                      {!insuranceBoxColor && (
                        <Grid item xs={12}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#ff6b35",
                              fontWeight: 600,
                              textAlign: "center",
                              marginBottom: "10px",
                              backgroundColor: "#fff3e0",
                              padding: "8px",
                              borderRadius: "4px",
                              border: "1px solid #ff6b35",
                            }}
                          >
                            ⚠️ Please select an insurance option above before choosing the number of days
                          </Typography>
                        </Grid>
                      )}
                      {daysBooking.map((item, index) => (
                        <Grid item xs={4} sm={4} key={index}>
                          <DailyWeeklyBox1
                            onClick={() =>
                              handleSelectedDaysBoxClick(
                                item.price,
                                item.dayText,
                                item.count
                              )
                            }
                            sx={{
                              backgroundColor:
                                selectedDaysPrice === item.price
                                  ? "orange"
                                  : "white",
                              opacity: !insuranceBoxColor ? 0.5 : 1,
                              cursor: !insuranceBoxColor ? "not-allowed" : "pointer",
                              pointerEvents: !insuranceBoxColor ? "none" : "auto",
                            }}
                          >
                            <MonthlyTypo1 variant="subtitle1">
                              {item.dayText}
                            </MonthlyTypo1>
                          </DailyWeeklyBox1>
                        </Grid>
                      ))}
                    </>
                  )}
                  {daysWeeks === "weeks" && (
                    <>
                      {!insuranceBoxColor && (
                        <Grid item xs={12}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#ff6b35",
                              fontWeight: 600,
                              textAlign: "center",
                              marginBottom: "10px",
                              backgroundColor: "#fff3e0",
                              padding: "8px",
                              borderRadius: "4px",
                              border: "1px solid #ff6b35",
                            }}
                          >
                            ⚠️ Please select an insurance option above before choosing the number of weeks
                          </Typography>
                        </Grid>
                      )}
                      {weeksBooking.map((item, index) => (
                        <Grid item xs={4} sm={4} key={index}>
                          <DailyWeeklyBox1
                            onClick={() =>
                              handleSelectedDaysBoxClick(
                                item.price,
                                item.dayText,
                                item.count
                              )
                            }
                            sx={{
                              backgroundColor:
                                selectedDaysPrice === item.price
                                  ? "orange"
                                  : "white",
                              opacity: !insuranceBoxColor ? 0.5 : 1,
                              cursor: !insuranceBoxColor ? "not-allowed" : "pointer",
                              pointerEvents: !insuranceBoxColor ? "none" : "auto",
                            }}
                          >
                            <MonthlyTypo1 variant="subtitle1">
                              {item.dayText}
                            </MonthlyTypo1>
                          </DailyWeeklyBox1>
                        </Grid>
                      ))}
                    </>
                  )}
                  {dailyWeekly === "monthly" && (
                    <>
                      {/* <InsuranceTypo1 variant="h6">
                      Monthly mileage allowance
                    </InsuranceTypo1> */}
                      {/* <Grid container spacing={1}> */}
                      {monthlyMilageBox.map((item, index) => (
                        <Grid item xs={6} sm={6} key={index}>
                          <DailyWeeklyBox1
                            onClick={() =>
                              handleMileageBoxClick(item.monthText)
                            }
                            sx={{
                              backgroundColor:
                                selectedMileage === item.monthText
                                  ? "orange"
                                  : "white",
                            }}
                          >
                            <MonthlyTypo1 variant="subtitle1">
                              {item.monthText}
                            </MonthlyTypo1>
                            <MonthlyTypo2 variant="subtitle2">
                              {item.savingAmount}
                            </MonthlyTypo2>
                          </DailyWeeklyBox1>
                        </Grid>
                      ))}
                      {/* </Grid> */}
                    </>
                  )}
                  {dailyWeekly === "monthly" && (
                    <>
                      {!selectedMileage && (
                        <Grid item xs={12}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#ff6b35",
                              fontWeight: 600,
                              textAlign: "center",
                              marginBottom: "10px",
                              backgroundColor: "#fff3e0",
                              padding: "8px",
                              borderRadius: "4px",
                              border: "1px solid #ff6b35",
                            }}
                          >
                            ⚠️ Please select a mileage option above before choosing a monthly duration
                          </Typography>
                        </Grid>
                      )}
                      {monthlyBooking.map((item, index) => (
                        <Grid item xs={6} sm={6} key={index}>
                          <DailyWeeklyBox1
                            onClick={() =>
                              handleBoxClick(
                                // selectedMileage==="5000 KM"?item.price5000: item.price2500,
                                item.price,
                                item.count,
                                item.monthText
                              )
                            }
                            sx={{
                              backgroundColor:
                                monthlyBoxColor === item.monthText
                                  ? "orange"
                                  : "white",
                              opacity: !selectedMileage ? 0.5 : 1,
                              cursor: !selectedMileage ? "not-allowed" : "pointer",
                              pointerEvents: !selectedMileage ? "none" : "auto",
                            }}
                          >
                            <MonthlyTypo1 variant="subtitle1">
                              {item.monthText}
                            </MonthlyTypo1>
                            <MonthlyTypo2 variant="subtitle2">
                              Save AED {item.savingAmount}
                            </MonthlyTypo2>
                          </DailyWeeklyBox1>
                        </Grid>
                      ))}
                    </>
                  )}
                </Grid>
                <>
                  <InsuranceTypo1 variant="h6">Insurance</InsuranceTypo1>
                  {dailyWeekly === "dailyAndWeekly" && !insuranceBoxColor && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#ff6b35",
                        fontWeight: 600,
                        textAlign: "center",
                        marginBottom: "10px",
                        backgroundColor: "#fff3e0",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ff6b35",
                      }}
                    >
                      ⚠️ Please select an insurance option (Standard Cover is free, Full Cover has additional cost)
                    </Typography>
                  )}
                  <Grid container spacing={1}>
                    {insuranceBox.map((item, index) => (
                      <Grid item xs={6} sm={6} key={index}>
                        <DailyWeeklyBox1
                          onClick={() =>
                            handleInsauranceBoxClick(item.price, item.monthText)
                          } // update total on box click
                          sx={{
                            backgroundColor:
                              insuranceBoxColor === item.monthText
                                ? "orange"
                                : "white",
                          }}
                        >
                          <>
                            <Tooltip
                              title={
                                item.monthText === "Full Cover"
                                  ? fullInsuranceText
                                  : ""
                              }
                            >
                              <MonthlyTypo1 variant="subtitle1">
                                {item.monthText}
                              </MonthlyTypo1>
                            </Tooltip>
                            <MonthlyTypo2 variant="subtitle2">
                              {item.savingAmount}
                            </MonthlyTypo2>
                          </>
                        </DailyWeeklyBox1>
                      </Grid>
                    ))}
                  </Grid>
                </>
                {/* {dailyWeekly === "monthly" && (
                  <>
                    <InsuranceTypo1 variant="h6">
                      Monthly mileage allowance
                    </InsuranceTypo1>
                    <Grid container spacing={1}>
                      {monthlyMilageBox.map((item, index) => (
                        <Grid item xs={6} sm={6} key={index}>
                          <DailyWeeklyBox1
                            onClick={() =>
                              handleMileageBoxClick(item.monthText)
                            }
                            sx={{
                              backgroundColor:
                                selectedMileage === item.monthText
                                  ? "orange"
                                  : "white",
                            }}
                          >
                            <MonthlyTypo1 variant="subtitle1">
                              {item.monthText}
                            </MonthlyTypo1>
                            <MonthlyTypo2 variant="subtitle2">
                              {item.savingAmount}
                            </MonthlyTypo2>
                          </DailyWeeklyBox1>
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )} */}
                {dailyWeekly === "monthly" && (
                  <>
                    <PriceBrakeTypo1 variant="h6">
                      Price Break Down
                    </PriceBrakeTypo1>
                    <PriceBrakeBox1>
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Booking {bookingMonth.replace(/\d+/, "").trim()}
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          {bookingMonth}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Monthly Fee in AED
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          {selectedPrice > 0 ? `AED ${selectedPrice}` : "AED 0"}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Insuarance Charges in AED
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          {selectedInsuarance > 0 ? `AED ${selectedInsuarance}` : "AED 0"}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                      {/* <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Mileage Charges in AED
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          {mileage}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2> */}
                      {/* <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Discount in AED
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          -60
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2> */}
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          VAT Charges (5%) in AED
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          AED {vatFivePercent}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                    </PriceBrakeBox1>
                  </>
                )}
                {dailyWeekly === "dailyAndWeekly" && (
                  <>
                    <CarChargeTypo1 variant="h6">
                      Car Charges & Other Details
                    </CarChargeTypo1>
                    <CarChargeBox1>
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Booking {bookingDaysWeeks.replace(/\d+/, "").trim()}
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          {bookingDaysWeeks}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Car Free KM
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          {daysWeeks === "days"
                            ? parseFloat(data?.freeDailyKM) * selectedCount
                            : daysWeeks === "weeks"
                            ? parseFloat(data?.freeWeeklyKM) * selectedCount
                            : 0}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Car Rental Charges in AED
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          AED {selectedDaysPrice}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Car Insurance Charges in AED
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          AED {insuDailyWeekly}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          VAT Charges (5%) in AED
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          AED {vatAmountDailyWeekly}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                    </CarChargeBox1>
                  </>
                )}
                {dailyWeekly === "dailyAndWeekly" && (
                  <PriceBrakeBox2>
                    <PriceBrakeTypo2 variant="subtitle2">
                      Total Amount
                    </PriceBrakeTypo2>
                    <PriceBrakeTypo2 variant="subtitle2">
                      AED {totalAmountDailyWeekly}
                    </PriceBrakeTypo2>
                  </PriceBrakeBox2>
                )}
                {dailyWeekly === "monthly" && (
                  <PriceBrakeBox2>
                    <PriceBrakeTypo2 variant="subtitle2">
                      Total Amount
                    </PriceBrakeTypo2>
                    <PriceBrakeTypo2 variant="subtitle2">
                      AED {totalAmountmonthly}
                    </PriceBrakeTypo2>
                  </PriceBrakeBox2>
                )}
                <Box sx={{ marginTop: "1rem" }}>
                  <Grid container spacing={1}>
                    {textFieldData.map((item, index) => (
                      <Grid item xs={6} sm={6} key={index}>
                        <TextFieldComp
                          placeholder={item.placeholder}
                          value={item.value}
                          onChange={item.onChange}
                          errors={item.errors}
                          type={item.type}
                          variant={item.variant}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                {error && (
                  <Typography
                    color="error"
                    variant="body2"
                    sx={{ marginTop: "0.5rem", textAlign: "center" }}
                  >
                    {error}
                  </Typography>
                )}
                <BookButtonBox1>
                  {dailyWeekly === "dailyAndWeekly" && (
                    <BookButtonMain
                      size="large"
                      variant="contained"
                      disabled={!insuranceBoxColor || !selectedDaysPrice}
                      onClick={() =>
                        handleDailyAndWeeklyWhatsappClick(
                          data,
                          userphoneNumber,
                          userfullName,
                          userEmail,
                          userCity,
                          userStartDate,
                          userCarDeliveryTime
                        )
                      }
                    >
                      Book Now
                    </BookButtonMain>
                  )}
                  {dailyWeekly === "monthly" && (
                    <BookButtonMain
                      size="large"
                      variant="contained"
                      disabled={!selectedMileage || !selectedPrice}
                      onClick={() =>
                        handleMonthlyWhatsappClick(
                          data,
                          userphoneNumber,
                          userfullName,
                          userEmail,
                          userCity,
                          userStartDate,
                          userCarDeliveryTime
                        )
                      }
                    >
                      Book Now
                    </BookButtonMain>
                  )}
                </BookButtonBox1>
              </MainBoxBooking>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
};

export default CreatedCar;
