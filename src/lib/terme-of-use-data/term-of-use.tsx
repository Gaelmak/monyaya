import { ReactNode } from "react";

export const termOfUse = [
  {
    id: "article1",
    title: "Objet des Termes et Conditions",
    content:
      "Les présentes conditions ont pour objet de définir les droits et obligations entre Monyaya et les utilisateurs de son site internet et de ses services. Monyaya fournit une plateforme permettant de mettre en relation des formateurs et des apprenants pour des services d'apprentissage à domicile.",
  },
  {
    id: "article2",
    title: "Définitions",
    content:
      "Utilisateur : Toute personne visitant ou utilisant la plateforme pour bénéficier des services d'apprentissage à domicile fournis par les Formateurs.\n- **Formateur ou yaya** : Les prestataires de services d'apprentissage inscrits sur la plateforme pour enseigner diverses disciplines.",
  },
  {
    id: "article3",
    title: "Accès aux Services",
    content:
      "Monyaya permet aux utilisateurs de rechercher et de s'inscrire à des cours proposés par des formateurs indépendants. Les utilisateurs sont responsables de la véracité des informations qu'ils fournissent lors de leur inscription.",
  },
  {
    id: "article4",
    title: "Obligations de Monyaya",
    content:
      "Monyaya s'engage à mettre en relation les apprenants et des formateurs qualifiés et à garantir un accès sécurisé à la plateforme.",
  },
  {
    id: "article5",
    title: "Obligations des Utilisateurs",
    content:
      "Les utilisateurs s'engagent à :\n\n- Fournir des informations exactes lors de l'inscription.\n- Respecter les conditions établies entre le formateur et lui.\n- Collaborer de manière active durant le processus d'apprentissage.\n\nToute violation de ces conditions peut entraîner la suspension ou la résiliation de l'accès à nos services.",
  },
  {
    id: "article6",
    title: "Paiement et Tarification",
    content:
      "Les services proposés par les formateurs sont facturés aux utilisateurs selon les tarifs indiqués au moment de l'inscription à un cours. Le paiement peut s'effectuer via les modes disponibles sur la plateforme. Les prix sont fixés par les formateurs eux-mêmes, et Monyaya peut prélève une commission pour l'utilisation de la plateforme une fois le service réalisée.\n\nPour ce qui est de la sécurité de paiement, Monyaya ne transfère pas directement la somme de paiement au prestataire. Les fonds sont conservés sur un compte bloqué et seront libérés progressivement en fonction de l'avancement de la formation. Si un client prouve que le prestataire ne respecte pas les normes de qualité ou les conditions d'apprentissage, et que les paiements ont déjà été effectués, le client pourra obtenir un remboursement proportionnel à l'avancement de la formation, sur présentation des preuves.",
  },
  {
    id: "article7",
    title: "Durée et Résiliation",
    content:
      "L'accès aux services est valable pour la durée de l'inscription à un cours. Les utilisateurs peuvent à tout moment mettre fin à leur utilisation de la plateforme. En cas de manquement aux présentes conditions, Monyaya se réserve le droit de suspendre ou de résilier l'accès de l'utilisateur sans préavis.",
  },
  {
    id: "article8",
    title: "Garanties et Limitation de Responsabilité",
    content:
      "Monyaya s'efforce de collaborer avec des formateurs qualifiés et compétents. Cependant, Monyaya ne peut garantir le résultat des apprentissages ou la satisfaction complète des utilisateurs. La responsabilité de Monyaya est limitée à la fourniture de la plateforme et des services associés. Monyaya ne sera pas responsable des dommages indirects ou imprévus causés par l'utilisation des services.",
  },
  {
    id: "article9",
    title: "Force Majeure",
    content:
      "Monyaya ne saurait être tenu responsable en cas d'événements échappant à son contrôle, tels que des catastrophes naturelles, des conflits armés, des grèves ou toute autre situation relevant de la force majeure. En cas de force majeure, les obligations des parties seront suspendues le temps de l'événement.",
  },
  {
    id: "article10",
    title: "Modification des Termes",
    content:
      "Monyaya se réserve le droit de modifier à tout moment les présentes conditions d'utilisation. Les utilisateurs seront informés de ces modifications par un avis sur le site ou par email. L'utilisation continue de la plateforme après la modification des termes vaut acceptation de nouvelles conditions.",
  },
  {
    id: "article11",
    title: "Résolution des Litiges",
    content:
      "En cas de litige relatif à l'utilisation de la plateforme, les parties s'engagent à chercher une solution amiable. À défaut d'accord, le litige sera soumis à la compétence exclusive des tribunaux de la ville de Kinshasa.",
  },
  {
    id: "article12",
    title: "Dispositions Générales",
    content:
      "Les présentes conditions d'utilisation sont soumises à la loi en vigueur. Si une disposition de ces conditions est jugée invalide, les autres dispositions resteront en vigueur. Toute modification des présentes doit être faite par écrit.",
  },
];

