(() => {
    // Navigation and theme toggle logic
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function () {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        });
    });

    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });

    // Form submission logic
    const form = document.getElementById('contact-form');

    const submitForm = async () => {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
            alert("All fields are required!");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/send-message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, subject, message }),
            });

            const data = await response.json();
            console.log("MongoDB response:", data);

            if (response.ok) {
                alert('Your message has been sent successfully!');
                form.reset();
            } else {
                throw new Error(data.message || 'Failed to send your message.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while sending your message. Please try again later.');
        }
    };

    document.getElementById("send-message-btn").addEventListener("click", function (e) {
        e.preventDefault();
        submitForm();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        submitForm();
    });
})();
