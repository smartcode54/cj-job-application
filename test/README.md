# Form Validation Test Suite

This directory contains comprehensive test cases for validating all form fields in the HR application form.

## Files

- `validation-tests.html` - Standalone test runner with visual interface
- `form-validation-tests.js` - JavaScript test suite for integration
- `README.md` - This documentation file

## Test Coverage

### Personal Information Fields (ข้อมูลส่วนตัว)
- **ชื่อ (First Name)**: Required field, valid Thai name validation
- **นามสกุล (Last Name)**: Required field, valid Thai name validation  
- **เลขบัตรประชาชน (ID Card)**: Required field, pattern validation (1 2345 67890 12 3)
- **เพศ (Gender)**: Required radio group (male/female)
- **วุฒิการศึกษาสูงสุด (Education)**: Required select field
- **เบอร์โทรศัพท์ (Phone)**: Required field, phone format validation
- **Line ID**: Optional field

### Job Application Fields (ข้อมูลการสมัคร)
- **ตำแหน่งที่ต้องการสมัคร (Position)**: Required select field
- **สาขาใกล้เคียง (Near Branch)**: Required radio group (yes/no)
- **บุคคลค้ำประกัน (Guarantor)**: Required radio group (yes/no)
- **ประวัติอาชญากรรม (Criminal History)**: Required radio group (yes/no)
- **รายละเอียดข้อหา (Criminal Details)**: Conditional field (shows when criminal history = yes)
- **วันที่เริ่มงาน (Start Date)**: Required date field

### PDPA Consent
- **PDPA Consent Checkbox**: Required checkbox for data protection consent

### Cross-field Validation
- Complete form validation with all valid data
- Incomplete form validation with missing required fields

## Usage

### Option 1: Standalone Test Runner

1. Open `validation-tests.html` in a web browser
2. Click "Run All Tests" to execute all test cases
3. View results with pass/fail indicators
4. Use "Clear Results" to reset and run again

### Option 2: Integrated Testing

1. Include the test script in your form page:
```html
<script src="test/form-validation-tests.js"></script>
```

2. The test controls will automatically appear in the top-right corner
3. Click "Run Tests" to execute validation tests
4. Click "Export" to download test results as JSON

### Option 3: Programmatic Testing

```javascript
// Create test suite instance
const tester = new FormValidationTestSuite();

// Run all tests
const results = await tester.runAllTests();

// Get test report
console.log(results);
// Output: { passed: 45, failed: 2, total: 47, successRate: 95.7, results: [...] }
```

## Test Types

### Field Validation Tests
- **Required**: Tests that required fields show validation errors when empty
- **Valid**: Tests that valid input is accepted
- **Invalid**: Tests that invalid input is rejected
- **Pattern**: Tests regex pattern validation (e.g., ID card format)
- **Optional**: Tests that optional fields allow empty values

### Input Type Tests
- **Text**: Standard text input validation
- **Radio**: Radio button group validation
- **Select**: Dropdown selection validation
- **Checkbox**: Checkbox validation
- **Date**: Date input validation
- **Tel**: Phone number validation

### Conditional Tests
- **Conditional Field**: Tests that conditional fields show/hide based on other field values
- **Cross-field**: Tests form-level validation with multiple fields

## Test Data

### Valid Test Data Examples
```javascript
{
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
}
```

### Invalid Test Data Examples
```javascript
{
  'full-name': '123@#$',        // Invalid characters
  'idcard': '1234567890123',    // Wrong format
  'phone': '123',               // Too short
  'gender': '',                 // Not selected
  'education': '',              // Not selected
  'pdpa-consent': false         // Not checked
}
```

## Validation Rules

### ID Card Format
- Pattern: `[0-9]{1} [0-9]{4} [0-9]{5} [0-9]{2} [0-9]{1}`
- Example: `1 2345 67890 12 3`

### Phone Number Format
- Length: 10-12 characters
- Pattern: `^[0-9-]{10,12}$`
- Example: `081-234-5678`

### Required Fields
All fields except `lineid` are required for form submission.

### Conditional Fields
- `criminal-details` field is only visible when `criminal-history` is set to "yes"

## Running Tests in Development

1. **Local Development**:
   ```bash
   # Serve the test file locally
   python -m http.server 8000
   # Open http://localhost:8000/test/validation-tests.html
   ```

2. **With Live Form**:
   - Include the test script in your form page
   - Use the integrated test controls
   - Tests will run against the actual form elements

3. **Automated Testing**:
   - Use the JavaScript API for automated test execution
   - Export results for CI/CD integration
   - Monitor test results over time

## Test Results

Each test result includes:
- **Field Name**: The form field being tested
- **Success**: Boolean indicating if test passed
- **Message**: Detailed result message
- **Description**: Human-readable test description
- **Timestamp**: When the test was executed

## Troubleshooting

### Common Issues

1. **Tests not running**: Ensure the form has `id="application-form"`
2. **Field not found**: Check that field names match exactly
3. **Validation not triggering**: Ensure form elements have proper event listeners
4. **Conditional fields not showing**: Check that dependency fields are properly set

### Debug Mode

Enable debug logging by opening browser console and running:
```javascript
// Enable debug mode
window.formTester.debug = true;
```

## Contributing

When adding new form fields or validation rules:

1. Add corresponding test cases to the test suite
2. Update this documentation
3. Ensure all tests pass before deployment
4. Add edge cases and boundary conditions

## Performance

- Tests run in ~2-3 seconds for full suite
- Individual field tests complete in <100ms
- Memory usage is minimal (<1MB)
- No external dependencies required