export const termOfUseForYaya: {
  id: string;
  title: string;
  content: ReactNode;
}[] = [
  {
    id: "article1",
    title: "Objet des Termes et Conditions",
    content:
      "Le présent accord définit les termes de la relation entre Monyaya et les prestataires fournissant des services d'apprentissage à domicile. Ces termes s'appliquent à tout prestataire qui utilise la plateforme pour offrir ses services à des clients de Monyaya.",
  },
  {
    id: "article2",
    title: "Définitions",
    content: (
      <ol className="list-disc ml-4">
        <li>
          <b>Client</b> : désigne tout bénéficiaire des services
          d&apos;apprentissage à domicile mis en relation avec le prestataire
          via Monyaya.
        </li>
        <li>
          <b>Monyaya</b> : désigne la société Monyaya, opératrice de la
          plateforme de mise en relation entre prestataires et clients.
        </li>
        <li>
          <b>Prestataire ou yaya</b> : désigne le prestataire inscrit sur la
          plateforme pour fournir des services d&apos;apprentissage à domicile.
        </li>
      </ol>
    ),
  },
  {
    id: "article3",
    title: "Obligations de Monyaya",
    content:
      "Monyaya s'engage à mettre en relation les prestataires avec des clients recherchant des services d'apprentissage à domicile. De plus, Monyaya assurera le paiement des prestations fournies par le prestataire aux clients, sous réserve du respect des conditions établies.",
  },
  {
    id: "article4",
    title: "Obligations du Prestataire",
    content: (
      <div>
        <p>Le prestataire s&apos;engage à :</p>
        <ul>
          <li>
            Fournir des services d&apos;apprentissage à domicile de qualité,
            conformément aux attentes des clients et aux standards définis par
            Monyaya.
          </li>
          <li>
            Respecter les directives de Monyaya et collaborer pour garantir la
            satisfaction des clients.
          </li>
        </ul>
        <p>
          Tout manquement à ces obligations peut entraîner une résiliation du
          contrat par Monyaya.
        </p>
      </div>
    ),
  },
  {
    id: "article5",
    title: "Clause de Non-Concurrence",
    content:
      "Le prestataire s'engage à ne pas contacter directement un client de Monyaya en dehors du circuit proposé par ce dernier pour proposer des services similaires. Cette clause est applicable même si c'est le client qui prend l'initiative de contacter le prestataire. Toute violation de cette clause pourrait entraîner des sanctions, y compris la résiliation du contrat.",
  },
  {
    id: "article6",
    title: "Rémunération et Modalités de Paiement",
    content:
      "Le prestataire sera rémunéré par Monyaya au tarif qu'il aura lui-même fixé. Les modalités de paiement seront convenues entre Monyaya et le prestataire. Monyaya transférera les fonds suivant l'avancement du programme et l'entente entre Monyaya et le prestataire.",
  },
  {
    id: "article7",
    title: "Durée du Contrat et Renouvellement",
    content:
      "Pour chaque formation, le contrat est conclu pour une durée allant du début de la formation à sa conclusion, et sera renouvelé automatiquement pour à chaque nouvelle inscription par le client sauf dénonciation par l'une des parties avec un préavis avant l'expiration du contrat.",
  },
  {
    id: "article8",
    title: "Résiliation",
    content:
      "Le contrat peut être résilié par l'une ou l'autre des parties moyennant un préavis. En cas de non-respect des obligations contractuelles par l'une des parties, une résiliation immédiate peut être prononcée. De plus, le prestataire s'engage à ne pas conclure de contrat avec un concurrent de Monyaya pendant la durée du contrat, y compris pendant le préavis.",
  },
  {
    id: "article9",
    title: "Litiges",
    content:
      "Tout litige découlant du présent contrat sera soumis à la compétence exclusive des tribunaux de Kinshasa. Les parties s'efforceront de régler à l’amiable tout différend avant d'engager des procédures judiciaires.",
  },
  {
    id: "article10",
    title: "Dispositions Générales",
    content:
      "Toute modification des présentes conditions doit être approuvée par écrit par les deux parties. Le prestataire reconnaît avoir pris connaissance et accepté l'ensemble des conditions énoncées dans ce document.",
  },
];

