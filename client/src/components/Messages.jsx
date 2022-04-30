import { message } from "antd";

export const $success = (msg) => {
  message.success({
    content: msg,
    style: {
      marginTop: "10vh",
    },
  });
};

// info对应删除成功message
export const $info = (msg) => {
  message.info({
    content: msg,
    style: {
      marginTop: "10vh",
    },
  });
};

// warning对应不可xx
export const $warning = (msg) => {
  message.warning({
    content: msg,
    style: {
      marginTop: "10vh",
    },
  });
};

export const $error = (msg) => {
  message.error({
    content: msg,
    style: {
      marginTop: "10vh",
    },
  });
};
