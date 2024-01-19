import * as z from "zod"

export const RegisterFormFieldsType = z.object({
  firstname: z.string()
    .min(2, {
      message: "Votre prénom doit avoir au moin 2 caracteres.",
    })
    .max(50),
  lastname: z.string()
    .min(2, {
      message: "Votre nom doit avoir au moin 2 caracteres.",
    })
    .max(50),
  phonenumber: z.string()
    .regex(new RegExp('^0(8|9)[0-9]{8}$'), {
      message: "Veuillez entrer un numero de telephone valide"
    }),
  name: z.string()
    .min(2, {
      message: "Votre nom d'utilisateur doit avoir au moin 2 caracteres.",
    })
    .max(50),
  password: z.string()
    .min(2, {
      message: "Mot de passe trop court",
    })
    .max(50),
  confirmpassword: z.string()
    .min(2, {
      message: "Mot de passe trop court",
    })
    .max(50),
  email: z.string().email()
    .min(5, {
      message: "Votre adresse est trop court.",
    })
    .max(50),
})

export const LoginFormFieldsType = z.object({
  name: z.string()
    .min(2, {
      message: "Votre nom d'utilisateur doit avoir au moin 2 caracteres.",
    })
    .max(50),
  password: z.string()
    .min(2, {
      message: "Mot de passe trop court",
    })
    .max(50),
})

export const CourseSearchFormFieldsType = z.object({
  course: z.string(),
  budget: z.string(),
  formation_or_name: z.string(),
})

export const SearchFormFieldsType = z.object({
  formation_or_name: z.string(),
})

export const NewsletterRegisterFormFieldsType = z.object({
  email: z.string().email("Veuillez entrer une adresse mail valide")
})