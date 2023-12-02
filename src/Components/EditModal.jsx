import React, { useState } from "react";
import { Button, Modal } from "antd";
const EditModal = (props) => {
  const editRow = () => {
    console.log("in edit row");
    const key = props.data.key;
    const idx = props.fullData.findIndex((item) => item.key === key);
    if (idx !== -1) {
      const updatedObject = {
        ...props.fullData[idx],
        key: props.data.key,
        name: name,
        email: email,
        role: role,
      };

      const updatedData = [...props.fullData];
      updatedData[idx] = updatedObject;

      props.setUserData(updatedData);
    }
  };

  const handleOk = () => {
    props.setIsopen(false);
    editRow();
  };
  const handleCancel = () => {
    props.setIsopen(false);
  };

  const [name, setName] = useState(props.data.name);
  const [email, setEmail] = useState(props.data.email);
  const [role, setRole] = useState(props.data.role);

  return (
    <>
      <Modal
        width={800}
        title="Edit this record"
        open={props.isopen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <label htmlFor="">Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="">Email: </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="">Role: </label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </Modal>
    </>
  );
};
export default EditModal;
