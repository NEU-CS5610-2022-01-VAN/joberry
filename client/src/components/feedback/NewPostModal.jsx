import React from "react";
import { Modal, Button, Form, Input } from "antd";
import { observer } from "mobx-react";
import { useStoreAndAuth } from "@/utils";

const NewPostModal = observer((props) => {
  const { postStore } = useStoreAndAuth();

  const { visible, cancelPop, content } = props;
  const [form] = Form.useForm();

  const onCancel = () => {
    form.resetFields();
    cancelPop();
  };
  const onFinish = () => {
    form.validateFields().then((res) => {
      postStore.createNewPost({ ...res, tagIds: [] }).then(() => {
        onCancel();
      });
    });
  };

  return (
    <Modal
      title="Create New Post"
      visible={visible}
      footer={null}
      destroyOnClose
      onCancel={onCancel}
    >
      <Form name="nest-messages" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter title of your post!",
            },
          ]}
        >
          <Input placeholder="Enter your title here" />
        </Form.Item>
        <Form.Item
          name="body"
          initialValue={content}
          rules={[
            {
              required: true,
              message: "Please enter content of your post!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Enter your content here"
            autoSize={{ minRows: 3.5, maxRows: 3.5 }}
          />
        </Form.Item>
        <Form.Item></Form.Item>
        <Form.Item>
          <Button
            className="mg-r-16"
            type="primary"
            htmlType="submit"
            shape="round"
          >
            Submit
          </Button>
          <Button
            type="primary"
            ghost
            htmlType="reset"
            onClick={onCancel}
            shape="round"
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default NewPostModal;
