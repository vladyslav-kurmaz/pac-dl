// import { TValidatinForm } from "../types/types";

const validationForm = (value: string, name: string) => {
  switch (name) {
    case "name":
      if (value.length <= 2 && value.length > 0) {
        return {
          errorStatus: true,
          message: "Введіть більше 2 символів",
          class: "error",
        };
      } else {
        return {
          errorStatus: false,
          message: "",
          class: "",
        };
      }
    case "email":
      // eslint-disable-next-line
      const validValueEmail = value.match(/^[\w\.-]+@[\w\.-]+\.\w+$/);
      const onlyLatiOrNumnEmail = value.match(/^[a-zA-Z0-9@.\-_]+$/);

      if (value.length === 0) {
        return {
          errorStatus: false,
          message: "",
          class: "done",
        };
      } else if (onlyLatiOrNumnEmail === null) {
        return {
          errorStatus: true,
          message: "Пошта латинецею і цифрами",
          class: "error",
        };
      } else if (validValueEmail === null) {
        return {
          errorStatus: true,
          message: "Формат пошти mail@mail.com",
          class: "error",
        };
      } else {
        return {
          errorStatus: false,
          message: "",
          class: "done",
        };
      }
    case "message":
      // eslint-disable-next-line
      // const validValueEmail = value.match(/^[\w\.-]+@[\w\.-]+\.\w+$/);
      // const onlyLatiOrNumnEmail = value.match(/^[a-zA-Z0-9@.\-_]+$/);

      if (value.length < 10 && value.length > 0) {
        return {
          errorStatus: true,
          message: "Введіть більше 10 символів",
          class: "error",
        };
      } else {
        return {
          errorStatus: false,
          message: "",
          class: "",
        };
      }
    // case "pass":
    //   const onlyLatiOrNumnPass = value.match(/^[a-zA-Z0-9.\-_]+$/);
    //   if (onlyLatiOrNumnPass === null) {
    //     return {
    //       errorStatus: true,
    //       message: "Пароль доступно латинецею і цифрами",
    //       class: "error",
    //     };
    //   } else if (value.length < 8) {
    //     return {
    //       errorStatus: true,
    //       message: "Пароль мінімум 8 сиволів",
    //       class: "error",
    //     };
    //   } else {
    //     return {
    //       errorStatus: false,
    //       message: "Пароль заповнено правильно",
    //       class: "done",
    //     };
    //   }
    default:
      return null;
  }
};

export default validationForm;
