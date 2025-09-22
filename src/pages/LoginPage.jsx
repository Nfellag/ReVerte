const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
        (u) => u.preferences.email === email && u.preferences.password === password
    );

    if (!user) {
        toast({
            title: "Erreur",
            description: "Identifiants invalides",
            status: "error",
            duration: 3000,
            isClosable: true,
        });
        return;
    }

    localStorage.setItem("token", "fake-jwt-token");
    localStorage.setItem("currentUser", JSON.stringify(user));

    toast({
        title: "Connexion réussie",
        status: "success",
        duration: 2000,
        isClosable: true,
    });

    navigate("/dashboard");
};
