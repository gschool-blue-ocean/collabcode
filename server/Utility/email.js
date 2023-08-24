import nodemailer from "nodemailer";
// const { createTransport } = nodemailer;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'GalvCollabCodeInfo@gmail.com',
      pass: 'zaspzuypjgwdllxw',
    },
  });
  const NotesTemplate = (email, student, input, notes) =>{
    // const { email } = user.email
      return {
        from: `Mail - <GalvCollabCodeInfo@gmail.com>`,
        to: email,
        subject: `Notes for ${student}`,
        html: `
        <h2>Interview Notes</h2>
        <p>${input}</p>
       <br/>
        <p>${notes}</p>
        <p>Thank you</p>`,
      };
  }

  export default transporter;
  export { NotesTemplate };