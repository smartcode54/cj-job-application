/**
 * Form Validation Test Suite
 * Comprehensive test cases for all form field validations
 */

class FormValidationTestSuite {
    constructor() {
        this.testResults = [];
        this.form = null;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.form = document.getElementById('application-form');
        if (!this.form) {
            console.error('Form not found. Make sure the form has id="application-form"');
            return;
        }
    }

    /**
     * Run all validation tests
     */
    async runAllTests() {
        console.log('🧪 Starting Form Validation Test Suite...');
        this.testResults = [];

        // Personal Information Tests
        await this.runPersonalInfoTests();
        
        // Job Application Tests
        await this.runJobApplicationTests();
        
        // PDPA Consent Tests
        await this.runPDPAConsentTests();
        
        // Cross-field Validation Tests
        await this.runCrossFieldTests();

        this.generateReport();
        return this.testResults;
    }

    /**
     * Personal Information Field Tests
     */
    async runPersonalInfoTests() {
        console.log('📝 Testing Personal Information Fields...');

        // First Name Tests
        await this.testField('full-name', 'required', '', false, 'First name should be required');
        await this.testField('full-name', 'valid', 'สมชาย', true, 'Valid Thai first name should be accepted');
        await this.testField('full-name', 'invalid', '123@#$', false, 'Invalid characters should be rejected');

        // Last Name Tests
        await this.testField('last-name', 'required', '', false, 'Last name should be required');
        await this.testField('last-name', 'valid', 'ใจดี', true, 'Valid Thai last name should be accepted');

        // ID Card Tests
        await this.testField('idcard', 'required', '', false, 'ID card should be required');
        await this.testField('idcard', 'pattern', '1 2345 67890 12 3', true, 'Valid ID card format should be accepted');
        await this.testField('idcard', 'pattern', '1234567890123', false, 'Invalid ID card format should be rejected');

        // Gender Tests
        await this.testRadioGroup('gender', 'required', '', false, 'Gender should be required');
        await this.testRadioGroup('gender', 'valid', 'male', true, 'Male selection should be accepted');
        await this.testRadioGroup('gender', 'valid', 'female', true, 'Female selection should be accepted');

        // Education Tests
        await this.testSelectField('education', 'required', '', false, 'Education should be required');
        await this.testSelectField('education', 'valid', 'Bachelor', true, 'Valid education selection should be accepted');

        // Phone Tests
        await this.testField('phone', 'required', '', false, 'Phone should be required');
        await this.testField('phone', 'valid', '081-234-5678', true, 'Valid phone format should be accepted');
        await this.testField('phone', 'invalid', '123', false, 'Invalid phone format should be rejected');

        // Line ID Tests (Optional)
        await this.testField('lineid', 'optional', '', true, 'Line ID should be optional');
        await this.testField('lineid', 'valid', 'example_lineid', true, 'Valid Line ID should be accepted');
    }

    /**
     * Job Application Field Tests
     */
    async runJobApplicationTests() {
        console.log('💼 Testing Job Application Fields...');

        // Position Tests
        await this.testSelectField('position', 'required', '', false, 'Position should be required');
        await this.testSelectField('position', 'valid', 'พนักงานขาย', true, 'Valid position selection should be accepted');

        // Near Branch Tests
        await this.testRadioGroup('nearBranch', 'required', '', false, 'Near branch should be required');
        await this.testRadioGroup('nearBranch', 'valid', 'yes', true, 'Near branch yes should be accepted');
        await this.testRadioGroup('nearBranch', 'valid', 'no', true, 'Near branch no should be accepted');

        // Guarantor Tests
        await this.testRadioGroup('garuner', 'required', '', false, 'Guarantor should be required');
        await this.testRadioGroup('garuner', 'valid', 'yes', true, 'Guarantor yes should be accepted');
        await this.testRadioGroup('garuner', 'valid', 'no', true, 'Guarantor no should be accepted');

        // Criminal History Tests
        await this.testRadioGroup('criminal-history', 'required', '', false, 'Criminal history should be required');
        await this.testRadioGroup('criminal-history', 'valid', 'yes', true, 'Criminal history yes should be accepted');
        await this.testRadioGroup('criminal-history', 'valid', 'no', true, 'Criminal history no should be accepted');

        // Criminal Details Conditional Test
        await this.testConditionalField('criminal-details', 'criminal-history', 'yes', 'Criminal details should show when criminal history is yes');

        // Start Date Tests
        await this.testField('start-working-date', 'required', '', false, 'Start date should be required');
        await this.testField('start-working-date', 'valid', '2024-01-01', true, 'Valid start date should be accepted');
    }

