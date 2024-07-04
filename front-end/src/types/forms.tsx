import * as z from "zod"

export const RegisterFormFieldsType = z.object({
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
})

export const CompleteRegisterFormFieldsType = z.object({
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
  email: z.string().email()
    .min(5, {
      message: "Votre adresse est trop court.",
    })
    .max(50),
  municipality: z.string()
    .min(3, {
      message: "Entrez le nom de votre commune de residence",
    })
    .max(50),
  district: z.string()
    .min(3, {
      message: "Entrez le nom de votre quartier de residence",
    })
    .max(50),
  avenue: z.string()
    .min(3, {
      message: "Entrez le nom de votre avenue de residence",
    })
    .max(50),
  number: z.string()
    .min(1, {
      message: "Entrez le numero de votre residence",
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

export const ContactFormFieldsType = z.object({
  email: z.string().email("Veuillez entrer une adresse mail valide"),
  message: z.string().min(3, {
    message: "Veuillez remplir ce champ avant d'envoyer votre message",
  })
})

export const BecomeATrainerFormFieldsType = z.object({
  bio: z.string()
    .min(10, {
      message: "Votre description doit avoir au moins 10 caracteres.",
    })
    .max(500),
  terms_and_conditions: z.boolean()
    .refine(value => value === true, {
      message: "Veuillez accepter les termes et conditions pour continuer."
    })
    .default(false),
})

export const NewTrainingFormFieldsType = z.object({
  training_name: z.string()
    .min(1, {
      message: "Le nom de la formation est requis."
    }),
  training_description: z.string()
    .min(1, {
      message: "La description de la formation est requise."
    }),
  chapters: z.array(
    z.object({
      title: z.string()
        .min(1, {
          message: "Le titre du chapitre est requis."
        }),
      description: z.string()
        .min(1, {
          message: "La description du chapitre est requise."
        })
      })).min(1, {
      message: "Au moins un chapitre est requis."
    }),
  price: z.preprocess(
    (a) => parseFloat(z.string().parse(a)), 
    z.number().gte(1, 'Le montant doit commencer à partir de 1$')
    ),
  category: z.string()
    .min(1, {
      message: "Veuillez choisir branche pour votre formation"
    })
})

export const EditUsersFormFieldsType = z.object({
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
  email: z.string().email()
    .min(5, {
      message: "Votre adresse est trop court.",
    })
    .max(50),
})

export const EditAddressFormFieldsType = z.object({
  municipality: z.string()
    .min(3, {
      message: "Entrez le nom de votre commune de residence",
    })
    .max(50),
  district: z.string()
    .min(3, {
      message: "Entrez le nom de votre quartier de residence",
    })
    .max(50),
  avenue: z.string()
    .min(3, {
      message: "Entrez le nom de votre avenue de residence",
    })
    .max(50),
  number: z.string()
    .min(1, {
      message: "Entrez le numero de votre residence",
    })
    .max(50),
})
