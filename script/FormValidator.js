export class FormValidator {
  constructor(params, formElement) {
    this._params = params;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
    this._buttonElement = formElement.querySelector(params.submitButtonSelector);

  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._params.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._params.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _hasInvalidInput() {
    return this._inputList.some(function(inputElement) {
      return !inputElement.validity.valid;
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.popup__input-error_type_${inputElement.id}`);
    inputElement.classList.add(this._params.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._params.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.popup__input-error_type_${inputElement.id}`);
    inputElement.classList.remove(this._params.inputErrorClass);
    errorElement.classList.remove(this._params.errorClass);
    errorElement.textContent = '';
  }
}