    /**
     * PDPA Consent Tests
     */
    async runPDPAConsentTests() {
        console.log('🔒 Testing PDPA Consent...');

        await this.testCheckbox('pdpa-consent', 'required', false, 'PDPA consent should be required');
        await this.testCheckbox('pdpa-consent', 'valid', true, 'PDPA consent checked should be accepted');
    }

    /**
     * Cross-field Validation Tests
     */
    async runCrossFieldTests() {
        console.log('🔗 Testing Cross-field Validation...');

        // Complete Form Test
        await this.testCompleteForm({
            'full-name': 'สมชาย',
            'last-name': 'ใจดี',
            'idcard': '1 2345 67890 12 3',
            'gender': 'male',
            'education': 'Bachelor',
            'phone': '081-234-5678',
            'lineid': 'example_lineid',
            'position': 'พนักงานขาย',
            'nearBranch': 'yes',
            'garuner': 'yes',
            'criminal-history': 'no',
            'start-working-date': '2024-01-01',
            'pdpa-consent': 'on'
        }, true, 'Complete form with valid data should be valid');

        // Incomplete Form Test
        await this.testCompleteForm({
            'full-name': 'สมชาย',
            'last-name': 'ใจดี'
            // Missing other required fields
        }, false, 'Incomplete form should be invalid');
    }

    /**
     * Test individual field validation
     */
    async testField(fieldName, testType, value, expectedValid, description) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (!field) {
            this.addTestResult(fieldName, false, `Field '${fieldName}' not found`, description);
            return;
        }

        // Set field value
        field.value = value;
        
        // Trigger validation
        field.dispatchEvent(new Event('input', { bubbles: true }));
        field.dispatchEvent(new Event('blur', { bubbles: true }));

        // Check validity
        const isValid = field.checkValidity();
        const success = isValid === expectedValid;

