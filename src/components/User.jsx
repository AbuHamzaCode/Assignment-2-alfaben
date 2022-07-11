import React, { Fragment, useState } from "react";
import {
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HeartFilled,
  HeartOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import { Button, Card, Modal, Form, Input } from "antd";
import "antd/dist/antd.min.css";

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const User = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const liked = () => {
    setIsLiked(!isLiked);
  };

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        props.updateUser(props.user.id, values);
        setIsModalVisible(!isModalVisible);
      })
      .catch((errorInfo) => {
        console.log("Please fill the input!");
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Fragment>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          initialValues={{
            name: props.user.name,
            email: props.user.email,
            phone: props.user.phone,
            website: props.user.website,
          }}
          {...layout}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "This field is required" },
              { type: "email", message: "Invalid email" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Website"
            name="website"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Card
        headStyle={{ background: "#fafafa" }}
        style={{
          maxWidth: 450,
          maxHeight: 450,
          margin: 20,
          boxSizing: "border-box",
          display: "block",
        }}
        cover={
          <img
            alt="some"
            src={`https://avatars.dicebear.com/v2/avataaars/${props.user.username}.svg?options[mood][]=happy`}
            style={{
              maxWidth: 450,
              maxHeight: 200,
              backgroundColor: "#F5F5F5",
            }}
          />
        }
        actions={[
          <Button
            onClick={liked}
            style={{ outline: "none", border: "none" }}
            icon={
              isLiked ? (
                <HeartFilled style={{ color: "#FF0000" }} />
              ) : (
                <HeartOutlined style={{ color: "#FF0000" }} />
              )
            }
          ></Button>,
          <Button
            onClick={showModal}
            style={{ outline: "none", border: "none" }}
            icon={<EditOutlined />}
          ></Button>,
          <Button
            onClick={() => {
              props.deleteUser(props.user.id);
            }}
            style={{ outline: "none", border: "none" }}
            icon={<DeleteFilled />}
          ></Button>,
        ]}
      >
        <h2>{props.user.name}</h2>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <MailOutlined style={{ fontSize: "18px" }} />
          <p style={{ marginLeft: 10 }}>{props.user.email}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <PhoneOutlined style={{ fontSize: "18px" }} />
          <p style={{ marginLeft: 10 }}>{props.user.phone}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <GlobalOutlined style={{ fontSize: "18px" }} />
          <p style={{ marginLeft: 10 }}>http://{props.user.website}</p>
        </div>
      </Card>
    </Fragment>
  );
};

export default User;
