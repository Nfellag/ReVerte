// Charger l'utilisateur courant
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {
    nom: "John Doe",
    type: "citoyen",
    preferences: { email: "john@example.com", gender: "homme", age: 30 },
    notifications: true
};

const [name, setName] = useState(currentUser.nom);
const [email, setEmail] = useState(currentUser.preferences.email);
const [gender, setGender] = useState(currentUser.preferences.gender || "homme");
const [age, setAge] = useState(currentUser.preferences.age || 25);
const [notifications, setNotifications] = useState(currentUser.notifications);

// Sauvegarde
const handleSave = () => {
    const updatedUser = {
        ...currentUser,
        nom: name,
        preferences: { ...currentUser.preferences, email, gender, age },
        notifications
    };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // Met aussi à jour la liste globale
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const idx = users.findIndex((u) => u.preferences.email === currentUser.preferences.email);
    if (idx !== -1) {
        users[idx] = updatedUser;
        localStorage.setItem("users", JSON.stringify(users));
    }

    toast({
        title: "Profil mis à jour",
        status: "success",
        duration: 2000,
        isClosable: true,
    });
};