        this.addTestResult(fieldName, success, 
            success ? `Field validation ${testType} test passed` : `Field validation ${testType} test failed`,
            description);
    }

    /**
     * Test radio group validation
     */
    async testRadioGroup(fieldName, testType, value, expectedValid, description) {
        const radios = this.form.querySelectorAll(`[name="${fieldName}"]`);
        if (radios.length === 0) {
            this.addTestResult(fieldName, false, `Radio group '${fieldName}' not found`, description);
            return;
        }

        // Clear all selections
        radios.forEach(radio => radio.checked = false);

        if (value) {
            // Select specific value
            const targetRadio = this.form.querySelector(`[name="${fieldName}"][value="${value}"]`);
            if (targetRadio) {
                targetRadio.checked = true;
            }
        }

        // Check validity
        const isValid = radios[0].checkValidity();
        const success = isValid === expectedValid;

        this.addTestResult(fieldName, success,
            success ? `Radio group validation ${testType} test passed` : `Radio group validation ${testType} test failed`,
            description);
    }

    /**
     * Test select field validation
     */
    async testSelectField(fieldName, testType, value, expectedValid, description) {
        const select = this.form.querySelector(`[name="${fieldName}"]`);
        if (!select) {
            this.addTestResult(fieldName, false, `Select field '${fieldName}' not found`, description);
            return;
        }

        select.value = value;
        select.dispatchEvent(new Event('change', { bubbles: true }));

        const isValid = select.checkValidity();
        const success = isValid === expectedValid;

        this.addTestResult(fieldName, success,
            success ? `Select field validation ${testType} test passed` : `Select field validation ${testType} test failed`,
            description);
    }

    /**
     * Test checkbox validation
     */
    async testCheckbox(fieldName, testType, checked, expectedValid, description) {
        const checkbox = this.form.querySelector(`[name="${fieldName}"]`);
        if (!checkbox) {
            this.addTestResult(fieldName, false, `Checkbox '${fieldName}' not found`, description);
            return;
        }

        checkbox.checked = checked;
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));

        const isValid = checkbox.checkValidity();
        const success = isValid === expectedValid;

        this.addTestResult(fieldName, success,
            success ? `Checkbox validation ${testType} test passed` : `Checkbox validation ${testType} test failed`,
            description);
    }

    /**
     * Test conditional field visibility
     */
    async testConditionalField(fieldName, dependsOnField, dependsValue, description) {
        const dependsOnElement = this.form.querySelector(`[name="${dependsOnField}"]`);
        const conditionalContainer = document.getElementById('criminal-details-container');
        
        if (!dependsOnElement || !conditionalContainer) {
            this.addTestResult(fieldName, false, 'Conditional field or dependency not found', description);
            return;
        }

        // Set dependency value
        if (dependsOnElement.type === 'radio') {
            const radio = this.form.querySelector(`[name="${dependsOnField}"][value="${dependsValue}"]`);
            if (radio) {
                radio.checked = true;
                radio.dispatchEvent(new Event('change', { bubbles: true }));
            }
        } else {
            dependsOnElement.value = dependsValue;
            dependsOnElement.dispatchEvent(new Event('change', { bubbles: true }));
        }

        // Check if conditional field is visible
        const isVisible = !conditionalContainer.classList.contains('hidden');
        const success = isVisible;

        this.addTestResult(fieldName, success,
            success ? 'Conditional field is visible' : 'Conditional field is not visible',
            description);
    }

    /**
     * Test complete form validation
     */
    async testCompleteForm(testData, expectedValid, description) {
        // Clear form
        this.clearForm();

        // Fill form with test data
        Object.entries(testData).forEach(([fieldName, value]) => {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            if (field) {
                if (field.type === 'radio' || field.type === 'checkbox') {
                    const element = this.form.querySelector(`[name="${fieldName}"][value="${value}"]`);
                    if (element) {
                        element.checked = true;
                        element.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                } else {
                    field.value = value;
                    field.dispatchEvent(new Event('input', { bubbles: true }));
                }
            }
        });

        // Test form validity
        const isValid = this.form.checkValidity();
        const success = isValid === expectedValid;

        this.addTestResult('complete-form', success,
            success ? 'Complete form validation test passed' : 'Complete form validation test failed',
            description);
    }

    /**
     * Clear all form fields
     */
    clearForm() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.type === 'radio' || input.type === 'checkbox') {
                input.checked = false;
            } else {
                input.value = '';
            }
        });
    }

    /**
     * Add test result
     */
    addTestResult(fieldName, success, message, description) {
        this.testResults.push({
            field: fieldName,
            success: success,
            message: message,
            description: description,
            timestamp: new Date().toISOString()
        });
    }

    /**
     * Generate test report
     */
    generateReport() {
        const passed = this.testResults.filter(r => r.success).length;
        const failed = this.testResults.filter(r => !r.success).length;
        const total = this.testResults.length;

        console.log('\n📊 Test Results Summary:');
        console.log(`✅ Passed: ${passed}`);
        console.log(`❌ Failed: ${failed}`);
        console.log(`📝 Total: ${total}`);
        console.log(`📈 Success Rate: ${((passed / total) * 100).toFixed(1)}%`);

        if (failed > 0) {
            console.log('\n❌ Failed Tests:');
            this.testResults
                .filter(r => !r.success)
                .forEach(result => {
                    console.log(`  • ${result.field}: ${result.message}`);
                });
        }

        return {
            passed,
            failed,
            total,
            successRate: (passed / total) * 100,
            results: this.testResults
        };
    }

    /**
     * Export test results to JSON
     */
    exportResults() {
        const report = this.generateReport();
        const dataStr = JSON.stringify(report, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `form-validation-test-results-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }
}

// Auto-run tests if this script is loaded in the form page
if (typeof window !== 'undefined') {
    window.FormValidationTestSuite = FormValidationTestSuite;
    
    // Auto-run tests when page loads (optional)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            const tester = new FormValidationTestSuite();
            window.formTester = tester; // Make tester available globally
            
            // Add test controls to the page
            addTestControls(tester);
        });
    } else {
        const tester = new FormValidationTestSuite();
        window.formTester = tester;
        addTestControls(tester);
    }
}

/**
 * Add test controls to the form page
 */
function addTestControls(tester) {
    // Create test controls container
    const controlsDiv = document.createElement('div');
    controlsDiv.id = 'test-controls';
    controlsDiv.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: white;
        border: 2px solid #3e8821;
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        font-family: 'Kanit', sans-serif;
    `;

    controlsDiv.innerHTML = `
        <h3 style="margin: 0 0 10px 0; color: #3e8821; font-size: 14px;">🧪 Form Tests</h3>
        <button id="run-tests" style="
            background: #3e8821;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
            margin-right: 5px;
            font-size: 12px;
        ">Run Tests</button>
        <button id="export-results" style="
            background: #6b7280;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
        ">Export</button>
        <div id="test-status" style="margin-top: 8px; font-size: 11px; color: #6b7280;"></div>
    `;

    document.body.appendChild(controlsDiv);

    // Add event listeners
    document.getElementById('run-tests').addEventListener('click', async () => {
        const statusDiv = document.getElementById('test-status');
        statusDiv.textContent = 'Running tests...';
        statusDiv.style.color = '#f59e0b';

        const results = await tester.runAllTests();
        
        statusDiv.textContent = `✅ ${results.passed} passed, ❌ ${results.failed} failed`;
        statusDiv.style.color = results.failed > 0 ? '#ef4444' : '#10b981';
    });

    document.getElementById('export-results').addEventListener('click', () => {
        tester.exportResults();
    });
}

// Export for Node.js usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormValidationTestSuite;
}
