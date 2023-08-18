/* eslint-disable no-useless-escape */
const regex = new RegExp("/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/", "gi")

const validStudentInfo = async (req, res, next) => {
  const { st_email, st_name, st_password } = req.body;
  function validEmail(userEmail) {
    return regex.test(userEmail);
  }
  if (req.path === "/register") {
    if (![st_email, st_name, st_password].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!validEmail(st_email)) {
      return res.json("Invalid Email");
    }
  } else if (req.path === "/signIn") {
    if (![st_email, st_password].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!validEmail(st_email)) {
      return res.json("Invalid Email");
    }
  }
  next();
};

// const validAdminInfo = async (req, res, next) => {
//   const { ad_email, ad_name, ad_password } = req.body;
//   function validEmail(userEmail) {
//     return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
//   }
//   if (req.path === "/register") {
//     console.log(!email.length);
//     if (![ad_email, ad_name, ad_password].every(Boolean)) {
//       return res.json("Missing Credentials");
//     } else if (!validEmail(ad_email)) {
//       return res.json("Invalid Email");
//     }
//   } else if (req.path === "/signIn") {
//     if (![ad_email, ad_password].every(Boolean)) {
//       return res.json("Missing Credentials");
//     } else if (!validEmail(ad_email)) {
//       return res.json("Invalid Email");
//     }
//   }
//   next();
// };

const validTeacherInfo = async (req, res, next) => {
  const { ta_email, ta_name, ta_password } = req.body;
  function validEmail(userEmail) {
    return regex.test(userEmail);
  }
  if (req.path === "/register") {
    if (![ta_email, ta_name, ta_password].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!validEmail(ta_email)) {
      return res.json("Invalid Email");
    }
  } else if (req.path === "/signIn") {
    if (![ta_email, ta_password].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!validEmail(ta_email)) {
      return res.json("Invalid Email");
    }
  }
  next();
};

export default validStudentInfo;
export { validTeacherInfo, validStudentInfo }; //Took validAdminInfo out
