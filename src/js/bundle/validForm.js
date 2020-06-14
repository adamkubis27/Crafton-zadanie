export function init() {
	'use strict';

	const form = document.querySelector('.js-form-valid');
    const fields = form.querySelectorAll('[data-error]');

    
    fields.forEach(field => field.addEventListener('keydown', function(e){
        const el = e.target;
        if(isNotEmpty(el)) {
            el.classList.add('valid-ok');
        }
    }));
    




    function isNotEmpty(field) {
        
        return field.value !== '';

    }

    function isChecked(field) {
        
        return field.checked !== false;

    }

    function isAtLeast(field, min) {
        
        return field.value.length >= min;

    }

    function isEmail(field) {
        
        return field.value.indexOf('@') !== -1;

    }

    function displayErrors(errors) {
        
        let ul = document.querySelector('ul.errors');

        if(!ul) {
            ul = document.createElement('ul');
            ul.classList.add('errors');
        }

        ul.innerHTML = '';

        errors.forEach(function(error){

            const li = document.createElement('li');
            li.textContent = error
            ul.appendChild(li);
        })

        form.parentNode.insertBefore(ul, form);
    }
    

    form.addEventListener('submit', function(e){
        
        e.preventDefault();
        
        const errors =[];

        for (let i = 0; i < fields.length; i++) {

            const field = fields[i],
                isValid = false;
            
            if(field.type === 'text') {
                isValid = isNotEmpty(field);
                
            } else if(field.type === 'email') {
                isValid = isEmail(field);
            } else if(field.type === 'textarea') {
                isValid = isAtLeast(field, 2);
            } else if(field.type === 'checkbox') {
                isValid = isChecked(field);
            }

            if(!isValid) {
                field.classList.add('error');
                errors.push(field.dataset.error);
            } else {
                field.classList.remove('error');
            }
        }

        function sendData(){
            const data = new FormData();
            data.append('fName', document.getElementById('your-name').value);
            data.append('fSurname', document.getElementById('your-surname').value);
            data.append('fEmail', document.getElementById('your-email').value);
            data.append('fComment', document.getElementById('your-message').value);
    
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'test.php', true);
            xhr.onload = function () {
                if(xhr.status !== 200){
                // Server does not return HTTP 200 (OK) response.
                // Whatever you wanted to do when server responded with another code than 200 (OK)
                return; // return is important because the code below is NOT executed if the response is other than HTTP 200 (OK)
                }
                // Whatever you wanted to do when server responded with HTTP 200 (OK)
                // I've added a DIV with id of testdiv to show the result there
                document.getElementById('status').innerHTML = this.responseText;
            };
            xhr.send(data);
        }

        if(errors.length) {
            displayErrors(errors)
        } else {
            sendData()
        }


    }, false)

}