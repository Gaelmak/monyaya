import * as z from "zod";

export const RegisterFormFieldsType = z.object({
  name: z
    .string()
    .min(2, {
      message: "votre nom d'utilisateur doit avoir au moins 2 caractères.",
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      message:
        "le nom d'utilisateur ne peut contenir que des lettres et chiffres, sans espaces ni caractères spéciaux",
    })
    .max(30),
  password: z
    .string()
    .min(2, {
      message: "Mot de passe trop court",
    })
    .max(50),
  confirmpassword: z
    .string()
    .min(2, {
      message: "Mot de passe trop court",
    })
    .max(50),
});

export const CompleteRegisterFormFieldsType = z.object({
  firstname: z
    .string()
    .min(2, {
      message: "Votre prénom doit avoir au moin 2 caracteres.",
    })
    .max(50),
  lastname: z
    .string()
    .min(2, {
      message: "Votre nom doit avoir au moin 2 caracteres.",
    })
    .max(50),
  phonenumber: z.string().regex(new RegExp("^0(8|9)[0-9]{8}$"), {
    message: "Veuillez entrer un numero de telephone valide",
  }),
  email: z
    .string()
    .email()
    .min(5, {
      message: "Votre adresse est trop court.",
    })
    .max(50),
  municipality: z
    .string()
    .min(3, {
      message: "Entrez le nom de votre commune de residence",
    })
    .max(50),
  district: z
    .string()
    .min(3, {
      message: "Entrez le nom de votre quartier de residence",
    })
    .max(50),
  avenue: z
    .string()
    .min(3, {
      message: "Entrez le nom de votre avenue de residence",
    })
    .max(50),
  number: z
    .string()
    .min(1, {
      message: "Entrez le numero de votre residence",
    })
    .max(50),
});

export const LoginFormFieldsType = z.object({
  name: z
    .string()
    .min(2, {
      message: "Votre nom d'utilisateur doit avoir au moin 2 caracteres.",
    })
    .max(16, "Votre nom d'utilisateur doit avoir au plus 16 caracteres."),
  password: z
    .string()
    .min(4, {
      message: "Mot de passe trop court",
    })
    .max(24, "Mot de passe trop long"),
});

export const ResetLoginFormFieldsType = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide"),
});

export const PasswordChangeFormFieldsType = z.object({
  password: z
    .string()
    .min(2, {
      message: "Mot de passe trop court",
    })
    .max(50),
  confirmpassword: z
    .string()
    .min(2, {
      message: "Mot de passe trop court",
    })
    .max(50),
});

export const CourseSearchFormFieldsType = z.object({
  course: z.string(),
  budget: z.string(),
  formation_or_name: z.string(),
});

export const SearchFormFieldsType = z.object({
  formation_or_name: z.string(),
});

export const NewsletterRegisterFormFieldsType = z.object({
  firstName: z.string(),
  email: z.string().email("Veuillez entrer une adresse mail valide"),
});

export const ContactFormFieldsType = z.object({
  email: z.string().email("Veuillez entrer une adresse mail valide"),
  message: z.string().min(3, {
    message: "Veuillez remplir ce champ avant d'envoyer votre message",
  }),
});

export const BecomeATrainerFormFieldsType = z.object({
  bio: z
    .string()
    .min(10, {
      message: "Votre description doit avoir au moins 10 caracteres.",
    })
    .max(500, {
      message:
        "Vous avez dépassé la limite de 500 caractères pour votre description.",
    }),
  terms_and_conditions: z
    .boolean()
    .refine((value) => value === true, {
      message: "Veuillez accepter les termes et conditions pour continuer.",
    })
    .default(false),
});

export const NewCourseFormFieldsType = z.object({
  title: z.string().min(1, {
    message: "Le nom de la formation est requis.",
  }),
  description: z.string(),
  type: z.string().min(1, {
    message: "Au moins un chapitre est requis.",
  }),
  price: z.string().regex(/^[1-9]\d*$/, {
    message:
      "Le montant doit être un nombre positif et commencer à partir de 1$",
  }),
  pricePer: z.enum(["MONTH", "SECTION"], {
    message: "Requis",
  }),
  duration: z.string().regex(/^[1-9]\d*$/, {
    message: "La durée doit être un nombre positif et ne doit pas être zéro",
  }),
  category: z.string().min(1, {
    message: "Veuillez choisir une catégorie pour votre formation",
  }),
  videoUrl: z
    .string()
    .refine(
      (value) =>
        value.length === 0 || z.string().url().safeParse(value).success,
      {
        message: "Veuillez entrer une URL valide ou laisser le champ vide",
      }
    )
    .optional(),
  cover: z.string(),
});

export const NewLessonsFormFieldsType = z.object({
  title: z.string().min(1, {
    message: "Le nom de la leçon est requis.",
  }),
  description: z.string(),
  content: z.string(),
  videoUrl: z
    .string()
    .refine(
      (value) =>
        value.length === 0 || z.string().url().safeParse(value).success,
      {
        message: "Veuillez entrer une URL valide ou laisser le champ vide",
      }
    )
    .optional(),
  meetUrl: z
    .string()
    .refine(
      (value) =>
        value.length === 0 || z.string().url().safeParse(value).success,
      {
        message: "Veuillez entrer une URL valide ou laisser le champ vide",
      }
    )
    .optional(),
  adress: z.string(),
});

export const EditUsersFormFieldsType = z.object({
  firstname: z
    .string()
    .min(2, {
      message: "Votre prénom doit avoir au moin 2 caracteres.",
    })
    .max(50),
  lastname: z
    .string()
    .min(2, {
      message: "Votre nom doit avoir au moin 2 caracteres.",
    })
    .max(50),
  phonenumber: z.string().regex(new RegExp("^0(8|9)[0-9]{8}$"), {
    message: "Veuillez entrer un numero de telephone valide",
  }),
  email: z
    .string()
    .email()
    .min(5, {
      message: "Votre adresse est trop court.",
    })
    .max(50),
});

export const EditAddressFormFieldsType = z.object({
  municipality: z
    .string()
    .min(3, {
      message: "Entrez le nom de votre commune de residence",
    })
    .max(50),
  district: z
    .string()
    .min(3, {
      message: "Entrez le nom de votre quartier de residence",
    })
    .max(50),
  avenue: z
    .string()
    .min(3, {
      message: "Entrez le nom de votre avenue de residence",
    })
    .max(50),
  number: z
    .string()
    .min(1, {
      message: "Entrez le numero de votre residence",
    })
    .max(50),
});
