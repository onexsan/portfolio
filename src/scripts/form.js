const contactForm = document.querySelector('#contact__form');
const contactButton = document.querySelector('#form-btn');

contactButton.addEventListener('click', function (event) {
	event.preventDefault();

	function validateForm(form) {
		let valid = true;

		if (!validateField(form.elements.name)) {
			valid = false;
			form.elements.name.style.borderBottom = "1px solid red";

		} else {
			form.elements.name.style.borderBottom = "1px solid white";
			form.elements.name.nextElementSibling.style.display = "none";

		}

		if (!validateField(form.elements.email)) {
			valid = false;
			form.elements.email.style.borderBottom = "1px solid red";
		} else {
			form.elements.email.style.borderBottom = "1px solid white";
			form.elements.email.nextElementSibling.style.display = "none";
		}

		return valid;
	}

	function validateField(field) {

		field.nextElementSibling.textContent = field.validationMessage;

		if (field.validationMessage !== "") {
			field.nextElementSibling.style.display = "block";
		};

		return field.checkValidity();
	}

	if (validateForm(contactForm)) {
		console.log('form is valid');
		console.log(`username: ${contactForm.elements.name.value}`);
		console.log(`email: ${contactForm.elements.email.value}`);

		if (contactForm.elements.comment.value !== "") {
			console.log(`comment: ${contactForm.elements.comment.value}`);
		}

	}

});

