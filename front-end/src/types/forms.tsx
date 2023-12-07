import * as z from "zod"

export const RegisterFormFieldsType = z.object({
  lastname: z.string()
    .min(2, {
      message: "Votre nom de famille doit avoir au moin 2 caracteres.",
    })
    .max(50),
  firstname: z.string()
    .min(2, {
      message: "Votre prenom doit avoir au moin 2 caracteres.",
    })
    .max(50),
  phonenumber: z.string()
    .regex(new RegExp('^0(8|9)[0-9]{8}$'), {
      message: "Veuillez entrer un numero de telephone valide"
    })
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