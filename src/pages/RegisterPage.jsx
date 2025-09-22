const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.preferences.email === email)) {
        toast({
            title: "Erreur",
            description: "Cet email est déjà utilisé",
            status: "error",
            duration: 3000,
            isClosable: true
        });
        return;
    }

    if (password !== confirmPassword) {
        toast({
            title: "Erreur",
            description: "Les mots de passe ne correspondent pas",
            status: "error",
            duration: 3000,
            isClosable: true
        });
        return;
    }

    if (!name || !email || !password || !gender || age === "") {
        toast({
            title: "Erreur",
            description: "Merci de remplir tous les champs",
            status: "error",
            duration: 3000,
            isClosable: true
        });
        return;
    }

    const newUser = {
        nom: name,
        type: "citoyen", // ou "admin" si tu veux gérer des rôles
        preferences: { email, password, gender, age },
        notifications: true
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("token", "fake-jwt-token");
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    toast({
        title: "Inscription réussie",
        status: "success",
        duration: 2000,
        isClosable: true
    });

    navigate("/dashboard");
};