export const PrivacyPolicy = [
  {
    id: "article1",
    title: "Quelles données nous collectons",
    content:
      "Nous collectons certaines données que vous nous fournissez directement, telles que les informations que vous saisissez volontairement ; des données relatives à votre interaction avec les expériences d’apprentissage ; et des données issues de plateformes tierces avec lesquelles vous interagissez via Monyaya. Toutes les données mentionnées dans cette section peuvent faire l’objet de traitements variés : collecte, enregistrement, structuration, stockage, modification, récupération, chiffrement, pseudonymisation, suppression, combinaison et transfert.",
  },
  {
    id: "article2",
    title: "Les données que vous nous fournissez",
    content: (
      <div>
        <p>
          Nous pouvons collecter diverses informations vous concernant en
          fonction de la manière dont vous utilisez nos services. Lorsque vous
          créez un compte et utilisez les Services de Monyaya, y compris via une
          plateforme tierce, nous collectons toutes les données que vous nous
          fournissez directement, comme suit :
        </p>
        <ol className="pl-2">
          <li>
            <b>Données de compte:</b> Pour accéder à certaines fonctionnalités
            (comme réserver une expérience d’apprentissage ou créer une offre en
            tant qu’expert), vous devez créer un compte utilisateur. Nous
            collectons et stockons votre nom, adresse e-mail, mot de passe et
            paramètres de compte. Si vous devenez expert, nous collectons aussi
            des informations supplémentaires: photo de profil, numéro de
            téléphone, localisation, une pièce d’identité gouvernementale, des
            informations fiscales ou bancaires (pour les paiements), et toute
            information sur vos compétences ou domaines d’expertise. Chaque
            compte est associé à un identifiant unique.
          </li>
          <li>
            <b>Données de profil:</b> Vous pouvez choisir de fournir des
            informations de profil supplémentaires (photo, biographie, langue,
            lien vers des réseaux sociaux ou sites Web, pays, domaines
            d&apos;expertise, etc.). Ces informations sont visibles par tous les
            utilisateurs de la plateforme.
          </li>
          <li>
            <b>Contenu partagé:</b> Les Services permettent de publier et de
            partager du contenu, comme des descriptions d’expériences
            d’apprentissage, des avis, des questions, des réponses, des photos
            ou autres contenus. Ce contenu peut être visible par tous les
            utilisateurs selon l’endroit où il est publié.
          </li>
          <li>
            <b>Données d’apprentissage:</b> Lorsque vous réservez ou participez
            à une expérience, nous collectons des informations comme :
            l’expérience sélectionnée, la progression, les avis laissés, et vos
            interactions avec les experts ou autres utilisateurs (questions,
            réponses, messages).
          </li>
          <li>
            <b>Données de paiement des participants:</b> Si vous réservez une
            expérience sur Monyaya, nous collectons votre nom, adresse de
            facturation et code postal. Les informations sensibles comme les
            détails de carte bancaire sont directement traitées par des
            prestataires de paiement sécurisés et ne sont pas stockées par
            Monyaya. Nous recevons uniquement des informations limitées, comme
            un statut de paiement réussi.
          </li>
          <li>
            <b>Données de paiement des experts:</b> Les experts peuvent associer
            leur compte bancaire ou PayPal pour recevoir des paiements. Nous
            collectons les informations nécessaires (adresse e-mail, coordonnées
            bancaires, informations fiscales). La collecte et l’utilisation de
            ces données respectent les obligations légales et les politiques de
            confidentialité des prestataires de paiement tiers.
          </li>
          <li>
            <b>Données relatives à vos comptes sur d’autres services:</b> Si
            vous connectez votre compte Monyaya à un réseau social (comme
            Facebook) ou à une autre plateforme, nous pouvons recevoir des
            informations telles que votre nom, adresse e-mail ou photo de
            profil, selon vos paramètres de confidentialité sur ces services.
          </li>
          <li>
            <b>Loteries, promotions et enquêtes:</b> Si vous participez à une
            promotion ou une enquête via Monyaya, nous collectons les données
            nécessaires à cette participation (nom, adresse e-mail, numéro de
            téléphone, etc.). Ces données sont utilisées pour administrer la
            promotion et notifier les gagnants.
          </li>
          <li>
            <b>Communications et support:</b> Si vous contactez le support
            Monyaya (avec ou sans compte), nous collectons vos messages,
            coordonnées (nom, e-mail) et autres informations nécessaires pour
            traiter votre demande.
          </li>
        </ol>
        <p>
          Toutes les données mentionnées ci-dessus sont stockées et associées à
          votre compte utilisateur, dans le respect de la présente Politique de
          confidentialité.
        </p>
      </div>
    ),
  },
  {
    id: "article3",
    title: "Les données que nous collectons par voie automatisée",
    content: (
      <div>
        <p>
          Lorsque vous accédez aux Services Monyaya, y compris en parcourant les
          expériences disponibles, nous collectons automatiquement certaines
          données techniques et d’utilisation, comme suit :
        </p>
        <ol className="pl-2">
          <li>
            <b>Données système:</b> Nous recueillons des informations techniques
            sur votre appareil, telles que: l’adresse IP, le type et la version
            du système d’exploitation, le type de navigateur, la langue
            utilisée, l’identifiant unique de votre appareil, et les
            caractéristiques techniques de la plateforme que vous utilisez.
          </li>
          <li>
            <b>Données d’utilisation:</b> Nous collectons des statistiques sur
            votre interaction avec les Services: les pages visitées, le temps
            passé sur chaque page, les clics effectués, les fonctionnalités
            utilisées, les recherches réalisées, la date et l’heure de vos
            visites, et les pages référentes (par exemple, si vous venez d’un
            lien externe).
          </li>
          <li>
            <b>Données géographiques approximatives:</b> Nous pouvons déduire
            votre emplacement général (pays, ville ou région) à partir de votre
            adresse IP pour personnaliser votre expérience et garantir la
            sécurité de nos services.
          </li>
        </ol>
        <p>Ces données sont recueillies à l’aide de technologies comme:</p>
        <ol className="pl-2">
          <li>
            <b>Fichiers journaux de serveur:</b> enregistrements automatiques de
            vos activités sur notre plateforme.
          </li>
          <li>
            <b>Cookies et technologies similaires:</b> petits fichiers déposés
            sur votre appareil pour améliorer votre expérience (détails fournis
            dans la section «Cookies et outils de collecte de données»).
          </li>
        </ol>
        <p>
          Ces informations nous aident à fournir des services sécurisés, à
          diagnostiquer les problèmes techniques, et à optimiser votre
          navigation sur la plateforme.
        </p>
      </div>
    ),
  },
  {
    id: "article4",
    title: "Données provenant de tiers",
    content: (
      <div>
        <p>
          Nous pouvons recevoir des données vous concernant provenant de sources
          tierces pour améliorer votre expérience sur Monyaya. Ces données
          incluent:
        </p>
        <ol className="pl-2">
          <li>
            <b>Données issues de plateformes connectées:</b> Si vous créez ou
            accédez à votre compte Monyaya via des plateformes tierces (comme
            Google ou Facebook), nous recevons certaines informations de votre
            profil sur ces plateformes. Les informations partagées dépendent des
            paramètres de confidentialité que vous avez définis sur ces
            plateformes et peuvent inclure votre nom, prénom, adresse e-mail,
            photo de profil, ou d’autres informations de base.
          </li>
          <li>
            <b>Informations sur vos interactions avec nos partenaires:</b> Si
            vous interagissez avec Monyaya via des partenaires commerciaux (par
            exemple, lors d’offres promotionnelles ou collaborations avec des
            entreprises), ces partenaires peuvent nous fournir des informations
            vous concernant, telles que vos coordonnées ou des détails sur vos
            intérêts en lien avec leurs offres.
          </li>
          <li>
            <b>Données de validation d’identité:</b> Dans le cadre des
            vérifications pour les utilisateurs qui souhaitent devenir experts,
            nous pouvons recevoir des informations issues de prestataires tiers
            spécialisés dans la vérification d’identité. Cela peut inclure des
            documents d’identification ou d’autres informations nécessaires à la
            validation de votre profil.
          </li>
        </ol>
        <p>Ces données nous permettent:</p>
        <ol className="pl-2">
          <li>D&apos;améliorer la qualité de nos services.</li>
          <li>De personnaliser les expériences et recommandations.</li>
        </ol>
        <p>
          Lorsque vous interagissez avec une plateforme ou un partenaire tiers,
          veuillez consulter leur propre politique de confidentialité pour
          comprendre comment vos données sont collectées et partagées.
        </p>
      </div>
    ),
  },
  {
    id: "article5",
    title: "Comment nous obtenons des données à votre sujet",
    content:
      "Nous utilisons des outils tels que les cookies, les balises Web et des technologies de suivi similaires pour collecter les données mentionnées précédemment. Certains de ces outils vous permettent de gérer vos préférences ou de vous désinscrire de la collecte de données.",
  },
  {
    id: "article6",
    title: "Cookies et Outils de collecte de données",
    content: (
      <div>
        <p>
          Nous utilisons des cookies, de petits fichiers texte enregistrés par
          votre navigateur, pour collecter, stocker et partager des données
          relatives à vos activités sur Monyaya. Ces cookies nous permettent de
          mémoriser vos préférences, telles que votre langue ou vos paramètres
          d&apos;affichage, et de rendre l&apos;utilisation de la plateforme
          plus fluide. Pour en savoir plus sur les cookies, vous pouvez
          consulter Cookiepedia. De plus, nous utilisons des balises Web dans
          nos e-mails pour suivre leur livraison et mesurer leur taux
          d&apos;ouverture.
        </p>
        <p>
          Monyaya et ses prestataires de services (tels que Google Analytics ou
          des annonceurs tiers) utilisent des fichiers journaux de serveur et
          des outils de collecte de données automatisés, tels que des cookies,
          des balises Web (ou pixels espions), des scripts, des liens
          personnalisés, et des empreintes digitales de navigateur ou d’appareil
          (collectivement appelés «Outils de collecte de données»). Ces outils
          collectent automatiquement certaines Données système et Données
          d’utilisation (décrites dans la Section 1) lorsque vous interagissez
          avec la plateforme.
        </p>
        <p>
          Dans certains cas, les données recueillies via ces outils sont
          associées à d’autres informations collectées conformément à la
          présente Politique de confidentialité.
        </p>
      </div>
    ),
  },
  {
    id: "article7",
    title: "Pourquoi nous utilisons des outils de collecte de données",
    content: (
      <div>
        <p>
          Nous utilisons différents types d’outils de collecte de données aux
          fins suivantes:
        </p>
        <ol className="pl-2">
          <li>
            <b>Strictement nécessaire:</b> Ces outils vous permettent d’accéder
            à Monyaya, de fournir des fonctionnalités de base (comme la
            connexion ou l’accès au contenu), de sécuriser la plateforme, de
            prévenir les accès frauduleux et d’éviter les abus ou l’utilisation
            non autorisée. Ils sont indispensables au bon fonctionnement de
            Monyaya. Si vous les désactivez, certaines fonctionnalités ou
            parties de la plateforme pourraient devenir inaccessibles.
          </li>
          <li>
            <b>Fonctionnel:</b> Ces outils mémorisent vos préférences de
            navigation et d’affichage (comme la langue ou le niveau sonore des
            vidéos), offrent des fonctionnalités supplémentaires et
            personnalisent le contenu pour le rendre plus pertinent pour vous.
          </li>
          <li>
            <b>Performances:</b> Ces outils nous permettent d’analyser et
            d’améliorer les services en fournissant des données sur
            l’utilisation, les performances, le nombre de visites, ou les
            sources de trafic. Ils nous aident également à tester différentes
            fonctionnalités et à déterminer ce qui est préféré par nos
            utilisateurs.
          </li>
          <li>
            <b>Publicité:</b> Ces outils sont utilisés pour afficher des
            publicités pertinentes (sur Monyaya et d&apos;autres sites) basées
            sur vos interactions précédentes avec la plateforme ou d’autres
            sites. Ces annonces personnalisées sont rendues possibles grâce à
            des informations anonymisées, telles que votre adresse e-mail sous
            une forme hachée, ou à des données recueillies par nos partenaires
            publicitaires.
          </li>
          <li>
            <b>Réseaux sociaux:</b> Ces outils permettent d’activer des
            fonctionnalités de partage sur les réseaux sociaux (comme partager
            du contenu avec vos contacts). Ils peuvent également suivre votre
            activité sur d’autres sites pour proposer des publicités ciblées.
          </li>
        </ol>
        <p>
          Vous pouvez configurer votre navigateur pour être averti en cas
          d’enregistrement de cookies, limiter leur utilisation ou refuser tous
          les cookies. Toutefois, désactiver certains cookies peut affecter
          l’expérience utilisateur sur Monyaya. Pour plus d’informations sur la
          gestion des cookies et outils de collecte, reportez-vous à la section
          6.1 (<b>Vos choix quant à l’utilisation de vos données</b>)
          ci-dessous.
        </p>
      </div>
    ),
  },
  {
    id: "article8",
    title: "Quelle utilisation nous faisons de vos données",
    content: (
      <div>
        <p>
          Nous utilisons vos données pour vous offrir nos Services, communiquer
          avec vous, résoudre d&apos;éventuels problèmes, protéger vos
          informations contre la fraude et les abus, améliorer et optimiser
          notre plateforme, analyser l’utilisation de Monyaya, proposer des
          publicités ciblées, et pour toute autre finalité requise par la loi ou
          nécessaire pour assurer la sécurité et l’intégrité de nos
          utilisateurs. Vos données sont conservées aussi longtemps que
          nécessaire pour atteindre les objectifs pour lesquels elles ont été
          collectées.
        </p>
        <p>
          Nous utilisons les données collectées à travers votre interaction avec
          Monyaya pour :
        </p>
        <ol className="pl-2">
          <li>
            <b>Fournir et administrer nos Services</b>, notamment pour faciliter
            l’accès aux expériences d’apprentissage, afficher du contenu
            personnalisé et encourager les interactions entre utilisateurs
            (données de compte, contenu partagé, données système, données
            d&apos;utilisation).
          </li>
          <li>
            <b>Traiter les paiements</b> pour les formateurs ou hôtes
            d&apos;expériences et gérer les transactions des utilisateurs
            (données de paiement, données de compte).
          </li>
          <li>
            <b>Répondre à vos demandes</b>, traiter vos commandes et gérer vos
            inscriptions aux expériences (données de compte, communications,
            données de paiement).
          </li>
          <li>
            <b>Communiquer avec vous concernant votre compte :</b>
            <p>Répondre à vos questions et préoccupations.</p>
            <p>
              Vous envoyer des messages administratifs, des mises à jour sur vos
              réservations ou des notifications concernant des modifications de
              nos Services.
            </p>
            <p>
              Vous tenir informé des nouvelles expériences, des promotions et
              des services proposés sur Monyaya. Vous pouvez vous désabonner à
              tout moment de ces communications.
            </p>
            <p>
              Vous envoyer des notifications push sur vos appareils pour
              signaler des mises à jour ou d’autres informations pertinentes
              (vous pouvez gérer ces notifications dans vos paramètres).
            </p>
          </li>
          <li>
            <b>Personnaliser votre expérience</b> et gérer vos préférences pour
            rendre l’utilisation de Monyaya plus intuitive et pertinente
            (données de compte, données d’utilisation, données des cookies).
          </li>
          <li>
            <b>Faciliter le fonctionnement technique de la plateforme</b>,
            notamment pour sécuriser les transactions, résoudre les problèmes
            techniques, et prévenir les activités frauduleuses ou abusives
            (données système, données de localisation approximative, données de
            paiement).
          </li>
          <li>
            <b>Améliorer et développer nos services</b>, grâce à l’analyse des
            tendances, des interactions des utilisateurs et des performances
            globales de Monyaya (données d&apos;utilisation, données système).
          </li>
          <li>
            <b>Promouvoir nos Services</b> sur des plateformes tierces et
            adapter nos publicités pour qu&apos;elles soient plus pertinentes en
            fonction de vos intérêts (données de compte, données des cookies).
          </li>
          <li>
            <b>Respecter les obligations légales</b> en utilisant vos données
            dans le cadre des exigences réglementaires ou judiciaires (toutes
            les catégories de données).
          </li>
          <li>
            <b>Garantir la sécurité et l’intégrité de la plateforme</b> protéger
            nos utilisateurs, nos employés et les tiers contre tout préjudice
            potentiel (toutes les catégories de données).
          </li>
        </ol>
        <p>Nous pouvons également utiliser certaines données pour :</p>
        <ol className="pl-2">
          <li>
            <b>Analyser vos interactions avec nos Services</b> afin d’identifier
            les tendances, comprendre vos besoins et affiner nos offres.
          </li>
          <li>
            <b>Cibler nos publicités sur plusieurs appareils</b> et proposer des
            expériences personnalisées adaptées à vos préférences.
          </li>
          <li>
            <b>
              Traiter vos données dans nos outils d’intelligence artificielle
              (IA)
            </b>{" "}
            pour répondre à vos demandes. Cependant, nous ne partageons pas vos
            données personnelles pour entraîner ou améliorer nos modèles
            d&apos;IA.
          </li>
        </ol>
      </div>
    ),
  },
  {
    id: "article9",
    title: "Avec qui nous partageons vos données",
    content: (
      <div>
        <p>
          Nous partageons certaines de vos données avec des hôtes d’expériences,
          d&apos;autres participants, des prestataires de services, nos
          partenaires commerciaux, des sociétés d’analyse, des plateformes
          publicitaires, et d&apos;autres tiers selon les besoins pour opérer,
          améliorer, et promouvoir nos Services. Nous nous assurons que ces
          tiers respectent des normes strictes en matière de confidentialité et
          d&apos;utilisation des données.
        </p>
        <p>
          Vos données peuvent être partagées dans les circonstances suivantes :
        </p>
        <ol className="pl-2">
          <li>
            <b>Avec les hôtes d’expériences:</b> Nous partageons certaines
            informations nécessaires (comme votre prénom, votre pays et vos
            préférences) pour permettre aux hôtes de personnaliser les
            expériences. Ces données incluent vos activités sur la plateforme,
            comme les expériences réservées ou vos retours d’évaluation (données
            de compte, données de profil, données d&apos;utilisation).
            Cependant, votre adresse e-mail et vos données sensibles ne sont
            jamais partagées sans votre accord explicite.
          </li>
          <li>
            <b>Avec d&apos;autres participants et hôtes:</b> Selon vos
            paramètres de confidentialité, votre contenu partagé et vos
            informations de profil peuvent être visibles par d&apos;autres
            utilisateurs (données de compte, contenu partagé, données de
            profil). Par exemple, si vous commentez une expérience, votre prénom
            et votre commentaire seront accessibles publiquement.
          </li>
          <li>
            <b>Avec des prestataires de services tiers:</b> Nous collaborons
            avec des entreprises pour fournir des services essentiels, comme le
            traitement des paiements, l’hébergement de la plateforme, l’analyse
            de données, et la gestion des communications. Ces prestataires
            accèdent uniquement aux données nécessaires pour exécuter leurs
            missions et sont contractuellement tenus de les protéger (toutes les
            catégories de données).
          </li>
          <li>
            <b>Avec nos partenaires commerciaux:</b>
            <p>
              Nous partageons des données avec des entreprises partenaires qui
              aident à promouvoir ou distribuer nos Services (données de compte,
              données d’utilisation, données de localisation approximative).
            </p>
          </li>
          <li>
            <b>Avec des prestataires de publicité et d’analyse:</b> Nous pouvons
            utiliser des outils comme Google Analytics pour comprendre les
            tendances d’utilisation et améliorer Monyaya. Ces outils peuvent
            collecter des données anonymisées ou agrégées sur vos interactions
            avec notre plateforme. De plus, si nous lançons des campagnes
            publicitaires, certaines données pourront être utilisées pour cibler
            les annonces (données système, données des cookies, données
            d&apos;utilisation).
          </li>
          <li>
            <b>Pour des fonctionnalités liées aux réseaux sociaux:</b> Si vous
            interagissez avec des fonctions sociales intégrées (comme un bouton
            <b>Partager</b> sur Facebook), ces plateformes peuvent collecter
            certaines données sur votre utilisation de nos Services (données
            système, données des cookies).
          </li>
          <li>
            <b>À des fins légales ou de sécurité:</b>
            <p>Nous pouvons divulguer vos données si nécessaire pour :</p>
            <p>
              - Répondre à une obligation légale, une procédure judiciaire ou
              une enquête officielle.
            </p>
            <p>
              - Prévenir la fraude, détecter des abus ou des violations de nos
              conditions d’utilisation.
            </p>
            <p>
              - Protéger les droits, la sécurité et les biens de Monyaya, de ses
              utilisateurs, ou du public.
            </p>
          </li>
          <li>
            <b>En cas de changement de contrôle:</b> Si Monyaya fait l’objet
            d’une fusion, acquisition, ou vente d&apos;actifs, vos données
            pourraient être transférées à l&apos;entité repreneuse pour assurer
            la continuité des Services (toutes les catégories de données).
          </li>
          <li>
            <b>Avec votre autorisation explicite:</b> Si nous souhaitons
            partager vos données dans un cadre dépassant cette Politique de
            confidentialité, nous demanderons toujours votre consentement
            préalable.
          </li>
          <li>
            <b>Sous forme agrégée ou anonymisée:</b> Vos données peuvent être
            utilisées à des fins d’analyse ou de recherche sous une forme qui ne
            permet pas de vous identifier personnellement.
          </li>
        </ol>
        <p>
          Enfin, si vous cliquez sur un lien renvoyant à un site tiers, la
          collecte et l’utilisation de vos données sont soumises aux politiques
          de confidentialité du site concerné.
        </p>
      </div>
    ),
  },
  {
    id: "article10",
    title: "Sécurité",
    content:
      "Nous mettons en place des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction. Ces mesures varient en fonction de la nature et de la sensibilité des données que nous collectons et stockons. Cependant, comme pour tout système connecté à Internet, il existe toujours un risque d’accès non autorisé, et nous ne pouvons garantir une sécurité totale. Il est donc crucial que vous protégiez votre mot de passe et que vous nous contactiez immédiatement en cas d'activité suspecte sur votre compte. Votre mot de passe joue un rôle essentiel dans notre système de sécurité. Il est de votre responsabilité de le garder confidentiel et de ne pas le partager avec des tiers. Si vous pensez que votre mot de passe ou votre compte a été compromis, nous vous encourageons à changer votre mot de passe sans délai et à contacter notre équipe de support pour toute inquiétude.",
  },
  {
    id: "article11",
    title: "Vos droits",
    content:
      "Vous disposez de certains droits concernant l'utilisation de vos données personnelles. Vous pouvez choisir de ne pas recevoir nos communications promotionnelles, de désactiver les cookies, ou de refuser que certains tiers collectent des données à votre sujet. Vous pouvez également mettre à jour ou fermer votre compte via nos Services. En cas de questions ou de demandes concernant vos droits individuels sur vos données personnelles, vous pouvez nous contacter.",
  },
  {
    id: "article12",
    title: "Vos choix quant à l'utilisation de vos données",
    content: (
      <div>
        <p>
          Vous pouvez choisir de ne pas nous fournir certaines informations.
          Cependant, il est possible que cela limite l&apos;accès à certaines
          fonctionnalités des Services.
        </p>
        <ol className="pl-2">
          <li>
            Si vous ne souhaitez plus recevoir de communications
            promotionnelles, vous pouvez vous désabonner via le lien de
            désabonnement dans nos messages ou modifier les paramètres de
            notification dans votre compte.
          </li>
          <li>
            Vous pouvez désactiver certains outils de collecte de données en
            ajustant les paramètres de votre navigateur ou appareil. Consultez
            les instructions sur la gestion des cookies pour plus
            d&apos;informations.
          </li>
          <li>
            Si vous êtes situé dans l&apos;Espace économique européen, vous avez
            la possibilité de gérer vos préférences concernant les cookies et
            publicités ciblées via des plateformes comme Network Advertising
            Initiative ou Your Online Choices.
          </li>
          <li>
            Pour plus d’informations sur la gestion des publicités ciblées par
            des partenaires comme Google ou Taboola, vous pouvez consulter leurs
            pages de désinscription respectives.
          </li>
        </ol>
        <p>
          Pour toute question relative à l’utilisation de vos données ou à vos
          droits, n’hésitez pas à nous contacter par e-mail.
        </p>
      </div>
    ),
  },
  {
    id: "article13",
    title: "Accès, mise à jour et suppression de vos données personnelles",
    content: (
      <div>
        <p>
          Vous avez la possibilité de consulter et de mettre à jour vos
          informations personnelles à tout moment en vous connectant à votre
          compte. Si vous souhaitez fermer votre compte, suivez les instructions
          spécifiques à votre statut (participant ou formateur) via nos pages de
          support.
        </p>
        <ol className="pl-2">
          <li>
            Une fois votre compte supprimé, certaines données peuvent néanmoins
            rester visibles, en fonction de leur nature (par exemple, les
            commentaires ou contenus partagés).
          </li>
          <li>
            Même après la fermeture de votre compte, nous pouvons être amenés à
            conserver certaines données pour des raisons légales, telles que la
            conformité aux obligations légales ou la gestion des litiges.
          </li>
        </ol>
        <p>
          Si vous souhaitez demander l’accès à vos données, leur rectification
          ou leur suppression, utilisez notre formulaire en ligne ou
          contactez-nous directement par e-mail.
        </p>
      </div>
    ),
  },
  {
    id: "article14",
    title: "Notre politique relative aux enfants",
    content:
      "Nous nous engageons à protéger la vie privée des enfants. Les personnes de moins de 18 ans, mais ayant l’âge requis pour consentir à utiliser des services en ligne dans leur pays, peuvent créer un compte avec l’aide d’un parent ou responsable légal. Si nous découvrons que des données ont été collectées concernant un enfant n’ayant pas l'âge minimum requis, nous prendrons les mesures nécessaires pour les supprimer. Les parents qui estiment que nous avons collecté des informations concernant un enfant mineur sans le consentement requis peuvent nous contacter pour demander la suppression de ces données.",
  },
  {
    id: "article15",
    title: "Règles de compétence judiciaire",
    content:
      "Si vous résidez en République Démocratique du Congo (RDC) ou dans un autre pays, vous disposez de certains droits relatifs à l'accès et à la suppression de vos données, ainsi que du droit de savoir avec qui nous partageons vos informations. Nous rappelons que Monyaya traite des données collectées localement tout en respectant les principes de confidentialité en vigueur dans d'autres juridictions, notamment celles de l'Union Européenne, des États-Unis et de la RDC.",
  },
  {
    id: "article16",
    title: "Processus de soumission des demandes",
    content:
      "Pour toute question relative à la protection des données ou pour exercer vos droits en matière de confidentialité, contactez notre équipe à support@monyaya.com. Nous nous engageons à traiter toute demande de manière responsable et dans les délais légaux.",
  },
  {
    id: "article17",
    title: "Mises à jour et contact",
    content:
      "En cas de modification importante de cette politique, nous notifierons nos utilisateurs par e-mail, par notification dans nos services, ou par tout autre moyen requis par la loi applicable. Les modifications prennent effet le jour de leur publication. Si vous avez des questions, des préoccupations ou des différends, vous pouvez nous contacter par e-mail. ",
  },
  {
    id: "article18",
    title: "Modifications apportées à la Politique de confidentialité",
    content: (
      <div>
        <p>
          Nous mettons régulièrement à jour cette Politique de confidentialité
          pour refléter les évolutions de nos pratiques et des exigences
          légales. En cas de modifications importantes, nous vous informerons
          par e-mail ou par notification au sein de nos services, ou selon les
          exigences légales en vigueur. Cette notification inclura un résumé des
          changements majeurs. Sauf indication contraire, les modifications
          prendront effet dès leur publication.
        </p>
        <p>
          Dans la mesure permise par la loi, si vous continuez d&apos;utiliser
          nos services après la date d&apos;entrée en vigueur de ces
          modifications, cela signifie que vous acceptez la Politique de
          confidentialité mise à jour et vous vous engagez à la respecter. La
          version révisée remplace toutes les versions antérieures de cette
          Politique de confidentialité.
        </p>
      </div>
    ),
  },
  {
    id: "article19",
    title: "Interprétation",
    content:
      "Les termes en majuscule qui ne sont pas définis dans cette politique ont les significations qui leur sont attribuées dans les termes d’utilisation de Monyaya. Toute version de cette Politique de confidentialité dans une langue autre que le français est fournie à titre informatif. En cas de conflit entre la version française et une version traduite, la version française prévaudra.",
  },
  {
    id: "article20",
    title: "Questions",
    content:
      "Si vous avez des questions, des préoccupations ou des différends concernant cette Politique de confidentialité, n'hésitez pas à contacter notre équipe de protection des données à l'adresse suivante :  support@monyaya.com. ",
  },
];
