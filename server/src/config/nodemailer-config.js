import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // false for port 587, true for 465
    auth: {
        user: "akashsahcse@gmail.com",
        pass: "jqgw emwg dkjn tvrf",
    },
});


