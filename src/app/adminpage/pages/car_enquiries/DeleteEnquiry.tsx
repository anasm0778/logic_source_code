import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import axios from "axios";
import { serverUrl } from "@/utils/helper";

const DeleteEnquiry: React.FC<{ details: any }> = (props) => {
  const { details } = props;
  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect(() => {
    if (deleting) {
      axios
        .delete(serverUrl + `/user/deleteInquiry/${details._id}`)
        .then((res) => {
          console.log(res, "delete enquiry successfully");
          debugger
          Swal.fire("Deleted!", "Enquiry has been deleted.", "success");
          setDeleting(false);
        })
        .catch((err) => {
          console.log("Error deleting row:", err);
          setDeleting(false);
          debugger
        });
    }
  }, [deleting, details._id]);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result: any) => {
      if (result.isConfirmed) {
        setDeleting(true);
      }
    });
  };

  return (
    <>
      <DeleteIcon
        color="error"
        onClick={handleDelete}
      />
    </>
  );
};

export default DeleteEnquiry;
