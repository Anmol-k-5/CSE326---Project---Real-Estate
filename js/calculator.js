/**
 * ==============================================================================
 * File: calculator.js
 * Author: Kunal (Dev 3 - Interactive Tools & Utilities)
 * GitHub: @kp4339536-netizen
 * Feature: Real Estate Mortgage & Monthly EMI Loan Calculator
 * ==============================================================================
 * Description:
 * Implements real-time financial mathematics for calculating monthly loan
 * installments (EMI), down payments, total interest, and complete loan breakdown.
 */

window.MortgageCalculator = window.MortgageCalculator || {};

(function () {
    'use strict';

    // Step 1: Cache all DOM element references
    var propertyPriceInput = null;
    var downPaymentSlider = null;
    var downPaymentText = null;
    var loanTenureInput = null;
    var loanTenureText = null;
    var interestRateInput = null;
    var interestRateText = null;

    // Results display nodes
    var monthlyEmiDisplay = null;
    var principalAmountDisplay = null;
    var totalInterestDisplay = null;
    var totalPayableDisplay = null;
    var selectedPropertyNotice = null;

    /**
     * Formats integer numbers into Indian Currency format
     * Example: 1850000 -> '₹ 18,50,000'
     */
    function formatIndianRupees(amount) {
        if (isNaN(amount) || amount === null) {
            return '₹ 0';
        }
        var rounded = Math.round(amount);
        return '₹ ' + rounded.toLocaleString('en-IN');
    }

    /**
     * Core Mathematical Formula for Monthly EMI:
     * EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
     *
     * Where:
     * P = Principal Loan Amount (Property Price - Down Payment)
     * R = Monthly Interest Rate (Annual Rate / 12 / 100)
     * N = Total Number of Monthly Installments (Tenure Years * 12)
     */
    function recalculateLoan() {
        // Step 1: Read values from inputs
        if (!propertyPriceInput) return;

        var price = parseFloat(propertyPriceInput.value) || 0;
        var downPaymentPercent = parseFloat(downPaymentSlider.value) || 20;
        var tenureYears = parseInt(loanTenureInput.value, 10) || 20;
        var annualRate = parseFloat(interestRateInput.value) || 8.5;

        // Step 2: Compute down payment and actual loan principal
        var downPaymentAmount = price * (downPaymentPercent / 100);
        var principalAmount = price - downPaymentAmount;

        // Step 3: Update input label displays
        if (downPaymentText) {
            downPaymentText.textContent = formatIndianRupees(downPaymentAmount) + ' (' + downPaymentPercent + '%)';
        }
        if (loanTenureText) {
            loanTenureText.textContent = tenureYears + ' Years (' + (tenureYears * 12) + ' months)';
        }
        if (interestRateText) {
            interestRateText.textContent = annualRate.toFixed(2) + ' % p.a.';
        }

        // Handle edge case where price is 0
        if (principalAmount <= 0) {
            updateResultDisplays(0, 0, 0, 0);
            return;
        }

        // Step 4: Monthly rate and total installment count
        var monthlyRate = (annualRate / 12) / 100;
        var totalMonths = tenureYears * 12;

        // Step 5: Calculate EMI using standard formula
        var monthlyEMI = 0;
        if (monthlyRate === 0) {
            monthlyEMI = principalAmount / totalMonths;
        } else {
            var factor = Math.pow(1 + monthlyRate, totalMonths);
            monthlyEMI = (principalAmount * monthlyRate * factor) / (factor - 1);
        }

        // Step 6: Compute total interest and overall payment
        var totalPayable = monthlyEMI * totalMonths;
        var totalInterest = totalPayable - principalAmount;

        // Step 7: Update the page output boxes
        updateResultDisplays(monthlyEMI, principalAmount, totalInterest, totalPayable);
    }

    /**
     * Renders calculated numbers into DOM output elements
     */
    function updateResultDisplays(emi, principal, interest, total) {
        if (monthlyEmiDisplay) {
            monthlyEmiDisplay.textContent = formatIndianRupees(emi) + ' / mo';
        }
        if (principalAmountDisplay) {
            principalAmountDisplay.textContent = formatIndianRupees(principal);
        }
        if (totalInterestDisplay) {
            totalInterestDisplay.textContent = formatIndianRupees(interest);
        }
        if (totalPayableDisplay) {
            totalPayableDisplay.textContent = formatIndianRupees(total);
        }
    }

    /**
     * Shortcut function: Called from property cards or modal to auto-fill property price
     * @param {number|string} price - Property price in INR
     * @param {string} [title] - Marketing title of property
     */
    function prefillCalculator(price, title) {
        if (!propertyPriceInput) return;

        var numPrice = parseFloat(price);
        if (!isNaN(numPrice) && numPrice > 0) {
            propertyPriceInput.value = numPrice;
            recalculateLoan();

            // Smooth scroll down to the calculator widget
            var calcSection = document.getElementById('mortgageCalculatorSection');
            if (calcSection) {
                calcSection.scrollIntoView({ behavior: 'smooth' });
            }

            // Show temporary badge indicating pre-filled property
            if (selectedPropertyNotice) {
                selectedPropertyNotice.textContent = 'Listing selected: ' + (title || 'Verified Property');
                selectedPropertyNotice.style.display = 'inline-block';
            }

            // Trigger Kunal's toast alert
            if (window.UIUtils && typeof window.UIUtils.showToast === 'function') {
                window.UIUtils.showToast('Calculator loaded with ' + (title || 'property price'), 'info');
            }
        }
    }

    /**
     * Resets calculator inputs to standard defaults
     */
    function resetCalculator() {
        if (!propertyPriceInput) return;

        propertyPriceInput.value = 15000000; // 1.5 Cr default
        if (downPaymentSlider) downPaymentSlider.value = 20;
        if (loanTenureInput) loanTenureInput.value = 20;
        if (interestRateInput) interestRateInput.value = 8.5;

        if (selectedPropertyNotice) {
            selectedPropertyNotice.textContent = '';
            selectedPropertyNotice.style.display = 'none';
        }

        recalculateLoan();
    }

    /**
     * Initializes elements and attaches event listeners
     */
    function init() {
        // Cache input nodes
        propertyPriceInput = document.getElementById('calcPropertyPrice');
        downPaymentSlider = document.getElementById('calcDownPayment');
        downPaymentText = document.getElementById('calcDownPaymentText');
        loanTenureInput = document.getElementById('calcTenure');
        loanTenureText = document.getElementById('calcTenureText');
        interestRateInput = document.getElementById('calcRate');
        interestRateText = document.getElementById('calcRateText');

        // Cache output nodes
        monthlyEmiDisplay = document.getElementById('calcEmiResult');
        principalAmountDisplay = document.getElementById('calcPrincipalResult');
        totalInterestDisplay = document.getElementById('calcInterestResult');
        totalPayableDisplay = document.getElementById('calcTotalResult');
        selectedPropertyNotice = document.getElementById('calcPropertyNotice');

        if (!propertyPriceInput) {
            // Calculator not mounted on this specific page
            return;
        }

        // Attach real-time input listeners
        propertyPriceInput.addEventListener('input', recalculateLoan);
        if (downPaymentSlider) downPaymentSlider.addEventListener('input', recalculateLoan);
        if (loanTenureInput) loanTenureInput.addEventListener('input', recalculateLoan);
        if (interestRateInput) interestRateInput.addEventListener('input', recalculateLoan);

        // Reset button
        var resetBtn = document.getElementById('calcResetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', resetCalculator);
        }

        // Quick down payment pill buttons (10%, 20%, 30%, 40%)
        var percentPills = document.querySelectorAll('[data-calc-dp]');
        for (var i = 0; i < percentPills.length; i++) {
            percentPills[i].addEventListener('click', function () {
                var pct = this.getAttribute('data-calc-dp');
                if (downPaymentSlider) {
                    downPaymentSlider.value = pct;
                    recalculateLoan();
                }
            });
        }

        // Initial calculation on page load
        recalculateLoan();
    }

    // Public API exposed for Anmol and Mukesh
    window.MortgageCalculator = {
        init: init,
        recalculate: recalculateLoan,
        prefillPrice: prefillCalculator,
        reset: resetCalculator
    };

    // Auto-boot on DOM ready
    document.addEventListener('DOMContentLoaded', init);

})();
