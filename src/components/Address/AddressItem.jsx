import React from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { AddressService } from "../../services/address.service";
import Swal from "sweetalert2";

const AddressItem = (props) => {
  const navigate = useNavigate();

  const deleteClickHandle = (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn xóa địa chỉ này không ?",
      showDenyButton: true,
      confirmButtonText: "Có",
      denyButtonText: "Không",
      customClass: {
        actions: "my-actions",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        AddressService.deleteAddress(id).then(() => {
          Swal.fire("Xóa thành công", "Thông báo", "success");
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else if (result.isDenied) {
        Swal.fire("Hủy xóa địa chỉ", "Thông báo", "info");
      }
    });
  };
  const editClickHandle = (id) => {
    navigate("/account/address/edit/" + id);
  };
  return (
    <>
      <div className="h-fit w-full pt-3 pb-3 border-top border-gray-500 flex hover:drop-shadow-md bg-white transition-all duration-100 ">
        <div className="row">
          <div className="col-lg-9">
            <div>
              <div className="font-weight-bold m-2">
                {props.fullname} - {props.phone_number}
              </div>
            </div>
            <div>
              <div className="m-2">
                {props.address_string}, {props.ward_name}, {props.district_name}
                , {props.province_name}
              </div>
            </div>
          </div>
          <div className="col-lg-3 d-flex justify-content-center items-center ">
            <div className="row">
              <div
                className="d-flex justify-content-center align-items-center p-3 "
                onClick={() => {
                  editClickHandle(props.id);
                }}
                style={{ fontSize: "20px" }}
              >
                <AiFillEdit />
              </div>
              <div
                className="d-flex justify-content-center align-items-center p-3 "
                onClick={() => {
                  deleteClickHandle(props.id);
                }}
                style={{ fontSize: "20px" }}
              >
                <MdDelete />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressItem;
