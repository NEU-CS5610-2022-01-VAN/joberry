import { message } from "antd";

export const $success = (msg) => {
  message.destroy(msg);
  message.success({
    content: msg,
    key: msg,
    style: {
      marginTop: "10vh",
    },
  });
};

export const $info = (msg) => {
  message.destroy(msg);
  message.info({
    content: msg,
    key: msg,
    style: {
      marginTop: "10vh",
    },
  });
};

export const $warning = (msg) => {
  message.destroy(msg);
  message.warning({
    content: msg,
    key: msg,
    style: {
      marginTop: "10vh",
    },
  });
};

export const $error = (msg) => {
  message.destroy(msg);
  message.error({
    content: msg,
    key: msg,
    style: {
      marginTop: "10vh",
    },
  });
};
