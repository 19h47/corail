/* global Shopify */

const selectors = {
	customerAddresses: '[data-customer-addresses]',
	addressCountrySelect: '[data-address-country-select]',
	addressContainer: '[data-address]',
	toggleAddressButton: 'button[aria-expanded]',
	cancelAddressButton: 'button[type="reset"]',
	deleteAddressButton: 'button[data-confirm-message]'
};

const attributes = {
	expanded: 'aria-expanded',
	confirmMessage: 'data-confirm-message'
};

// eslint-disable-next-line no-unused-vars
class CustomerAddresses {
	constructor() {
		// eslint-disable-next-line no-underscore-dangle
		this.elements = this._getElements();
		if (0 === Object.keys(this.elements).length) return;
		// eslint-disable-next-line no-underscore-dangle
		this._setupCountries();
		// eslint-disable-next-line no-underscore-dangle
		this._setupEventListeners();
	}

	// eslint-disable-next-line no-underscore-dangle, class-methods-use-this
	_getElements() {
		const container = document.querySelector(selectors.customerAddresses);
		return container ? {
			container,
			addressContainer: container.querySelector(selectors.addressContainer),
			toggleButtons: document.querySelectorAll(selectors.toggleAddressButton),
			cancelButtons: container.querySelectorAll(selectors.cancelAddressButton),
			deleteButtons: container.querySelectorAll(selectors.deleteAddressButton),
			countrySelects: container.querySelectorAll(selectors.addressCountrySelect)
		} : {};
	}

	// eslint-disable-next-line no-underscore-dangle
	_setupCountries() {
		if (Shopify && Shopify.CountryProvinceSelector) {
			// eslint-disable-next-line no-new
			new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {
				hideElement: 'AddressProvinceContainerNew'
			});
			this.elements.countrySelects.forEach(select => {
				const {formId} = select.dataset;
				// eslint-disable-next-line no-new
				new Shopify.CountryProvinceSelector(`AddressCountry_${formId}`, `AddressProvince_${formId}`, {
					hideElement: `AddressProvinceContainer_${formId}`
				});
			});
		}
	}

	// eslint-disable-next-line no-underscore-dangle
	_setupEventListeners() {
		this.elements.toggleButtons.forEach(element => {
			// eslint-disable-next-line no-underscore-dangle
			element.addEventListener('click', this._handleAddEditButtonClick);
		});

		this.elements.cancelButtons.forEach(element => {
			// eslint-disable-next-line no-underscore-dangle
			element.addEventListener('click', this._handleCancelButtonClick);
		});

		this.elements.deleteButtons.forEach(element => {
			// eslint-disable-next-line no-underscore-dangle
			element.addEventListener('click', this._handleDeleteButtonClick);
		});
	}

	// eslint-disable-next-line no-underscore-dangle, class-methods-use-this
	_toggleExpanded(target) {
		target.setAttribute(
			attributes.expanded,
			('false' === target.getAttribute(attributes.expanded)).toString()
		);
	}

	_handleAddEditButtonClick = ({ currentTarget }) => {
		// eslint-disable-next-line no-underscore-dangle
		this._toggleExpanded(currentTarget);
	}

	_handleCancelButtonClick = ({ currentTarget }) => {
		// eslint-disable-next-line no-underscore-dangle
		this._toggleExpanded(
			currentTarget
				.closest(selectors.addressContainer)
				.querySelector(`[${attributes.expanded}]`)
		)
	}

	// eslint-disable-next-line class-methods-use-this
	_handleDeleteButtonClick = ({ currentTarget }) => {
		// eslint-disable-next-line no-alert, no-restricted-globals
		if (confirm(currentTarget.getAttribute(attributes.confirmMessage))) {
			Shopify.postLink(currentTarget.dataset.target, {
				parameters: { _method: 'delete' },
			});
		}
	}
}
